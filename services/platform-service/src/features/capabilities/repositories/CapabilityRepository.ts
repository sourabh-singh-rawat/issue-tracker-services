import { uuidv7 } from "@pine/common";
import { desc, eq, inArray } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { Capabilities, type Capability, type Database } from "@/db";
import type {
  CreateCapabilityEntity,
  ICapabilityRepository,
  CapabilityRepositoryOptions,
  UpdateCapabilityEntity,
} from "@/features/capabilities/repositories/ICapabilityRepository";

@injectable()
export class CapabilityRepository implements ICapabilityRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreateCapabilityEntity,
    options?: CapabilityRepositoryOptions,
  ): Promise<Capability> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Capabilities)
      .values({
        id: uuidv7(),
        key: entity.key,
        service: entity.service,
        resource: entity.resource,
        action: entity.action,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    key: string,
    entity: UpdateCapabilityEntity,
    options?: CapabilityRepositoryOptions,
  ): Promise<Capability> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Capabilities)
      .set({
        ...(entity.key !== undefined ? { key: entity.key } : {}),
        ...(entity.service !== undefined ? { service: entity.service } : {}),
        ...(entity.resource !== undefined ? { resource: entity.resource } : {}),
        ...(entity.action !== undefined ? { action: entity.action } : {}),
        updatedAt: now,
      })
      .where(eq(Capabilities.key, key))
      .returning();

    if (!updated) {
      throw new Error(`Capability not found for update: ${key}`);
    }

    return updated;
  }

  async delete(key: string, options?: CapabilityRepositoryOptions): Promise<boolean> {
    const client = this.client(options);

    const deleted = await client
      .delete(Capabilities)
      .where(eq(Capabilities.key, key))
      .returning({ id: Capabilities.id });

    return deleted.length > 0;
  }

  async existsByKey(key: string): Promise<boolean> {
    const row = await this.db
      .select({ id: Capabilities.id })
      .from(Capabilities)
      .where(eq(Capabilities.key, key))
      .limit(1);

    return row.length > 0;
  }

  async findByKey(key: string): Promise<Capability | null> {
    const [row] = await this.db
      .select()
      .from(Capabilities)
      .where(eq(Capabilities.key, key))
      .limit(1);

    return row ?? null;
  }

  async findByKeys(keys: string[]): Promise<Capability[]> {
    if (keys.length === 0) {
      return [];
    }

    return this.db.select().from(Capabilities).where(inArray(Capabilities.key, keys));
  }

  async findAll(): Promise<Capability[]> {
    return this.db.select().from(Capabilities).orderBy(desc(Capabilities.createdAt));
  }

  private client(options?: CapabilityRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
