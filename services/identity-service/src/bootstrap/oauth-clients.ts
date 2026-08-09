import { env } from "@/bootstrap/env";
import type { RegisterOAuthClientInput } from "@/integrations/oauth";

export type OAuthClientSeedConfig = RegisterOAuthClientInput;

export const oauthClients: OAuthClientSeedConfig[] = [
  {
    clientId: "erp-web",
    name: "ERP Web",
    redirectUris: [`${env.ERP_WEB_URL}/callback`],
    grantTypes: ["authorization_code", "refresh_token"],
    scopes: ["openid", "offline", "email"],
    tokenEndpointAuthMethod: "none",
  },
  {
    clientId: "admin-web",
    name: "Admin Web",
    redirectUris: [`${env.ADMIN_WEB_URL}/callback`],
    grantTypes: ["authorization_code", "refresh_token"],
    scopes: ["openid", "offline", "email"],
    tokenEndpointAuthMethod: "none",
  },
];
