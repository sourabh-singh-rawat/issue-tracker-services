import type { Identity } from "@/db";

export interface IMeService {
  getCurrentUser(identityId: string): Promise<Identity>;
}
