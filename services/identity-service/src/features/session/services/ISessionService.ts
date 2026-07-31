import type { Identity } from "@/integrations/identity";

export interface ISessionService {
  getSession(sessionToken: string): Promise<Identity>;
  getSessionFromAccessToken(accessToken: string): Promise<Identity>;
}
