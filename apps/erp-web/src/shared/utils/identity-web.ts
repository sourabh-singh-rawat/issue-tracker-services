/** Base URL of identity-web (signin/registration live there). */
export function getIdentityWebBaseUrl(): string {
  const base = import.meta.env.VITE_IDENTITY_WEB_URL ?? "http://localhost:3000";
  return base.replace(/\/$/, "");
}

export function getIdentityWebSignInUrl(): string {
  return `${getIdentityWebBaseUrl()}/signin`;
}

/** Full-page redirect to identity-web signin (cross-app). */
export function redirectToIdentitySignIn(): void {
  window.location.assign(getIdentityWebSignInUrl());
}
