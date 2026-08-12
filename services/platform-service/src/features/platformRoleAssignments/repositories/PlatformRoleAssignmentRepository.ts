import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type PlatformRoleAssignment,
  PlatformRoleAssignments,
} from "@/db";
import type {
  CreatePlatformRoleAssignmentEntity,
  IPlatformRoleAssignmentRepository,
  ListPlatformRoleAssignmentsFilter,
  PlatformRoleAssignmentRepositoryOptions,
  UpdatePlatformRoleAssignmentEntity,
} from "@/features/platformRoleAssignments/repositories/IPlatformRoleAssignmentRepository";

@injectable()
export class PlatformRoleAssignmentRepository implements IPlatformRoleAssignmentRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreatePlatformRoleAssignmentEntity,
    options?: PlatformRoleAssignmentRepositoryOptions,
  ): Promise<PlatformRoleAssignment> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(PlatformRoleAssignments)
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
    entity: UpdatePlatformRoleAssignmentEntity,
    options?: PlatformRoleAssignmentRepositoryOptions,
  ): Promise<PlatformRoleAssignment | null> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(PlatformRoleAssignments)
      .set({
        ...(entity.expiresAt !== undefined ? { expiresAt: entity.expiresAt } : {}),
        ...(entity.reason !== undefined ? { reason: entity.reason } : {}),
        updatedAt: now,
        version: sql`${PlatformRoleAssignments.version} + 1`,
      })
      .where(
        and(eq(PlatformRoleAssignments.id, id), isNull(PlatformRoleAssignments.deletedAt)),
      )
      .returning();

    return updated ?? null;
  }

  async findById(id: string): Promise<PlatformRoleAssignment | null> {
    const [row] = await this.db
      .select()
      .from(PlatformRoleAssignments)
      .where(
        and(eq(PlatformRoleAssignments.id, id), isNull(PlatformRoleAssignments.deletedAt)),
      )
      .limit(1);

    return row ?? null;
  }

  async findByRoleAndIdentity(
    platformRoleId: string,
    identityId: string,
  ): Promise<PlatformRoleAssignment | null> {
    const [row] = await this.db
      .select()
      .from(PlatformRoleAssignments)
      .where(
        and(
          eq(PlatformRoleAssignments.platformRoleId, platformRoleId),
          eq(PlatformRoleAssignments.identityId, identityId),
          isNull(PlatformRoleAssignments.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async findMany(
    filter?: ListPlatformRoleAssignmentsFilter,
  ): Promise<PlatformRoleAssignment[]> {
    const conditions = [isNull(PlatformRoleAssignments.deletedAt)];

    if (filter?.platformRoleId !== undefined) {
      conditions.push(eq(PlatformRoleAssignments.platformRoleId, filter.platformRoleId));
    }

    if (filter?.identityId !== undefined) {
      conditions.push(eq(PlatformRoleAssignments.identityId, filter.identityId));
    }

    return this.db
      .select()
      .from(PlatformRoleAssignments)
      .where(and(...conditions))
      .orderBy(desc(PlatformRoleAssignments.createdAt));
  }

  async softDelete(
    id: string,
    options?: PlatformRoleAssignmentRepositoryOptions,
  ): Promise<boolean> {
    const client = this.client(options);
    const now = new Date();

    const deleted = await client
      .update(PlatformRoleAssignments)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${PlatformRoleAssignments.version} + 1`,
      })
      .where(
        and(eq(PlatformRoleAssignments.id, id), isNull(PlatformRoleAssignments.deletedAt)),
      )
      .returning({ id: PlatformRoleAssignments.id });

    return deleted.length > 0;
  }

  private client(options?: PlatformRoleAssignmentRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
