import type { DbClient, RoleAssignment } from "@/db";

export type RoleAssignmentRepositoryOptions = { tx: DbClient };

export type CreateRoleAssignmentEntity = {
  roleId: string;
  identityType: string;
  identityId: string;
  assignedBy?: string | null;
  assignedAt?: Date;
  expiresAt?: Date | null;
  reason?: string | null;
};

export interface IRoleAssignmentRepository {
  save(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment>;
  findByIdentityAndRole(
    identityType: string,
    identityId: string,
    roleId: string,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment | null>;
  findByIdentity(
    identityType: string,
    identityId: string,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment[]>;
  ensure(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<{ assignment: RoleAssignment; created: boolean }>;
}
