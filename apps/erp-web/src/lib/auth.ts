const AUTHENTICATED_KEY = "erp.authenticated";
const OIDC_STATE_KEY = "erp.oidc_state";
const OIDC_CODE_VERIFIER_KEY = "erp.oidc_code_verifier";

export const isAuthenticated = (): boolean => sessionStorage.getItem(AUTHENTICATED_KEY) === "1";

export const markAuthenticated = (): void => {
  sessionStorage.setItem(AUTHENTICATED_KEY, "1");
};

export const clearAuthenticated = (): void => {
  sessionStorage.removeItem(AUTHENTICATED_KEY);
};

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

/** Build the identity-service OAuth authorize URL and persist PKCE state. */
export const startOidcLogin = async (): Promise<string> => {
  const state = crypto.randomUUID();
  const { codeVerifier, codeChallenge } = await createPkcePair();

  setOidcState(state);
  setOidcCodeVerifier(codeVerifier);

  const authorizeUrl = new URL("/identity/oauth/authorize", import.meta.env.VITE_API_BASE_URL);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", import.meta.env.VITE_ERP_WEB_OIDC_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", import.meta.env.VITE_ERP_WEB_OIDC_REDIRECT_URI);
  authorizeUrl.searchParams.set("scope", import.meta.env.VITE_OIDC_SCOPES ?? "openid email");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");

  return authorizeUrl.toString();
};

/** Full-page navigation into the OIDC authorize flow. */
export const redirectToOidcLogin = (): void => {
  void startOidcLogin().then((href) => {
    window.location.assign(href);
  });
};
