const ACCESS_TOKEN_KEY = "inventory.access_token";
const REFRESH_TOKEN_KEY = "inventory.refresh_token";
const ID_TOKEN_KEY = "inventory.id_token";
const TOKEN_TYPE_KEY = "inventory.token_type";
const OIDC_STATE_KEY = "inventory.oidc_state";
const OIDC_CODE_VERIFIER_KEY = "inventory.oidc_code_verifier";

export type TokenResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn?: number;
  refreshToken?: string;
  idToken?: string;
  scope?: string;
};

export const getAccessToken = (): string | null => sessionStorage.getItem(ACCESS_TOKEN_KEY);

export const getOidcState = (): string | null => sessionStorage.getItem(OIDC_STATE_KEY);

export const setOidcState = (state: string): void => {
  sessionStorage.setItem(OIDC_STATE_KEY, state);
};

export const clearOidcState = (): void => {
  sessionStorage.removeItem(OIDC_STATE_KEY);
};

export const getOidcCodeVerifier = (): string | null =>
  sessionStorage.getItem(OIDC_CODE_VERIFIER_KEY);

export const setOidcCodeVerifier = (codeVerifier: string): void => {
  sessionStorage.setItem(OIDC_CODE_VERIFIER_KEY, codeVerifier);
};

export const clearOidcCodeVerifier = (): void => {
  sessionStorage.removeItem(OIDC_CODE_VERIFIER_KEY);
};

export const storeTokens = (tokens: TokenResponse): void => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  sessionStorage.setItem(TOKEN_TYPE_KEY, tokens.tokenType);

  if (tokens.refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  } else {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  if (tokens.idToken) {
    sessionStorage.setItem(ID_TOKEN_KEY, tokens.idToken);
  } else {
    sessionStorage.removeItem(ID_TOKEN_KEY);
  }
};

export const clearTokens = (): void => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ID_TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_TYPE_KEY);
};

const base64UrlEncode = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const createPkcePair = async (): Promise<{
  codeVerifier: string;
  codeChallenge: string;
}> => {
  const random = crypto.getRandomValues(new Uint8Array(32));
  const codeVerifier = base64UrlEncode(random.buffer);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  const codeChallenge = base64UrlEncode(digest);
  return { codeVerifier, codeChallenge };
};
