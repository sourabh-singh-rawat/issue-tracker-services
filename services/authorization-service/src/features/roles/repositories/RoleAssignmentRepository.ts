import { uuidv7 } from "@pine/common";
import { and, eq } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type RoleAssignment, RoleAssignments } from "@/db";
import type {
  CreateRoleAssignmentEntity,
  IRoleAssignmentRepository,
  RoleAssignmentRepositoryOptions,
} from "@/features/roles/repositories/IRoleAssignmentRepository";

@injectable()
export class RoleAssignmentRepository implements IRoleAssignmentRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: RoleAssignmentRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(RoleAssignments)
      .values({
        id: uuidv7(),
        roleId: entity.roleId,
        identityType: entity.identityType,
        identityId: entity.identityId,
        assignedBy: entity.assignedBy ?? null,
        assignedAt: entity.assignedAt ?? now,
        expiresAt: entity.expiresAt ?? null,
        revokedAt: null,
        reason: entity.reason ?? null,
      })
      .returning();

    return created;
  }

  async findByIdentityAndRole(
    identityType: string,
    identityId: string,
    roleId: string,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(RoleAssignments)
      .where(
        and(
          eq(RoleAssignments.identityType, identityType),
          eq(RoleAssignments.identityId, identityId),
          eq(RoleAssignments.roleId, roleId),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async findByIdentity(
    identityType: string,
    identityId: string,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment[]> {
    const client = this.client(options);

    return client
      .select()
      .from(RoleAssignments)
      .where(
        and(
          eq(RoleAssignments.identityType, identityType),
          eq(RoleAssignments.identityId, identityId),
        ),
      );
  }

  async ensure(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<{ assignment: RoleAssignment; created: boolean }> {
    const existing = await this.findByIdentityAndRole(
      entity.identityType,
      entity.identityId,
      entity.roleId,
      options,
    );

    if (existing) {
      return { assignment: existing, created: false };
    }

    const assignment = await this.save(entity, options);
    return { assignment, created: true };
  }
}
