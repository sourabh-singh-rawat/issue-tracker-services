import { and, asc, eq, notInArray } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { Capabilities, type Database, type RoleCapability, RoleCapabilities } from "@/db";
import type {
  CreateRoleCapabilityEntity,
  IRoleCapabilityRepository,
  RoleCapabilityRepositoryOptions,
} from "@/features/roles/repositories/IRoleCapabilityRepository";

@injectable()
export class RoleCapabilityRepository implements IRoleCapabilityRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: RoleCapabilityRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async saveMany(
    entities: CreateRoleCapabilityEntity[],
    options?: RoleCapabilityRepositoryOptions,
  ): Promise<RoleCapability[]> {
    if (entities.length === 0) {
      return [];
    }

    const client = this.client(options);

    return client
      .insert(RoleCapabilities)
      .values(
        entities.map((entity) => ({
          roleId: entity.roleId,
          capabilityId: entity.capabilityId,
        })),
      )
      .onConflictDoNothing()
      .returning();
  }

  async findByRoleId(roleId: string): Promise<RoleCapability[]> {
    return this.db
      .select()
      .from(RoleCapabilities)
      .where(eq(RoleCapabilities.roleId, roleId))
      .orderBy(asc(RoleCapabilities.capabilityId));
  }

  async findCapabilityKeysByRoleId(roleId: string): Promise<string[]> {
    const rows = await this.db
      .select({ key: Capabilities.key })
      .from(RoleCapabilities)
      .innerJoin(Capabilities, eq(RoleCapabilities.capabilityId, Capabilities.id))
      .where(eq(RoleCapabilities.roleId, roleId))
      .orderBy(asc(Capabilities.key));

    return rows.map((row) => row.key);
  }

  async syncForRole(
    roleId: string,
    capabilityIds: string[],
    options?: RoleCapabilityRepositoryOptions,
  ): Promise<void> {
    const client = this.client(options);

    if (capabilityIds.length === 0) {
      await client.delete(RoleCapabilities).where(eq(RoleCapabilities.roleId, roleId));
      return;
    }

    for (const capabilityId of capabilityIds) {
      await client
        .insert(RoleCapabilities)
        .values({
          roleId,
          capabilityId,
        })
        .onConflictDoNothing();
    }

    await client
      .delete(RoleCapabilities)
      .where(
        and(
          eq(RoleCapabilities.roleId, roleId),
          notInArray(RoleCapabilities.capabilityId, capabilityIds),
        ),
      );
  }
}
