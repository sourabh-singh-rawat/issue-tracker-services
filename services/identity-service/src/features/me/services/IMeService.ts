import type { Identity } from "@/integrations/identity";

export interface IMeService {
  getCurrentUser(sessionToken: string): Promise<Identity>;
}
