import type { PlatformRole } from "@/db";
import type { CatalogPermission } from "@/features/roles/catalogPermissions";

export type CreatePlatformRoleInput = {
  platformId: string;
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
  getPlatformRoleById: (id: string, platformId: string, userId: string) => Promise<PlatformRole>;
  listPlatformRoles: (platformId: string, userId: string) => Promise<PlatformRole[]>;
  getPermissionsForPlatformRole: (role: PlatformRole) => CatalogPermission[];
  updatePlatformRole: (
    id: string,
    input: UpdatePlatformRoleInput,
    platformId: string,
    userId: string,
  ) => Promise<PlatformRole>;
  deletePlatformRole: (id: string, platformId: string, userId: string) => Promise<void>;
}
