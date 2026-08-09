import type { RoleAssignment } from "@/db";

export type AssignRoleInput = {
  roleId: string;
  identityType: string;
  identityId: string;
  assignedBy?: string | null;
  expiresAt?: Date | null;
  reason?: string | null;
};

export interface IRoleAssignmentService {
  assignRole(input: AssignRoleInput): Promise<RoleAssignment>;
  getAssignment(
    identityType: string,
    identityId: string,
    roleId: string,
  ): Promise<RoleAssignment | null>;
}
