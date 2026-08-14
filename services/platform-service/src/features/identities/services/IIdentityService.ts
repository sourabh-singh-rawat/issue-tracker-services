import type { Identity } from "@/db";

export interface IIdentityService {
  listIdentities: (platformId: string, userId: string) => Promise<Identity[]>;
}
