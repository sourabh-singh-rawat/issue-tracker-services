import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type RoleResource,
  Resources,
  RoleResources,
  Roles,
} from "@/db";
import type {
  CreateRoleResourceEntity,
  IRoleResourceRepository,
  RoleResourceRepositoryOptions,
} from "@/features/roles/repositories/IRoleResourceRepository";

@injectable()
export class RoleResourceRepository implements IRoleResourceRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: RoleResourceRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async saveMany(
    entities: CreateRoleResourceEntity[],
    options?: RoleResourceRepositoryOptions,
  ): Promise<RoleResource[]> {
    if (entities.length === 0) {
      return [];
    }

    const client = this.client(options);

    return client
      .insert(RoleResources)
      .values(
        entities.map((entity) => ({
          roleId: entity.roleId,
          resourceId: entity.resourceId,
          relation: entity.relation,
        })),
      )
      .onConflictDoNothing()
      .returning();
  }

  async findByRoleId(roleId: string): Promise<RoleResource[]> {
    return this.db
      .select()
      .from(RoleResources)
      .where(eq(RoleResources.roleId, roleId))
      .orderBy(asc(RoleResources.resourceId), asc(RoleResources.relation));
  }

  async findResourceKeysByRoleId(roleId: string): Promise<string[]> {
    const rows = await this.db
      .select({ key: Resources.key })
      .from(RoleResources)
      .innerJoin(Resources, eq(RoleResources.resourceId, Resources.id))
      .where(eq(RoleResources.roleId, roleId))
      .orderBy(asc(Resources.key));

    return rows.map((row) => row.key);
  }

  async existsByRoleKeysAndResourceKeys(
    roleKeys: string[],
    resourceKeys: string[],
    relation = "has",
  ): Promise<boolean> {
    if (roleKeys.length === 0 || resourceKeys.length === 0) {
      return false;
    }

    const [row] = await this.db
      .select({ roleId: RoleResources.roleId })
      .from(RoleResources)
      .innerJoin(Roles, eq(RoleResources.roleId, Roles.id))
      .innerJoin(Resources, eq(RoleResources.resourceId, Resources.id))
      .where(
        and(
          inArray(Roles.key, roleKeys),
          inArray(Resources.key, resourceKeys),
          eq(RoleResources.relation, relation),
        ),
      )
      .limit(1);

    return row !== undefined;
  }

  async syncForRole(
    roleId: string,
    mappings: Array<{ resourceId: string; relation: string }>,
    options?: RoleResourceRepositoryOptions,
  ): Promise<void> {
    const client = this.client(options);

    if (mappings.length === 0) {
      await client.delete(RoleResources).where(eq(RoleResources.roleId, roleId));
      return;
    }

    for (const mapping of mappings) {
      await client
        .insert(RoleResources)
        .values({
          roleId,
          resourceId: mapping.resourceId,
          relation: mapping.relation,
        })
        .onConflictDoNothing();
    }

    const keepPairs = mappings.map((m) => sql`(${m.resourceId}::uuid, ${m.relation})`);

    await client
      .delete(RoleResources)
      .where(
        and(
          eq(RoleResources.roleId, roleId),
          sql`(${RoleResources.resourceId}, ${RoleResources.relation}) not in (${sql.join(keepPairs, sql`, `)})`,
        ),
      );
  }
}
