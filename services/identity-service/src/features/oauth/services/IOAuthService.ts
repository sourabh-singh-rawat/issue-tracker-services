export interface AuthorizeOptions {
  clientId: string;
  redirectUri: string;
  responseType: "code";
  scope: string;
  state: string;
}

export interface AuthorizeResult {
  redirectTo: string;
}

export interface IOAuthService {
  authorize(params: AuthorizeOptions): Promise<AuthorizeResult>;
}
