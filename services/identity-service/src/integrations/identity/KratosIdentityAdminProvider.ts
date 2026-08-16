import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IIdentityAdminProvider } from "@/integrations/identity/IIdentityAdminProvider";
import type { KratosClient } from "@/integrations/identity/KratosClient";
import type { KratosErrorMapper } from "@/integrations/identity/KratosErrorMapper";
import { mapKratosIdentity } from "@/integrations/identity/mapKratosIdentity";
import type {
  CreateIdentityInput,
  Identity,
  UpdateIdentityInput,
} from "@/integrations/identity/types";
import { IdentityProviderUnavailableError } from "@/integrations/identity/errors";

@injectable()
export class KratosIdentityAdminProvider implements IIdentityAdminProvider {
  constructor(
    @inject(TYPES.KratosClient)
    private readonly kratos: KratosClient,
    @inject(TYPES.KratosErrorMapper)
    private readonly errors: KratosErrorMapper,
  ) {}

  async getIdentity(_id: string): Promise<Identity> {
    throw new Error("Method not implemented.");
  }

  async existsByEmail(email: string): Promise<boolean> {
    const idpId = await this.findIdpIdByEmail(email);
    return idpId !== null;
  }

  async findIdpIdByEmail(email: string): Promise<string | null> {
    const { data } = await this.kratos.identityApi.listIdentities({
      credentialsIdentifier: email,
      pageSize: 1,
    });

    const id = data[0]?.id;
    return typeof id === "string" && id.length > 0 ? id : null;
  }

  async createIdentity(input: CreateIdentityInput): Promise<Identity> {
    const schemaId = input.schemaId ?? "user";
    const traits = {
      ...input.traits,
      email: input.email,
      username: input.username,
    };

    try {
      const { data } = await this.kratos.identityApi.createIdentity({
        createIdentityBody: {
          schema_id: schemaId,
          traits,
          state: "active",
          verifiable_addresses: [
            {
              value: input.email,
              via: "email",
              verified: input.emailVerified,
              status: input.emailVerified ? "completed" : "pending",
            },
          ],
          credentials: {
            password: {
              config: {
                password: input.password,
              },
            },
          },
        },
      });

      if (!data?.id) {
        throw new IdentityProviderUnavailableError();
      }

      return mapKratosIdentity(data, input.email);
    } catch (error) {
      if (error instanceof IdentityProviderUnavailableError) {
        throw error;
      }
      this.errors.rethrow(error);
    }
  }

  async updateIdentity(_id: string, _input: UpdateIdentityInput): Promise<Identity> {
    throw new Error("Method not implemented.");
  }

  async deleteIdentity(id: string): Promise<void> {
    try {
      await this.kratos.identityApi.deleteIdentity({ id });
    } catch (error) {
      this.errors.rethrow(error);
    }
  }
}
