import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type PlatformMember,
  PlatformMembers,
} from "@/db";
import type {
  CreatePlatformMemberEntity,
  IPlatformMemberRepository,
  ListPlatformMembersFilter,
  PlatformMemberRepositoryOptions,
  UpdatePlatformMemberEntity,
} from "@/features/platformMembers/repositories/IPlatformMemberRepository";

@injectable()
export class PlatformMemberRepository implements IPlatformMemberRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreatePlatformMemberEntity,
    options?: PlatformMemberRepositoryOptions,
  ): Promise<PlatformMember> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(PlatformMembers)
      .values({
        id: uuidv7(),
        platformRoleId: entity.platformRoleId,
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
    entity: UpdatePlatformMemberEntity,
    options?: PlatformMemberRepositoryOptions,
  ): Promise<PlatformMember | null> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(PlatformMembers)
      .set({
        ...(entity.expiresAt !== undefined ? { expiresAt: entity.expiresAt } : {}),
        ...(entity.reason !== undefined ? { reason: entity.reason } : {}),
        updatedAt: now,
        version: sql`${PlatformMembers.version} + 1`,
      })
      .where(
        and(eq(PlatformMembers.id, id), isNull(PlatformMembers.deletedAt)),
      )
      .returning();

    return updated ?? null;
  }

  async findById(id: string): Promise<PlatformMember | null> {
    const [row] = await this.db
      .select()
      .from(PlatformMembers)
      .where(
        and(eq(PlatformMembers.id, id), isNull(PlatformMembers.deletedAt)),
      )
      .limit(1);

    return row ?? null;
  }

  async findByRoleAndIdentity(
    platformRoleId: string,
    identityId: string,
  ): Promise<PlatformMember | null> {
    const [row] = await this.db
      .select()
      .from(PlatformMembers)
      .where(
        and(
          eq(PlatformMembers.platformRoleId, platformRoleId),
          eq(PlatformMembers.identityId, identityId),
          isNull(PlatformMembers.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async findMany(
    filter?: ListPlatformMembersFilter,
  ): Promise<PlatformMember[]> {
    const conditions = [isNull(PlatformMembers.deletedAt)];

    if (filter?.platformRoleId !== undefined) {
      conditions.push(eq(PlatformMembers.platformRoleId, filter.platformRoleId));
    }

    if (filter?.identityId !== undefined) {
      conditions.push(eq(PlatformMembers.identityId, filter.identityId));
    }

    return this.db
      .select()
      .from(PlatformMembers)
      .where(and(...conditions))
      .orderBy(desc(PlatformMembers.createdAt));
  }

  async softDelete(
    id: string,
    options?: PlatformMemberRepositoryOptions,
  ): Promise<boolean> {
    const client = this.client(options);
    const now = new Date();

    const deleted = await client
      .update(PlatformMembers)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${PlatformMembers.version} + 1`,
      })
      .where(
        and(eq(PlatformMembers.id, id), isNull(PlatformMembers.deletedAt)),
      )
      .returning({ id: PlatformMembers.id });

    return deleted.length > 0;
  }

  private client(options?: PlatformMemberRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
