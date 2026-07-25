/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  /** identity-web origin (login/signup). Default: http://localhost:3001 */
  readonly VITE_IDENTITY_WEB_URL?: string;
  /** Full URL after email verification (defaults to identity-web /login). */
  readonly VITE_EMAIL_VERIFICATION_REDIRECT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
