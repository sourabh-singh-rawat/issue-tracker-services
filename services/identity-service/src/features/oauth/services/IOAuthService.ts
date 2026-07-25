export interface AuthorizeOptions {
  clientId: string;
  redirectUri: string;
  responseType: "code";
  scope: string;
  state: string;
  codeChallenge?: string;
  codeChallengeMethod?: "S256" | "plain";
  nonce?: string;
}

export interface AuthorizeResult {
  redirectTo: string;
}

export interface IOAuthService {
  authorize(params: AuthorizeOptions): Promise<AuthorizeResult>;
}
