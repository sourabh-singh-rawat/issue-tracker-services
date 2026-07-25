/** Base URL of identity-web (login/signup live there). */
export function getIdentityWebBaseUrl(): string {
  const base = import.meta.env.VITE_IDENTITY_WEB_URL ?? "http://localhost:3001";
  return base.replace(/\/$/, "");
}

export function getIdentityWebLoginUrl(): string {
  return `${getIdentityWebBaseUrl()}/login`;
}

/** Full-page redirect to identity-web login (cross-app). */
export function redirectToIdentityLogin(): void {
  window.location.assign(getIdentityWebLoginUrl());
}
