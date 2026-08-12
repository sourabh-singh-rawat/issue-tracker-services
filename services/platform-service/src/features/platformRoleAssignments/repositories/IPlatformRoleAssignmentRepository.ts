import type { DbClient, PlatformRoleAssignment } from "@/db";

export type PlatformRoleAssignmentRepositoryOptions = { tx: DbClient };

export type CreatePlatformRoleAssignmentEntity = {
  platformRoleId: string;
  identityId: string;
  assignedBy?: string | null;
  assignedAt?: Date;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type UpdatePlatformRoleAssignmentEntity = {
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListPlatformRoleAssignmentsFilter = {
  platformRoleId?: string;
  identityId?: string;
};

export interface IPlatformRoleAssignmentRepository {
  save: (
    entity: CreatePlatformRoleAssignmentEntity,
    options?: PlatformRoleAssignmentRepositoryOptions,
  ) => Promise<PlatformRoleAssignment>;
  update: (
    id: string,
    entity: UpdatePlatformRoleAssignmentEntity,
    options?: PlatformRoleAssignmentRepositoryOptions,
  ) => Promise<PlatformRoleAssignment | null>;
  findById: (id: string) => Promise<PlatformRoleAssignment | null>;
  findByRoleAndIdentity: (
    platformRoleId: string,
    identityId: string,
  ) => Promise<PlatformRoleAssignment | null>;
  findMany: (
    filter?: ListPlatformRoleAssignmentsFilter,
  ) => Promise<PlatformRoleAssignment[]>;
  softDelete: (
    id: string,
    options?: PlatformRoleAssignmentRepositoryOptions,
  ) => Promise<boolean>;
}
