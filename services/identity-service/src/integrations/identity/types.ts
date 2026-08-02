export interface Identity {
  id: string;
  email: string;
  emailVerified?: boolean;
  traits?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IdentitySchemaId = "user";

export interface RegisterIdentityInput {
  email: string;
  username: string;
  password: string;
  schemaId?: IdentitySchemaId;
  traits?: Record<string, unknown>;
}

export interface CreateIdentityInput {
  email: string;
  username: string;
  password: string;
  emailVerified: boolean;
  schemaId?: IdentitySchemaId;
  traits?: Record<string, unknown>;
}

export interface SignInIdentityInput {
  email: string;
  password: string;
}

export interface SignInResult {
  identity: Identity;
  sessionToken: string;
  expiresAt: Date;
  refreshToken?: string;
  sessionId?: string;
}

export interface UpdateIdentityInput {
  email?: string;
  password?: string;
  traits?: Record<string, unknown>;
  emailVerified?: boolean;
}

export interface VerifyEmailInput {
  flowId: string;
  code: string;
}

export interface ResendVerificationEmailInput {
  email: string;
}
