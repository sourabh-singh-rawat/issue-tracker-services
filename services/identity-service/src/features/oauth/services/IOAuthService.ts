import type { ConsentChallenge } from "@/integrations/oauth";

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

export type ConsentChallengeResult = ConsentChallenge;

export interface AcceptConsentOptions {
  challenge: string;
  grantScope: string[];
  remember?: boolean;
  rememberFor?: number;
}

export interface RejectConsentOptions {
  challenge: string;
  error?: string;
  errorDescription?: string;
}

export interface ConsentActionResult {
  redirectTo: string;
}

export interface ExchangeTokenOptions {
  grantType: "authorization_code";
  code: string;
  clientId: string;
  redirectUri: string;
  codeVerifier: string;
}

export interface ExchangeTokenResult {
  accessToken: string;
  tokenType: string;
  expiresIn?: number;
  refreshToken?: string;
  idToken?: string;
  scope?: string;
}

export interface IOAuthService {
  authorize(params: AuthorizeOptions): Promise<AuthorizeResult>;
  getConsentChallenge(challenge: string): Promise<ConsentChallengeResult>;
  acceptConsent(params: AcceptConsentOptions): Promise<ConsentActionResult>;
  rejectConsent(params: RejectConsentOptions): Promise<ConsentActionResult>;
  exchangeToken(params: ExchangeTokenOptions): Promise<ExchangeTokenResult>;
}
