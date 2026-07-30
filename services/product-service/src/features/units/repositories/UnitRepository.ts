import { uuidv7 } from "@pine/common";
import { and, desc, eq, ne } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Unit, Units } from "@/db";
import type {
  CreateUnitEntity,
  IUnitRepository,
  UnitRepositoryOptions,
  UpdateUnitEntity,
} from "@/features/units/repositories/IUnitRepository";

@injectable()
export class UnitRepository implements IUnitRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: UnitRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateUnitEntity, options?: UnitRepositoryOptions): Promise<Unit> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Units)
      .values({
        id: uuidv7(),
        code: entity.code,
        name: entity.name,
        symbol: entity.symbol ?? null,
        isActive: entity.isActive ?? true,
        createdAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdateUnitEntity,
    options?: UnitRepositoryOptions,
  ): Promise<Unit> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Units)
      .set({
        ...(entity.code !== undefined ? { code: entity.code } : {}),
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        ...(entity.symbol !== undefined ? { symbol: entity.symbol } : {}),
        ...(entity.isActive !== undefined ? { isActive: entity.isActive } : {}),
        updatedAt: now,
      })
      .where(eq(Units.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Unit not found for update: ${id}`);
    }

    return updated;
  }

  async delete(id: string, options?: UnitRepositoryOptions): Promise<boolean> {
    const client = this.client(options);
    const deleted = await client.delete(Units).where(eq(Units.id, id)).returning({
      id: Units.id,
    });

    return deleted.length > 0;
  }

  async existsById(id: string): Promise<boolean> {
    const row = await this.db.select({ id: Units.id }).from(Units).where(eq(Units.id, id)).limit(1);

    return row.length > 0;
  }

  async existsByCode(code: string, excludeId?: string): Promise<boolean> {
    const condition =
      excludeId === undefined
        ? eq(Units.code, code)
        : and(eq(Units.code, code), ne(Units.id, excludeId));

    const row = await this.db.select({ id: Units.id }).from(Units).where(condition).limit(1);

    return row.length > 0;
  }

  async findById(id: string): Promise<Unit | null> {
    const [row] = await this.db.select().from(Units).where(eq(Units.id, id)).limit(1);

    return row ?? null;
  }

  async findByCode(code: string): Promise<Unit | null> {
    const [row] = await this.db.select().from(Units).where(eq(Units.code, code)).limit(1);

    return row ?? null;
  }

  async findAll(): Promise<Unit[]> {
    return this.db.select().from(Units).orderBy(desc(Units.createdAt));
  }
}
