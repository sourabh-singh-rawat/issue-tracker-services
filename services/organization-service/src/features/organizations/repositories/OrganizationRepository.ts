import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Organization, Organizations } from "@/db";
import type {
  CreateOrganizationEntity,
  IOrganizationRepository,
  OrganizationRepositoryOptions,
} from "@/features/organizations/repositories/IOrganizationRepository";

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: OrganizationRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreateOrganizationEntity,
    options?: OrganizationRepositoryOptions,
  ): Promise<Organization> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Organizations)
      .values({
        id: uuidv7(),
        name: entity.name,
        slug: entity.slug,
        description: entity.description ?? null,
        isActive: entity.isActive ?? true,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Organizations.id })
      .from(Organizations)
      .where(and(eq(Organizations.slug, slug), isNull(Organizations.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Organizations.id })
      .from(Organizations)
      .where(and(eq(Organizations.name, name), isNull(Organizations.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async findAll(): Promise<Organization[]> {
    return this.db
      .select()
      .from(Organizations)
      .where(isNull(Organizations.deletedAt))
      .orderBy(desc(Organizations.createdAt));
  }

  async softDelete(id: string, options?: OrganizationRepositoryOptions): Promise<boolean> {
    const client = this.client(options);
    const now = new Date();

    const deleted = await client
      .update(Organizations)
      .set({
        deletedAt: now,
        updatedAt: now,
        version: sql`${Organizations.version} + 1`,
      })
      .where(and(eq(Organizations.id, id), isNull(Organizations.deletedAt)))
      .returning({ id: Organizations.id });

    return deleted.length > 0;
  }
}
