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
  createRole(input: CreateRoleInput, userId: string): Promise<Role>;
  getRoleById(id: string, userId: string): Promise<Role>;
  getRoles(userId: string): Promise<Role[]>;
  updateRole(id: string, input: UpdateRoleInput, userId: string): Promise<Role>;
}
