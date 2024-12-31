/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPERGRAPH_URL: string;
  readonly VITE_EMAIL_VERIFICATION_REDIRECT_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
