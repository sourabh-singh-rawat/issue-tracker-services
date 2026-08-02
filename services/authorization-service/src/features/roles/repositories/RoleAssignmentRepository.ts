import { uuidv7 } from "@pine/common";
import { and, eq, isNull } from "drizzle-orm";
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

  private scopeCondition(
    scope?: { scopeType: string; scopeId: string } | null,
  ) {
    if (scope == null) {
      return and(isNull(RoleAssignments.scopeType), isNull(RoleAssignments.scopeId));
    }

    return and(
      eq(RoleAssignments.scopeType, scope.scopeType),
      eq(RoleAssignments.scopeId, scope.scopeId),
    );
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
        subjectType: entity.subjectType,
        subjectId: entity.subjectId,
        scopeType: entity.scopeType ?? null,
        scopeId: entity.scopeId ?? null,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async findBySubjectAndRole(
    subjectType: string,
    subjectId: string,
    roleId: string,
    scope?: { scopeType: string; scopeId: string } | null,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(RoleAssignments)
      .where(
        and(
          eq(RoleAssignments.subjectType, subjectType),
          eq(RoleAssignments.subjectId, subjectId),
          eq(RoleAssignments.roleId, roleId),
          this.scopeCondition(scope),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async findBySubject(
    subjectType: string,
    subjectId: string,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<RoleAssignment[]> {
    const client = this.client(options);

    return client
      .select()
      .from(RoleAssignments)
      .where(
        and(
          eq(RoleAssignments.subjectType, subjectType),
          eq(RoleAssignments.subjectId, subjectId),
        ),
      );
  }

  async ensure(
    entity: CreateRoleAssignmentEntity,
    options?: RoleAssignmentRepositoryOptions,
  ): Promise<{ assignment: RoleAssignment; created: boolean }> {
    const scope =
      entity.scopeType != null && entity.scopeId != null
        ? { scopeType: entity.scopeType, scopeId: entity.scopeId }
        : null;

    const existing = await this.findBySubjectAndRole(
      entity.subjectType,
      entity.subjectId,
      entity.roleId,
      scope,
      options,
    );

    if (existing) {
      return { assignment: existing, created: false };
    }

    const assignment = await this.save(entity, options);
    return { assignment, created: true };
  }
}
