import type { Identity } from "@/db";

export interface IIdentityService {
  listIdentities: (platformId: string, identityId: string) => Promise<Identity[]>;
}
