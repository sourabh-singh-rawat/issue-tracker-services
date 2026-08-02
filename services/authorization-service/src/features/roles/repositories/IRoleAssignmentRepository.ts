import type { DbClient, RoleAssignment } from "@/db";

export type RoleAssignmentRepositoryOptions = { tx: DbClient };

export type CreateRoleAssignmentEntity = {
  roleId: string;
  subjectType: string;
  subjectId: string;
  scopeType?: string | null;
  scopeId?: string | null;
};

export interface IRoleAssignmentRepository {
  save(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment>;
  findBySubjectAndRole(
    subjectType: string,
    subjectId: string,
    roleId: string,
    scope?: { scopeType: string; scopeId: string } | null,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment | null>;
  findBySubject(
    subjectType: string,
    subjectId: string,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment[]>;
  ensure(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<{ assignment: RoleAssignment; created: boolean }>;
}
