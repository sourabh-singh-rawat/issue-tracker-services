import type {
  Identity,
  ResendVerificationEmailInput,
  VerifyEmailInput,
} from "@/integrations/identity/types";

export interface IVerificationProvider {
  verifyEmail(input: VerifyEmailInput): Promise<Identity>;
  resendVerificationEmail(input: ResendVerificationEmailInput): Promise<void>;
}
