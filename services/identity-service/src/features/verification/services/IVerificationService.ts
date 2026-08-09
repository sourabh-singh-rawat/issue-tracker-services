export interface VerifyEmailInput {
  flowId: string;
  code: string;
}

export interface ResendVerificationEmailInput {
  email: string;
}

export interface IVerificationService {
  verifyEmail(input: VerifyEmailInput): Promise<void>;
  resendVerificationEmail(input: ResendVerificationEmailInput): Promise<void>;
}
