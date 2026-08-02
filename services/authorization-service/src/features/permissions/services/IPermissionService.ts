import type { Permission } from "@/features/permissions/repositories";

export type CreatePermissionInput = {
  key: string;
  name: string;
  description?: string | null;
};

export type UpdatePermissionInput = {
  name?: string;
  description?: string | null;
};

export interface IPermissionService {
  createPermission(input: CreatePermissionInput): Promise<Permission>;
  getPermissionByKey(key: string): Promise<Permission>;
  getPermissions(): Promise<Permission[]>;
  updatePermission(key: string, input: UpdatePermissionInput): Promise<Permission>;
}
