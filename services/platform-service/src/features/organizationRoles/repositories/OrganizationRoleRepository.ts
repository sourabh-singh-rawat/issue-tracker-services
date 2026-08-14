import { uuidv7 } from "@pine/common";
import { and, asc, eq, isNull } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type OrganizationRole,
  OrganizationRoles,
  Roles,
} from "@/db";
import type {
  CreateOrganizationRoleEntity,
  IOrganizationRoleRepository,
  OrganizationRoleRepositoryOptions,
} from "@/features/organizationRoles/repositories/IOrganizationRoleRepository";

@injectable()
export class OrganizationRoleRepository implements IOrganizationRoleRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreateOrganizationRoleEntity,
    options?: OrganizationRoleRepositoryOptions,
  ): Promise<OrganizationRole> {
    const client = this.client(options);
    const now = new Date();
    const id = uuidv7();

    const [created] = await client
      .insert(Roles)
      .values({
        id,
        key: entity.key,
        name: entity.name,
        description: entity.description ?? null,
        isSystem: false,
        createdAt: now,
        version: 1,
      })
      .returning();

    await client.insert(OrganizationRoles).values({
      id: uuidv7(),
      roleId: created.id,
      organizationId: entity.organizationId,
    });

    return {
      ...created,
      organizationId: entity.organizationId,
    };
  }

  async findById(
    id: string,
    options?: OrganizationRoleRepositoryOptions,
  ): Promise<OrganizationRole | null> {
    const client = this.client(options);
    const [row] = await client
      .select({
        id: Roles.id,
        key: Roles.key,
        name: Roles.name,
        description: Roles.description,
        isSystem: Roles.isSystem,
        createdAt: Roles.createdAt,
        updatedAt: Roles.updatedAt,
        deletedAt: Roles.deletedAt,
        version: Roles.version,
        organizationId: OrganizationRoles.organizationId,
      })
      .from(Roles)
      .innerJoin(OrganizationRoles, eq(OrganizationRoles.roleId, Roles.id))
      .where(and(eq(Roles.id, id), isNull(Roles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByOrganizationId(
    organizationId: string,
    options?: OrganizationRoleRepositoryOptions,
  ): Promise<OrganizationRole[]> {
    const client = this.client(options);
    return client
      .select({
        id: Roles.id,
        key: Roles.key,
        name: Roles.name,
        description: Roles.description,
        isSystem: Roles.isSystem,
        createdAt: Roles.createdAt,
        updatedAt: Roles.updatedAt,
        deletedAt: Roles.deletedAt,
        version: Roles.version,
        organizationId: OrganizationRoles.organizationId,
      })
      .from(Roles)
      .innerJoin(OrganizationRoles, eq(OrganizationRoles.roleId, Roles.id))
      .where(
        and(eq(OrganizationRoles.organizationId, organizationId), isNull(Roles.deletedAt)),
      )
      .orderBy(asc(Roles.name));
  }

  async findByOrganizationIdAndKey(
    organizationId: string,
    key: string,
    options?: OrganizationRoleRepositoryOptions,
  ): Promise<OrganizationRole | null> {
    const client = this.client(options);
    const [row] = await client
      .select({
        id: Roles.id,
        key: Roles.key,
        name: Roles.name,
        description: Roles.description,
        isSystem: Roles.isSystem,
        createdAt: Roles.createdAt,
        updatedAt: Roles.updatedAt,
        deletedAt: Roles.deletedAt,
        version: Roles.version,
        organizationId: OrganizationRoles.organizationId,
      })
      .from(Roles)
      .innerJoin(OrganizationRoles, eq(OrganizationRoles.roleId, Roles.id))
      .where(
        and(
          eq(OrganizationRoles.organizationId, organizationId),
          eq(Roles.key, key),
          isNull(Roles.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async existsByKeyInOrganization(
    organizationId: string,
    key: string,
    options?: OrganizationRoleRepositoryOptions,
  ): Promise<boolean> {
    const existing = await this.findByOrganizationIdAndKey(organizationId, key, options);
    return existing !== null;
  }

  private client(options?: OrganizationRoleRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
