export interface AuthorizeInput {
  clientId: string;
  redirectUri: string;
  responseType: "code";
  scope: string;
  state: string;
  codeChallenge?: string;
  codeChallengeMethod?: "S256" | "plain";
  nonce?: string;
}

export interface OAuthClientInfo {
  id: string;
  name?: string;
  redirectUris?: string[];
}

export interface LoginChallenge {
  challenge: string;
  skip: boolean;
  subject?: string;
  client: OAuthClientInfo;
  requestedScope: string[];
  requestUrl?: string;
  sessionId?: string;
}

export interface AcceptLoginInput {
  challenge: string;
  subject: string;
  remember?: boolean;
  rememberFor?: number;
  identityProviderSessionId?: string;
  context?: Record<string, unknown>;
}

export interface ConsentChallenge {
  challenge: string;
  skip: boolean;
  subject?: string;
  client: OAuthClientInfo;
  requestedScope: string[];
  requestUrl?: string;
  loginChallenge?: string;
  loginSessionId?: string;
}

export interface AcceptConsentInput {
  challenge: string;
  grantScope: string[];
  remember?: boolean;
  rememberFor?: number;
  accessTokenExtra?: Record<string, unknown>;
  idTokenExtra?: Record<string, unknown>;
}

export interface RejectRequestInput {
  challenge: string;
  error?: string;
  errorDescription?: string;
}

export interface OAuthRedirectResult {
  redirectTo: string;
}

export interface ExchangeTokenInput {
  grantType: "authorization_code";
  clientId: string;
  code: string;
  redirectUri: string;
  codeVerifier: string;
  clientSecret?: string;
}

export interface TokenResult {
  accessToken: string;
  tokenType: string;
  expiresIn?: number;
  refreshToken?: string;
  idToken?: string;
  scope?: string;
}

export interface IntrospectTokenResult {
  active: boolean;
  subject?: string;
  clientId?: string;
  scope?: string;
  expiresAt?: Date;
  issuedAt?: Date;
  audience?: string[];
  extra?: Record<string, unknown>;
}

export interface RegisterOAuthClientInput {
  clientId: string;
  name: string;
  redirectUris: string[];
  grantTypes: string[];
  scopes: string[];
  tokenEndpointAuthMethod?: "none" | "client_secret_basic" | "client_secret_post" | "private_key_jwt";
  clientSecret?: string;
}

export interface RegisteredOAuthClient {
  clientId: string;
  name?: string;
  redirectUris?: string[];
  grantTypes?: string[];
  scopes?: string[];
  clientSecret?: string;
}

export interface IOAuthProvider {
  getAuthorizationUrl(input: AuthorizeInput): string;

  getLoginRequest(challenge: string): Promise<LoginChallenge>;
  acceptLoginRequest(input: AcceptLoginInput): Promise<OAuthRedirectResult>;
  rejectLoginRequest(input: RejectRequestInput): Promise<OAuthRedirectResult>;

  getConsentRequest(challenge: string): Promise<ConsentChallenge>;
  acceptConsentRequest(input: AcceptConsentInput): Promise<OAuthRedirectResult>;
  rejectConsentRequest(input: RejectRequestInput): Promise<OAuthRedirectResult>;

  exchangeToken(input: ExchangeTokenInput): Promise<TokenResult>;
  introspectToken(token: string, scope?: string): Promise<IntrospectTokenResult>;
  revokeToken(token: string): Promise<void>;

  registerClient(input: RegisterOAuthClientInput): Promise<RegisteredOAuthClient>;
  deleteClient(providerClientId: string): Promise<void>;
}
