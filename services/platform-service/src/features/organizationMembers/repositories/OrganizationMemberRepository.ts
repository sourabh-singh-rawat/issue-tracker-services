import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type OrganizationMember,
  OrganizationMembers,
} from "@/db";
import type {
  CreateOrganizationMemberEntity,
  IOrganizationMemberRepository,
  ListOrganizationMembersFilter,
  OrganizationMemberRepositoryOptions,
} from "@/features/organizationMembers/repositories/IOrganizationMemberRepository";

@injectable()
export class OrganizationMemberRepository implements IOrganizationMemberRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreateOrganizationMemberEntity,
    options?: OrganizationMemberRepositoryOptions,
  ): Promise<OrganizationMember> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(OrganizationMembers)
      .values({
        id: uuidv7(),
        organizationId: entity.organizationId,
        roleId: entity.roleId,
        identityId: entity.identityId,
        assignedBy: entity.assignedBy ?? null,
        assignedAt: entity.assignedAt ?? now,
        expiresAt: entity.expiresAt ?? null,
        reason: entity.reason ?? null,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async findById(id: string): Promise<OrganizationMember | null> {
    const [row] = await this.db
      .select()
      .from(OrganizationMembers)
      .where(and(eq(OrganizationMembers.id, id), isNull(OrganizationMembers.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByOrganizationRoleAndIdentity(
    organizationId: string,
    roleId: string,
    identityId: string,
  ): Promise<OrganizationMember | null> {
    const [row] = await this.db
      .select()
      .from(OrganizationMembers)
      .where(
        and(
          eq(OrganizationMembers.organizationId, organizationId),
          eq(OrganizationMembers.roleId, roleId),
          eq(OrganizationMembers.identityId, identityId),
          isNull(OrganizationMembers.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async findMany(filter?: ListOrganizationMembersFilter): Promise<OrganizationMember[]> {
    const conditions = [isNull(OrganizationMembers.deletedAt)];

    if (filter?.organizationId !== undefined) {
      conditions.push(eq(OrganizationMembers.organizationId, filter.organizationId));
    }

    if (filter?.roleId !== undefined) {
      conditions.push(eq(OrganizationMembers.roleId, filter.roleId));
    }

    if (filter?.identityId !== undefined) {
      conditions.push(eq(OrganizationMembers.identityId, filter.identityId));
    }

    return this.db
      .select()
      .from(OrganizationMembers)
      .where(and(...conditions))
      .orderBy(desc(OrganizationMembers.createdAt));
  }

  private client(options?: OrganizationMemberRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
