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
  schemaId?: IdentitySchemaId;
  traits?: Record<string, unknown>;
}

export interface LoginIdentityInput {
  email: string;
  password: string;
}

export interface LoginResult {
  identity: Identity;
  /** Session token from the identity provider; used as the `session` cookie value. */
  sessionToken: string;
  /** Session expiry from the identity provider; always applied when writing the `session` cookie. */
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

export interface IIdentityProvider {
  /** Throws `IdentityAlreadyExistsError` when the email is already registered. */
  register(input: RegisterIdentityInput): Promise<Identity>;
  login(input: LoginIdentityInput): Promise<LoginResult>;
  /** Invalidate the session identified by the given session token (cookie value). */
  logout(sessionToken: string): Promise<void>;
  /**
   * Validate the session token (cookie value) and return the authenticated identity.
   * Throws `InvalidCredentialError` when the session is missing or invalid.
   */
  getSession(sessionToken: string): Promise<Identity>;
  getIdentity(id: string): Promise<Identity>;
  existsByEmail(email: string): Promise<boolean>;
  updateIdentity(id: string, input: UpdateIdentityInput): Promise<Identity>;
  deleteIdentity(id: string): Promise<void>;
}
