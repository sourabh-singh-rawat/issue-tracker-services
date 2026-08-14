import type { PlatformMember } from "@/db";

export type CreatePlatformMemberInput = {
  platformId: string;
  platformRoleId: string;
  identityId: string;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type UpdatePlatformMemberInput = {
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListPlatformMembersInput = {
  platformId: string;
  platformRoleId?: string;
  identityId?: string;
};

export interface IPlatformMemberService {
  createPlatformMember: (
    input: CreatePlatformMemberInput,
    userId: string,
  ) => Promise<PlatformMember>;
  getPlatformMemberById: (
    id: string,
    platformId: string,
    userId: string,
  ) => Promise<PlatformMember>;
  listPlatformMembers: (
    input: ListPlatformMembersInput,
    userId: string,
  ) => Promise<PlatformMember[]>;
  updatePlatformMember: (
    id: string,
    input: UpdatePlatformMemberInput,
    platformId: string,
    userId: string,
  ) => Promise<PlatformMember>;
  deletePlatformMember: (id: string, platformId: string, userId: string) => Promise<void>;
}
