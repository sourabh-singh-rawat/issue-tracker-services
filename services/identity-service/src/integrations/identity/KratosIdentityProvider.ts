import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  IIdentityProvider,
  Identity,
  SignInIdentityInput,
  SignInResult,
  RegisterIdentityInput,
  ResendVerificationEmailInput,
  UpdateIdentityInput,
  VerifyEmailInput,
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
      const { data: flow } = await this.kratos.frontendApi.createNativeRegistrationFlow(
        input.schemaId ? { identitySchema: input.schemaId } : {},
      );

      const { data } = await this.kratos.frontendApi.updateRegistrationFlow({
        flow: flow.id,
        updateRegistrationFlowBody: {
          method: "password",
          password: input.password,
          traits: {
            ...input.traits,
            email: input.email,
            username: input.username,
          },
        },
      });

      const identity = data.identity;
      if (!identity?.id) {
        throw new IdentityProviderUnavailableError();
      }

      const traits = (identity.traits ?? {}) as Record<string, unknown>;
      const email = typeof traits.email === "string" ? traits.email : input.email;
      const emailVerified = identity.verifiable_addresses?.some(
        (address) => address.value === email && address.verified,
      );

      return {
        id: identity.id,
        email,
        emailVerified,
        traits,
        createdAt: identity.created_at ? new Date(identity.created_at) : undefined,
        updatedAt: identity.updated_at ? new Date(identity.updated_at) : undefined,
      };
    } catch (error) {
      if (error instanceof IdentityProviderUnavailableError) {
        throw error;
      }
      this.rethrowAsApplicationError(error);
    }
  }

  async signIn(input: SignInIdentityInput): Promise<SignInResult> {
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
      const sessionToken = data.session_token;
      const expiresAt = session.expires_at;

      if (!sessionIdentity || !sessionToken || !expiresAt) {
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
        },
        sessionToken,
        sessionId: session.id,
        expiresAt: new Date(expiresAt),
      };
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async logout(sessionToken: string): Promise<void> {
    try {
      await this.kratos.frontendApi.performNativeLogout({
        performNativeLogoutBody: {
          session_token: sessionToken,
        },
      });
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async getSession(sessionToken: string): Promise<Identity> {
    try {
      const { data: session } = await this.kratos.frontendApi.toSession({
        xSessionToken: sessionToken,
      });

      const sessionIdentity = session.identity;
      if (!sessionIdentity) {
        throw new InvalidCredentialError("No active session");
      }

      const traits = (sessionIdentity.traits ?? {}) as Record<string, unknown>;
      const email = typeof traits.email === "string" ? traits.email : "";
      const emailVerified = sessionIdentity.verifiable_addresses?.some(
        (address) => address.value === email && address.verified,
      );

      return {
        id: sessionIdentity.id,
        email,
        emailVerified,
        traits,
        createdAt: sessionIdentity.created_at ? new Date(sessionIdentity.created_at) : undefined,
        updatedAt: sessionIdentity.updated_at ? new Date(sessionIdentity.updated_at) : undefined,
      };
    } catch (error) {
      if (error instanceof InvalidCredentialError) {
        throw error;
      }
      this.rethrowAsApplicationError(error);
    }
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

  async deleteIdentity(id: string): Promise<void> {
    try {
      await this.kratos.identityApi.deleteIdentity({ id });
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  async verifyEmail(input: VerifyEmailInput): Promise<Identity> {
    try {
      const { data: existingFlow } = await this.kratos.frontendApi.getVerificationFlow({
        id: input.flowId,
      });
      const emailFromFlow = this.extractEmailFromVerificationFlow(existingFlow);

      const { data } = await this.kratos.frontendApi.updateVerificationFlow({
        flow: input.flowId,
        updateVerificationFlowBody: {
          method: "code",
          code: input.code,
        },
      });

      if (data.state !== "passed_challenge") {
        throw new InvalidCredentialError("Email verification failed");
      }

      const email = this.extractEmailFromVerificationFlow(data) ?? emailFromFlow;
      if (!email) {
        throw new IdentityProviderUnavailableError(
          "Email verification succeeded but the verified address could not be resolved",
        );
      }

      const { data: identities } = await this.kratos.identityApi.listIdentities({
        credentialsIdentifier: email,
        pageSize: 1,
      });
      const identity = identities[0];
      if (!identity?.id) {
        throw new IdentityNotFoundError();
      }

      const traits = (identity.traits ?? {}) as Record<string, unknown>;
      const resolvedEmail = typeof traits.email === "string" ? traits.email : email;
      const emailVerified = identity.verifiable_addresses?.some(
        (address) => address.value === resolvedEmail && address.verified,
      );

      return {
        id: identity.id,
        email: resolvedEmail,
        emailVerified: emailVerified ?? true,
        traits,
        createdAt: identity.created_at ? new Date(identity.created_at) : undefined,
        updatedAt: identity.updated_at ? new Date(identity.updated_at) : undefined,
      };
    } catch (error) {
      if (
        error instanceof InvalidCredentialError ||
        error instanceof IdentityNotFoundError ||
        error instanceof IdentityProviderUnavailableError
      ) {
        throw error;
      }
      this.rethrowAsApplicationError(error);
    }
  }

  private extractEmailFromVerificationFlow(flow: {
    ui?: { nodes?: Array<{ attributes?: { name?: string; value?: unknown; node_type?: string } }> };
  }): string | undefined {
    const nodes = flow.ui?.nodes ?? [];
    for (const node of nodes) {
      const attributes = node.attributes;
      if (
        attributes?.node_type === "input" &&
        attributes.name === "email" &&
        typeof attributes.value === "string" &&
        attributes.value.length > 0
      ) {
        return attributes.value;
      }
    }
    return undefined;
  }

  async resendVerificationEmail(input: ResendVerificationEmailInput): Promise<void> {
    try {
      const { data: flow } = await this.kratos.frontendApi.createNativeVerificationFlow();

      await this.kratos.frontendApi.updateVerificationFlow({
        flow: flow.id,
        updateVerificationFlowBody: {
          method: "code",
          email: input.email,
        },
      });
    } catch (error) {
      this.rethrowAsApplicationError(error);
    }
  }

  private rethrowAsApplicationError(error: unknown): never {
    const status = this.getHttpStatus(error);

    if (status === 400 && this.isAlreadyExistsError(error)) {
      throw new IdentityAlreadyExistsError();
    }

    switch (status) {
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

  /** Ory error id for "account with the same identifier already exists". */
  private static readonly ALREADY_EXISTS_ERROR_ID = 4000007;

  private isAlreadyExistsError(error: unknown): boolean {
    if (typeof error !== "object" || error === null || !("response" in error)) {
      return false;
    }
    const data = (error as { response?: { data?: unknown } }).response?.data;
    if (typeof data !== "object" || data === null) {
      return false;
    }

    const collectMessages = (value: unknown): unknown[] => {
      if (typeof value !== "object" || value === null) {
        return [];
      }
      const messages = (value as { messages?: unknown }).messages;
      return Array.isArray(messages) ? messages : [];
    };

    const ui = (data as { ui?: unknown }).ui;
    const topLevel = collectMessages(data);
    const uiMessages = collectMessages(ui);
    const nodeMessages: unknown[] = [];
    if (typeof ui === "object" && ui !== null) {
      const nodes = (ui as { nodes?: unknown }).nodes;
      if (Array.isArray(nodes)) {
        for (const node of nodes) {
          nodeMessages.push(...collectMessages(node));
        }
      }
    }

    return [...topLevel, ...uiMessages, ...nodeMessages].some((message) => {
      if (typeof message !== "object" || message === null) {
        return false;
      }
      const id = (message as { id?: unknown }).id;
      if (id === KratosIdentityProvider.ALREADY_EXISTS_ERROR_ID) {
        return true;
      }
      const text = (message as { text?: unknown }).text;
      return typeof text === "string" && /already exists/i.test(text);
    });
  }
}
