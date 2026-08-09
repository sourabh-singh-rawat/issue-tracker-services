export type AuthMethod = "access_token" | "session";

export interface AuthenticatedUser {
  id: string;
  authMethod: AuthMethod;
}

export interface SessionIdentity {
  id: string;
  email?: string;
  emailVerified?: boolean;
}

export interface GetSessionResponse {
  identity: SessionIdentity;
}
