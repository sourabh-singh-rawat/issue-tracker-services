import type { Capability, PlatformRole } from "@/db";

export type CreatePlatformRoleInput = {
  key: string;
  name: string;
  description?: string | null;
};

export type UpdatePlatformRoleInput = {
  name?: string;
  description?: string | null;
};

export interface IPlatformRoleService {
  createPlatformRole: (
    input: CreatePlatformRoleInput,
    userId: string,
  ) => Promise<PlatformRole>;
  getPlatformRoleById: (id: string, userId: string) => Promise<PlatformRole>;
  listPlatformRoles: (userId: string) => Promise<PlatformRole[]>;
  getCapabilitiesForPlatformRole: (role: PlatformRole) => Promise<Capability[]>;
  updatePlatformRole: (
    id: string,
    input: UpdatePlatformRoleInput,
    userId: string,
  ) => Promise<PlatformRole>;
  deletePlatformRole: (id: string, userId: string) => Promise<void>;
}
