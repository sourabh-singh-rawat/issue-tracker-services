import {
  ADMIN,
  MEMBER,
  OWNER,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  InvalidOrganizationRelationError,
  OrganizationMemberNotFoundError,
} from "@/features/organizations/errors";
import type {
  IOrganizationMemberService,
  ListOrganizationMembersInput,
  OrganizationMember,
} from "@/features/organizations/services/IOrganizationMemberService";

const organizationRelations = new Set([OWNER, ADMIN, MEMBER]);

const assertOrganizationRelation = (relation: string) => {
  if (!organizationRelations.has(relation)) {
    throw new InvalidOrganizationRelationError(`Invalid organization relation: ${relation}`);
  }
};

@injectable()
export class OrganizationMemberService implements IOrganizationMemberService {
  constructor(
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async getById(id: string, identityId: string): Promise<OrganizationMember> {
    const parts = id.split(":");
    if (
      parts.length !== 3 ||
      parts[0] === undefined ||
      parts[1] === undefined ||
      parts[2] === undefined ||
      parts[0].length === 0 ||
      parts[1].length === 0 ||
      parts[2].length === 0
    ) {
      throw new OrganizationMemberNotFoundError(`Organization member not found: ${id}`);
    }

    const organizationId = parts[0];
    const relation = parts[1];
    const memberIdentityId = parts[2];

    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `organization:${organizationId}`,
    );

    assertOrganizationRelation(relation);

    const members = await this.membersFor(organizationId, relation);
    const member = members.find((item) => item.identityId === memberIdentityId);
    if (!member) {
      throw new OrganizationMemberNotFoundError(`Organization member not found: ${id}`);
    }

    return member;
  }

  async list(
    input: ListOrganizationMembersInput,
    identityId: string,
  ): Promise<OrganizationMember[]> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `organization:${input.organizationId}`,
    );

    const relations = input.relation === undefined ? [OWNER, ADMIN, MEMBER] : [input.relation];
    if (input.relation !== undefined) {
      assertOrganizationRelation(input.relation);
    }

    const members: OrganizationMember[] = [];
    for (const relation of relations) {
      const assigned = await this.membersFor(input.organizationId, relation);
      for (const member of assigned) {
        if (input.identityId !== undefined && member.identityId !== input.identityId) {
          continue;
        }
        members.push(member);
      }
    }

    return members;
  }

  private membersFor = async (
    organizationId: string,
    relation: string,
  ): Promise<OrganizationMember[]> => {
    const relationships = await this.authorizationClient.listRelationships({
      namespace: "organization",
      object: organizationId,
      relation,
    });

    const members: OrganizationMember[] = [];
    for (const relationship of relationships) {
      if (relationship.subject === undefined) {
        continue;
      }
      members.push({
        id: `${organizationId}:${relation}:${relationship.subject.id}`,
        organizationId,
        identityId: relationship.subject.id,
        relation,
      });
    }
    return members;
  };
}
