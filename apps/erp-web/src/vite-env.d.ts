/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  /** identity-web origin (signin/registration UI). Default: http://localhost:3000 */
  readonly VITE_IDENTITY_WEB_URL?: string;
  /** Full URL after email verification (defaults to identity-web /signin). */
  readonly VITE_EMAIL_VERIFICATION_REDIRECT_URL?: string;
  readonly VITE_ERP_WEB_OIDC_CLIENT_ID: string;
  readonly VITE_ERP_WEB_OIDC_REDIRECT_URI: string;
  readonly VITE_OIDC_SCOPES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
