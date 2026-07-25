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

export interface IIdentityProvider {
  register(input: RegisterIdentityInput): Promise<Identity>;
  login(input: LoginIdentityInput): Promise<LoginResult>;
  logout(sessionToken: string): Promise<void>;
  getSession(sessionToken: string): Promise<Identity>;
  getIdentity(id: string): Promise<Identity>;
  existsByEmail(email: string): Promise<boolean>;
  updateIdentity(id: string, input: UpdateIdentityInput): Promise<Identity>;
  deleteIdentity(id: string): Promise<void>;
}
