import type { Identity } from "@/integrations/identity";

export interface ISessionService {
  getIdentityFromSessionToken(sessionToken: string): Promise<Identity>;
  getIdentityFromAccessToken(accessToken: string): Promise<Identity>;
}
