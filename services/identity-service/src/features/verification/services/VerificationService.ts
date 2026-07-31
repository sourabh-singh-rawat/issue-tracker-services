import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type {
  IVerificationService,
  ResendVerificationEmailInput,
  VerifyEmailInput,
} from "@/features/verification/services/IVerificationService";
import { IdentityProviderUnavailableError, type IIdentityProvider } from "@/integrations/identity";

@injectable()
export class VerificationService implements IVerificationService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
  ) {}

  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    await this.identityProvider.verifyEmail({
      flowId: input.flowId,
      code: input.code,
    });
  }

  async resendVerificationEmail(input: ResendVerificationEmailInput): Promise<void> {
    try {
      await this.identityProvider.resendVerificationEmail({
        email: input.email,
      });
    } catch (error) {
      if (error instanceof IdentityProviderUnavailableError) {
        throw error;
      }
    }
  }
}
