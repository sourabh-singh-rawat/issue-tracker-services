import { ServiceOptions } from "./UserProfileService";

export interface CreateUserWithEmailAndPasswordOptions extends ServiceOptions {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInWithEmailAndPasswordOptions extends ServiceOptions {
  email: string;
  password: string;
}

export interface SendEmailVerificationLinkOptions extends ServiceOptions {
  userId: string;
  email: string;
  displayName: string;
}

export interface VerifyEmailVerificationLinkOptions extends ServiceOptions {
  token: string;
}

export interface SendPasswordResetLinkToEmailOptions extends ServiceOptions {
  email: string;
}

export interface GenerateVerificationLinkOptions extends ServiceOptions {}

export interface VerifyPasswordResetLinkOptions extends ServiceOptions {}

export interface GeneratePasswordResetLinkOptions extends ServiceOptions {}

export interface UserAuthenticationService {
  createUserWithEmailAndPassword(
    options: CreateUserWithEmailAndPasswordOptions,
  ): Promise<void>;
  signInWithEmailAndPassword(
    options: SignInWithEmailAndPasswordOptions,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  generateVerificationLink(
    options: GenerateVerificationLinkOptions,
  ): Promise<void>;
  generatePasswordResetLink(
    options: GeneratePasswordResetLinkOptions,
  ): Promise<void>;
  sendVerificationLinkToEmail(
    options: SendEmailVerificationLinkOptions,
  ): Promise<void>;
  sendPasswordResetLinkToEmail(
    options: SendPasswordResetLinkToEmailOptions,
  ): Promise<void>;
  verifyVerificationLink(
    options: VerifyEmailVerificationLinkOptions,
  ): Promise<void>;
  verifyPasswordResetLink(
    options: VerifyPasswordResetLinkOptions,
  ): Promise<void>;
}
