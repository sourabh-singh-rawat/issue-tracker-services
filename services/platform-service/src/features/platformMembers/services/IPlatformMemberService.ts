import type { PlatformMember } from "@/db";

export type CreatePlatformMemberInput = {
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
    userId: string,
  ) => Promise<PlatformMember>;
  listPlatformMembers: (
    input: ListPlatformMembersInput,
    userId: string,
  ) => Promise<PlatformMember[]>;
  updatePlatformMember: (
    id: string,
    input: UpdatePlatformMemberInput,
    userId: string,
  ) => Promise<PlatformMember>;
  deletePlatformMember: (id: string, userId: string) => Promise<void>;
}
