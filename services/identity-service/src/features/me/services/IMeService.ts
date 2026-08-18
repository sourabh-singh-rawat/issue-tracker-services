import type { Profile } from "@/db";
import type { Identity } from "@/integrations/identity";

export type CurrentUser = {
  identity: Identity;
  profile: Profile | null;
};

export interface IMeService {
  getCurrentUser(sessionToken: string): Promise<CurrentUser>;
}
