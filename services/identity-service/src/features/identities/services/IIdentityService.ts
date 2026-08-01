import type { Identity } from "@/db";

export interface IIdentityService {
  getIdentityById(id: string): Promise<Identity>;
  getIdentityByIdpId(idpId: string): Promise<Identity>;
}
