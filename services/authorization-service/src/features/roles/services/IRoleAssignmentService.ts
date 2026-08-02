import type { RoleAssignment } from "@/db";

export type AssignRoleInput = {
  roleId: string;
  subjectType: string;
  subjectId: string;
  scopeType?: string | null;
  scopeId?: string | null;
};

export interface IRoleAssignmentService {
  assignRole(input: AssignRoleInput): Promise<RoleAssignment>;
  getAssignment(
    subjectType: string,
    subjectId: string,
    roleId: string,
    scope?: { scopeType: string; scopeId: string } | null,
  ): Promise<RoleAssignment | null>;
}
