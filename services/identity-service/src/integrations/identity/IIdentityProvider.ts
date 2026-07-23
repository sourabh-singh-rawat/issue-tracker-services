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
  password: string;
  /** Kratos identity schema id. Defaults to `user`. */
  schemaId?: IdentitySchemaId;
  traits?: Record<string, unknown>;
}

export interface LoginIdentityInput {
  email: string;
  password: string;
}

export interface LoginResult {
  identity: Identity;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  expiresAt?: Date;
}

export interface UpdateIdentityInput {
  email?: string;
  password?: string;
  traits?: Record<string, unknown>;
  emailVerified?: boolean;
}

export interface IIdentityProvider {
  /** Throws `IdentityAlreadyExistsError` when the email is already registered. */
  register(input: RegisterIdentityInput): Promise<Identity>;
  login(input: LoginIdentityInput): Promise<LoginResult>;
  logout(sessionId: string): Promise<void>;
  getIdentity(id: string): Promise<Identity>;
  existsByEmail(email: string): Promise<boolean>;
  updateIdentity(id: string, input: UpdateIdentityInput): Promise<Identity>;
  deleteIdentity(id: string): Promise<void>;
}
