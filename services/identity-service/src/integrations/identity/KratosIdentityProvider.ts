import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  IIdentityProvider,
  Identity,
  LoginIdentityInput,
  LoginResult,
  RegisterIdentityInput,
  UpdateIdentityInput,
} from "@/integrations/identity/IIdentityProvider";
import type { KratosClient } from "@/integrations/identity/KratosClient";
import {
  IdentityAlreadyExistsError,
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity/errors";

@injectable()
export class KratosIdentityProvider implements IIdentityProvider {
  constructor(
    @inject(TYPES.KratosClient)
    private readonly kratos: KratosClient,
  ) {}

  async register(input: RegisterIdentityInput): Promise<Identity> {
    try {
      const { data } = await this.kratos.identityApi.createIdentity({
        createIdentityBody: {
          schema_id: input.schemaId ?? "user",
          traits: {
            ...input.traits,
            email: input.email,
          },
          credentials: {
            password: {
              config: {
                password: input.password,
              },
            },
          },
        },
      });

      const traits = (data.traits ?? {}) as Record<string, unknown>;
      const email = typeof traits.email === "string" ? traits.email : input.email;
      const emailVerified = data.verifiable_addresses?.some(
        (address) => address.value === email && address.verified,
      );

      return {
        id: data.id,
        email,
        emailVerified,
        traits,
        createdAt: data.created_at ? new Date(data.created_at) : undefined,
        updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async login(input: LoginIdentityInput): Promise<LoginResult> {
    try {
      const { data: flow } = await this.kratos.frontendApi.createNativeLoginFlow();

      const { data } = await this.kratos.frontendApi.updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          method: "password",
          identifier: input.email,
          password: input.password,
        },
      });

      const session = data.session;
      const sessionIdentity = session.identity;
      if (!sessionIdentity) {
        throw new IdentityProviderUnavailableError();
      }

      const traits = (sessionIdentity.traits ?? {}) as Record<string, unknown>;
      const email = typeof traits.email === "string" ? traits.email : input.email;
      const emailVerified = sessionIdentity.verifiable_addresses?.some(
        (address) => address.value === email && address.verified,
      );

      return {
        identity: {
          id: sessionIdentity.id,
          email,
          emailVerified,
          traits,
          createdAt: sessionIdentity.created_at ? new Date(sessionIdentity.created_at) : undefined,
          updatedAt: sessionIdentity.updated_at ? new Date(sessionIdentity.updated_at) : undefined,
        },
        sessionToken: data.session_token,
        sessionId: session.id,
        expiresAt: session.expires_at ? new Date(session.expires_at) : undefined,
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async logout(_sessionId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getIdentity(_id: string): Promise<Identity> {
    throw new Error("Method not implemented.");
  }

  async existsByEmail(email: string): Promise<boolean> {
    const { data } = await this.kratos.identityApi.listIdentities({
      credentialsIdentifier: email,
      pageSize: 1,
    });

    return data.length > 0;
  }

  async updateIdentity(_id: string, _input: UpdateIdentityInput): Promise<Identity> {
    throw new Error("Method not implemented.");
  }

  async deleteIdentity(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private rethrowAsApplicationError(error: unknown): never {
    const status = this.getHttpStatus(error);

    switch (status) {
      // Kratos password login/register validation failures are typically 400;
      // 401/403 cover unauthorized/forbidden credential cases.
      case 400:
      case 401:
      case 403:
        throw new InvalidCredentialError();
      case 404:
        throw new IdentityNotFoundError();
      case 409:
        throw new IdentityAlreadyExistsError();
      default:
        if (status === undefined || status >= 500) {
          throw new IdentityProviderUnavailableError();
        }
        throw error;
    }
  }

  private getHttpStatus(error: unknown): number | undefined {
    if (typeof error !== "object" || error === null || !("response" in error)) {
      return undefined;
    }
    return (error as { response?: { status?: number } }).response?.status;
  }
}
