import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IVerificationProvider } from "@/integrations/identity/IVerificationProvider";
import type { KratosClient } from "@/integrations/identity/KratosClient";
import type { KratosErrorMapper } from "@/integrations/identity/KratosErrorMapper";
import { mapKratosIdentity } from "@/integrations/identity/mapKratosIdentity";
import type {
  Identity,
  ResendVerificationEmailInput,
  VerifyEmailInput,
} from "@/integrations/identity/types";
import {
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity/errors";

@injectable()
export class KratosVerificationProvider implements IVerificationProvider {
  constructor(
    @inject(TYPES.KratosClient)
    private readonly kratos: KratosClient,
    @inject(TYPES.KratosErrorMapper)
    private readonly errors: KratosErrorMapper,
  ) {}

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

      const mapped = mapKratosIdentity(identity, email);
      return {
        ...mapped,
        emailVerified: mapped.emailVerified ?? true,
      };
    } catch (error) {
      if (
        error instanceof InvalidCredentialError ||
        error instanceof IdentityNotFoundError ||
        error instanceof IdentityProviderUnavailableError
      ) {
        throw error;
      }
      this.errors.rethrow(error);
    }
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
      this.errors.rethrow(error);
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
}
