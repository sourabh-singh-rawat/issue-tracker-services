import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type TenantMember, TenantMembers } from "@/db";
import type {
  CreateTenantMemberEntity,
  ITenantMemberRepository,
  ListTenantMembersFilter,
  TenantMemberRepositoryOptions,
  UpdateTenantMemberEntity,
} from "@/features/tenantMembers/repositories/ITenantMemberRepository";

@injectable()
export class TenantMemberRepository implements ITenantMemberRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreateTenantMemberEntity,
    options?: TenantMemberRepositoryOptions,
  ): Promise<TenantMember> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(TenantMembers)
      .values({
        id: uuidv7(),
        tenantId: entity.tenantId,
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

  async update(
    id: string,
    entity: UpdateTenantMemberEntity,
    options?: TenantMemberRepositoryOptions,
  ): Promise<TenantMember | null> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(TenantMembers)
      .set({
        ...(entity.expiresAt !== undefined ? { expiresAt: entity.expiresAt } : {}),
        ...(entity.reason !== undefined ? { reason: entity.reason } : {}),
        updatedAt: now,
        version: sql`${TenantMembers.version} + 1`,
      })
      .where(and(eq(TenantMembers.id, id), isNull(TenantMembers.deletedAt)))
      .returning();

    return updated ?? null;
  }

  async findById(id: string): Promise<TenantMember | null> {
    const [row] = await this.db
      .select()
      .from(TenantMembers)
      .where(and(eq(TenantMembers.id, id), isNull(TenantMembers.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByTenantRoleAndIdentity(
    tenantId: string,
    roleId: string,
    identityId: string,
  ): Promise<TenantMember | null> {
    const [row] = await this.db
      .select()
      .from(TenantMembers)
      .where(
        and(
          eq(TenantMembers.tenantId, tenantId),
          eq(TenantMembers.roleId, roleId),
          eq(TenantMembers.identityId, identityId),
          isNull(TenantMembers.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async findMany(filter?: ListTenantMembersFilter): Promise<TenantMember[]> {
    const conditions = [isNull(TenantMembers.deletedAt)];

    if (filter?.tenantId !== undefined) {
      conditions.push(eq(TenantMembers.tenantId, filter.tenantId));
    }

    if (filter?.roleId !== undefined) {
      conditions.push(eq(TenantMembers.roleId, filter.roleId));
    }

    if (filter?.identityId !== undefined) {
      conditions.push(eq(TenantMembers.identityId, filter.identityId));
    }

    return this.db
      .select()
      .from(TenantMembers)
      .where(and(...conditions))
      .orderBy(desc(TenantMembers.createdAt));
  }

  async softDelete(
    id: string,
    options?: TenantMemberRepositoryOptions,
  ): Promise<boolean> {
    const client = this.client(options);
    const now = new Date();

    const deleted = await client
      .update(TenantMembers)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${TenantMembers.version} + 1`,
      })
      .where(and(eq(TenantMembers.id, id), isNull(TenantMembers.deletedAt)))
      .returning({ id: TenantMembers.id });

    return deleted.length > 0;
  }

  private client(options?: TenantMemberRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
