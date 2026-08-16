export type PlatformMember = {
  id: string;
  identityId: string;
  relation: string;
};

export type CreatePlatformMemberInput = {
  relation: string;
  identityId: string;
};

export type CreatePlatformMemberOptions = {
  skipAuthorization?: boolean;
};

export type ListPlatformMembersInput = {
  relation?: string;
  identityId?: string;
};

export interface IPlatformMemberService {
  create: (
    input: CreatePlatformMemberInput,
    identityId: string,
    options?: CreatePlatformMemberOptions,
  ) => Promise<PlatformMember>;
  getById: (id: string, identityId: string) => Promise<PlatformMember>;
  list: (input: ListPlatformMembersInput, identityId: string) => Promise<PlatformMember[]>;
  delete: (id: string, identityId: string) => Promise<void>;
}
