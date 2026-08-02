import type { Role } from "@/db";

export type CreateRoleInput = {
  key: string;
  name: string;
  description?: string | null;
  capabilityKeys?: string[];
};

export type UpdateRoleInput = {
  name?: string;
  description?: string | null;
  capabilityKeys?: string[];
};

export interface IRoleService {
  createRole(input: CreateRoleInput): Promise<Role>;
  getRoleById(id: string): Promise<Role>;
  getRoles(): Promise<Role[]>;
  updateRole(id: string, input: UpdateRoleInput): Promise<Role>;
}
