export type OrganizationMember = {
  id: string;
  organizationId: string;
  identityId: string;
  relation: string;
};

export type ListOrganizationMembersInput = {
  organizationId: string;
  relation?: string;
  identityId?: string;
};

export interface IOrganizationMemberService {
  getById: (id: string, identityId: string) => Promise<OrganizationMember>;
  list: (input: ListOrganizationMembersInput, identityId: string) => Promise<OrganizationMember[]>;
}
