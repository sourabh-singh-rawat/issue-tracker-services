const AUTHENTICATED_KEY = "inventory.authenticated";
const OIDC_STATE_KEY = "inventory.oidc_state";
const OIDC_CODE_VERIFIER_KEY = "inventory.oidc_code_verifier";

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
