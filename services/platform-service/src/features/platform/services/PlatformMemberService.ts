import {
  ADMIN,
  IDENTITY,
  MEMBER,
  PLATFORM_OBJECT_ID,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  InvalidPlatformRelationError,
  PlatformMemberNotFoundError,
} from "@/features/platform/errors";
import type {
  CreatePlatformMemberInput,
  CreatePlatformMemberOptions,
  IPlatformMemberService,
  ListPlatformMembersInput,
  PlatformMember,
} from "@/features/platform/services/IPlatformMemberService";

@injectable()
export class PlatformMemberService implements IPlatformMemberService {
  constructor(
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async create(
    input: CreatePlatformMemberInput,
    identityId: string,
    options?: CreatePlatformMemberOptions,
  ) {
    if (!options?.skipAuthorization) {
      await requirePermission(
        this.authorizationClient,
        identityId,
        "manage_admins",
        `platform:${PLATFORM_OBJECT_ID}`,
      );
    }

    if (input.relation !== ADMIN && input.relation !== MEMBER) {
      throw new InvalidPlatformRelationError(`Invalid platform relation: ${input.relation}`);
    }

    await this.authorizationClient.ensureRelationship({
      object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
      relation: input.relation,
      subject: { namespace: IDENTITY, id: input.identityId },
    });

    return {
      id: `${PLATFORM_OBJECT_ID}:${input.relation}:${input.identityId}`,
      identityId: input.identityId,
      relation: input.relation,
    };
  }

  async getById(id: string, identityId: string) {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `platform:${PLATFORM_OBJECT_ID}`,
    );

    const parts = id.split(":");
    if (
      parts.length !== 3 ||
      parts[0] !== PLATFORM_OBJECT_ID ||
      parts[1] === undefined ||
      parts[2] === undefined ||
      parts[1].length === 0 ||
      parts[2].length === 0
    ) {
      throw new PlatformMemberNotFoundError(`Platform member not found: ${id}`);
    }

    const relation = parts[1];
    const memberIdentityId = parts[2];
    const members = await this.membersFor(relation);
    const member = members.find((item) => item.identityId === memberIdentityId);
    if (!member) {
      throw new PlatformMemberNotFoundError(`Platform member not found: ${id}`);
    }

    return member;
  }

  async list(input: ListPlatformMembersInput, identityId: string) {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `platform:${PLATFORM_OBJECT_ID}`,
    );

    const relations = input.relation === undefined ? [ADMIN, MEMBER] : [input.relation];
    if (input.relation !== undefined && input.relation !== ADMIN && input.relation !== MEMBER) {
      throw new InvalidPlatformRelationError(`Invalid platform relation: ${input.relation}`);
    }

    const members: PlatformMember[] = [];
    for (const relation of relations) {
      const assigned = await this.membersFor(relation);
      for (const member of assigned) {
        if (input.identityId !== undefined && member.identityId !== input.identityId) {
          continue;
        }
        members.push(member);
      }
    }

    return members;
  }

  async delete(id: string, identityId: string) {
    await requirePermission(
      this.authorizationClient,
      identityId,
      "manage_admins",
      `platform:${PLATFORM_OBJECT_ID}`,
    );

    const parts = id.split(":");
    if (
      parts.length !== 3 ||
      parts[0] !== PLATFORM_OBJECT_ID ||
      parts[1] === undefined ||
      parts[2] === undefined ||
      parts[1].length === 0 ||
      parts[2].length === 0
    ) {
      throw new PlatformMemberNotFoundError(`Platform member not found: ${id}`);
    }

    const relation = parts[1];
    const memberIdentityId = parts[2];
    if (relation !== ADMIN && relation !== MEMBER) {
      throw new InvalidPlatformRelationError(`Invalid platform relation: ${relation}`);
    }

    await this.authorizationClient.deleteRelationship({
      object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
      relation,
      subject: { namespace: IDENTITY, id: memberIdentityId },
    });
  }

  private membersFor = async (relation: string): Promise<PlatformMember[]> => {
    const relationships = await this.authorizationClient.listRelationships({
      namespace: "platform",
      object: PLATFORM_OBJECT_ID,
      relation,
    });

    const members: PlatformMember[] = [];
    for (const relationship of relationships) {
      if (relationship.subject === undefined) {
        continue;
      }
      members.push({
        id: `${PLATFORM_OBJECT_ID}:${relation}:${relationship.subject.id}`,
        identityId: relationship.subject.id,
        relation,
      });
    }
    return members;
  };
}
