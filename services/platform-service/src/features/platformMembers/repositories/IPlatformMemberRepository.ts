import type { DbClient, PlatformMember } from "@/db";

export type PlatformMemberRepositoryOptions = { tx: DbClient };

export type CreatePlatformMemberEntity = {
  platformRoleId: string;
  identityId: string;
  assignedBy?: string | null;
  assignedAt?: Date;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type UpdatePlatformMemberEntity = {
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListPlatformMembersFilter = {
  platformRoleId?: string;
  identityId?: string;
};

export interface IPlatformMemberRepository {
  save: (
    entity: CreatePlatformMemberEntity,
    options?: PlatformMemberRepositoryOptions,
  ) => Promise<PlatformMember>;
  update: (
    id: string,
    entity: UpdatePlatformMemberEntity,
    options?: PlatformMemberRepositoryOptions,
  ) => Promise<PlatformMember | null>;
  findById: (id: string) => Promise<PlatformMember | null>;
  findByRoleAndIdentity: (
    platformRoleId: string,
    identityId: string,
  ) => Promise<PlatformMember | null>;
  findMany: (
    filter?: ListPlatformMembersFilter,
  ) => Promise<PlatformMember[]>;
  softDelete: (
    id: string,
    options?: PlatformMemberRepositoryOptions,
  ) => Promise<boolean>;
}
