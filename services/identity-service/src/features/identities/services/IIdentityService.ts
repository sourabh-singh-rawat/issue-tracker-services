import type { Identity } from "@/db";

export interface IIdentityService {
  getIdentityById(id: string): Promise<Identity>;
  getIdentityByEmail(email: string): Promise<Identity>;
}
