import { ALL_TENANT_ROLES } from "@pine/authorization";
import { uuidv7 } from "@pine/common";
import { and, asc, eq, isNull } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type TenantRole, TenantRoles, Roles } from "@/db";
import type {
  CreateTenantRoleEntity,
  ITenantRoleRepository,
  TenantRoleRepositoryOptions,
} from "@/features/tenantRoles/repositories/ITenantRoleRepository";

@injectable()
export class TenantRoleRepository implements ITenantRoleRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreateTenantRoleEntity,
    options?: TenantRoleRepositoryOptions,
  ): Promise<TenantRole> {
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
        isSystem: entity.isSystem ?? false,
        createdAt: now,
        version: 1,
      })
      .returning();

    await client.insert(TenantRoles).values({
      id: uuidv7(),
      roleId: created.id,
      tenantId: entity.tenantId,
    });

    return {
      ...created,
      tenantId: entity.tenantId,
    };
  }

  async findById(
    id: string,
    options?: TenantRoleRepositoryOptions,
  ): Promise<TenantRole | null> {
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
        tenantId: TenantRoles.tenantId,
      })
      .from(Roles)
      .innerJoin(TenantRoles, eq(TenantRoles.roleId, Roles.id))
      .where(and(eq(Roles.id, id), isNull(Roles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByTenantId(
    tenantId: string,
    options?: TenantRoleRepositoryOptions,
  ): Promise<TenantRole[]> {
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
        tenantId: TenantRoles.tenantId,
      })
      .from(Roles)
      .innerJoin(TenantRoles, eq(TenantRoles.roleId, Roles.id))
      .where(and(eq(TenantRoles.tenantId, tenantId), isNull(Roles.deletedAt)))
      .orderBy(asc(Roles.name));
  }

  async findByTenantIdAndKey(
    tenantId: string,
    key: string,
    options?: TenantRoleRepositoryOptions,
  ): Promise<TenantRole | null> {
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
        tenantId: TenantRoles.tenantId,
      })
      .from(Roles)
      .innerJoin(TenantRoles, eq(TenantRoles.roleId, Roles.id))
      .where(
        and(
          eq(TenantRoles.tenantId, tenantId),
          eq(Roles.key, key),
          isNull(Roles.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async existsByKeyInTenant(
    tenantId: string,
    key: string,
    options?: TenantRoleRepositoryOptions,
  ): Promise<boolean> {
    const existing = await this.findByTenantIdAndKey(tenantId, key, options);
    return existing !== null;
  }

  async seedSystemRoles(
    tenantId: string,
    options?: TenantRoleRepositoryOptions,
  ): Promise<TenantRole[]> {
    const seeded: TenantRole[] = [];

    for (const definition of ALL_TENANT_ROLES) {
      const existing = await this.findByTenantIdAndKey(tenantId, definition.key, options);
      if (existing) {
        seeded.push(existing);
        continue;
      }

      const role = await this.save(
        {
          tenantId,
          key: definition.key,
          name: definition.name,
          description: definition.description,
          isSystem: true,
        },
        options,
      );
      seeded.push(role);
    }

    return seeded;
  }

  private client(options?: TenantRoleRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
