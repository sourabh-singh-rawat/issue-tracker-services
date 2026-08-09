import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IRegistrationProvider } from "@/integrations/identity/IRegistrationProvider";
import type { KratosClient } from "@/integrations/identity/KratosClient";
import type { KratosErrorMapper } from "@/integrations/identity/KratosErrorMapper";
import { mapKratosIdentity } from "@/integrations/identity/mapKratosIdentity";
import type { Identity, RegisterIdentityInput } from "@/integrations/identity/types";
import { IdentityProviderUnavailableError } from "@/integrations/identity/errors";

@injectable()
export class KratosRegistrationProvider implements IRegistrationProvider {
  constructor(
    @inject(TYPES.KratosClient)
    private readonly kratos: KratosClient,
    @inject(TYPES.KratosErrorMapper)
    private readonly errors: KratosErrorMapper,
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

      return mapKratosIdentity(identity, input.email);
    } catch (error) {
      if (error instanceof IdentityProviderUnavailableError) {
        throw error;
      }
      this.errors.rethrow(error);
    }
  }
}
