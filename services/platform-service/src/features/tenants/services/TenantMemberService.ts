import {
  ADMIN,
  IDENTITY,
  MEMBER,
  OWNER,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  InvalidTenantRelationError,
  TenantMemberNotFoundError,
} from "@/features/tenants/errors";
import type {
  CreateTenantMemberInput,
  CreateTenantMemberOptions,
  ITenantMemberService,
  ListTenantMembersInput,
  TenantMember,
} from "@/features/tenants/services/ITenantMemberService";

const tenantRelations = new Set([OWNER, ADMIN, MEMBER]);

const assertTenantRelation = (relation: string) => {
  if (!tenantRelations.has(relation)) {
    throw new InvalidTenantRelationError(`Invalid tenant relation: ${relation}`);
  }
};

@injectable()
export class TenantMemberService implements ITenantMemberService {
  constructor(
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async create(
    input: CreateTenantMemberInput,
    identityId: string,
    options?: CreateTenantMemberOptions,
  ): Promise<TenantMember> {
    if (!options?.skipAuthorization) {
      await requirePermission(
        this.authorizationClient,
        identityId,
        "assign_admin",
        `tenant:${input.tenantId}`,
      );
    }

    assertTenantRelation(input.relation);

    await this.authorizationClient.ensureRelationship({
      object: { namespace: "tenant", id: input.tenantId },
      relation: input.relation,
      subject: { namespace: IDENTITY, id: input.identityId },
    });

    return {
      id: `${input.tenantId}:${input.relation}:${input.identityId}`,
      tenantId: input.tenantId,
      identityId: input.identityId,
      relation: input.relation,
    };
  }

  async getById(id: string, identityId: string): Promise<TenantMember> {
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
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    const tenantId = parts[0];
    const relation = parts[1];
    const memberIdentityId = parts[2];

    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `tenant:${tenantId}`,
    );

    assertTenantRelation(relation);

    const members = await this.membersFor(tenantId, relation);
    const member = members.find((item) => item.identityId === memberIdentityId);
    if (!member) {
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    return member;
  }

  async list(input: ListTenantMembersInput, identityId: string): Promise<TenantMember[]> {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `tenant:${input.tenantId}`,
    );

    const relations = input.relation === undefined ? [OWNER, ADMIN, MEMBER] : [input.relation];
    if (input.relation !== undefined) {
      assertTenantRelation(input.relation);
    }

    const members: TenantMember[] = [];
    for (const relation of relations) {
      const assigned = await this.membersFor(input.tenantId, relation);
      for (const member of assigned) {
        if (input.identityId !== undefined && member.identityId !== input.identityId) {
          continue;
        }
        members.push(member);
      }
    }

    return members;
  }

  async delete(id: string, identityId: string): Promise<void> {
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
      throw new TenantMemberNotFoundError(`Tenant member not found: ${id}`);
    }

    const tenantId = parts[0];
    const relation = parts[1];
    const memberIdentityId = parts[2];

    await requirePermission(
      this.authorizationClient,
      identityId,
      "assign_admin",
      `tenant:${tenantId}`,
    );

    assertTenantRelation(relation);

    await this.authorizationClient.deleteRelationship({
      object: { namespace: "tenant", id: tenantId },
      relation,
      subject: { namespace: IDENTITY, id: memberIdentityId },
    });
  }

  private membersFor = async (tenantId: string, relation: string): Promise<TenantMember[]> => {
    const relationships = await this.authorizationClient.listRelationships({
      namespace: "tenant",
      object: tenantId,
      relation,
    });

    const members: TenantMember[] = [];
    for (const relationship of relationships) {
      if (relationship.subject === undefined) {
        continue;
      }
      members.push({
        id: `${tenantId}:${relation}:${relationship.subject.id}`,
        tenantId,
        identityId: relationship.subject.id,
        relation,
      });
    }
    return members;
  };
}
