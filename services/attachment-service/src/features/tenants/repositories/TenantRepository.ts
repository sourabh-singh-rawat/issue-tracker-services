import { eq } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Tenant, Tenants } from "@/db";
import type {
  CreateTenantEntity,
  ITenantRepository,
  TenantRepositoryOptions,
} from "@/features/tenants/repositories/ITenantRepository";

@injectable()
export class TenantRepository implements ITenantRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(entity: CreateTenantEntity, options?: TenantRepositoryOptions): Promise<Tenant> {
    const client = this.client(options);

    const [created] = await client
      .insert(Tenants)
      .values({
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        isActive: entity.isActive,
      })
      .returning();

    return created;
  }

  async findById(id: string, options?: TenantRepositoryOptions): Promise<Tenant | null> {
    const client = this.client(options);
    const [row] = await client.select().from(Tenants).where(eq(Tenants.id, id)).limit(1);

    return row ?? null;
  }

  async existsById(id: string, options?: TenantRepositoryOptions): Promise<boolean> {
    const tenant = await this.findById(id, options);
    return tenant != null;
  }

  async deactivate(id: string, options?: TenantRepositoryOptions): Promise<void> {
    const client = this.client(options);
    await client.update(Tenants).set({ isActive: false }).where(eq(Tenants.id, id));
  }

  private client(options?: TenantRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
