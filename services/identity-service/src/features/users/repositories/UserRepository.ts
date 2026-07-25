import { uuidv7 } from "@pine/common";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type User, Users } from "@/db";
import {
  IUserRepository,
  UserRepositoryOptions,
} from "@/features/users/repositories/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: UserRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<User> & { email: string },
    options?: UserRepositoryOptions,
  ): Promise<User> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Users)
      .values({
        id: uuidv7(),
        email: entity.email,
        idpId: entity.idpId ?? null,
        idpProvider: entity.idpProvider ?? null,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: Partial<Pick<User, "email" | "idpId" | "idpProvider" | "deletedAt">>,
    options?: UserRepositoryOptions,
  ): Promise<User> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Users)
      .set({
        ...(entity.email !== undefined ? { email: entity.email } : {}),
        ...(entity.idpId !== undefined ? { idpId: entity.idpId } : {}),
        ...(entity.idpProvider !== undefined ? { idpProvider: entity.idpProvider } : {}),
        ...(entity.deletedAt !== undefined ? { deletedAt: entity.deletedAt } : {}),
        updatedAt: now,
        version: sql`${Users.version} + 1`,
      })
      .where(and(eq(Users.id, id), isNull(Users.deletedAt)))
      .returning();

    if (!updated) {
      throw new Error(`User not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string) {
    const row = await this.db
      .select({ id: Users.id })
      .from(Users)
      .where(and(eq(Users.id, id), isNull(Users.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async existsByEmail(email: string) {
    const row = await this.db
      .select({ id: Users.id })
      .from(Users)
      .where(and(eq(Users.email, email), isNull(Users.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async softDelete(id: string, options?: UserRepositoryOptions) {
    await this.update(id, { deletedAt: new Date() }, options);
  }

  async findById(id: string) {
    const [row] = await this.db
      .select()
      .from(Users)
      .where(and(eq(Users.id, id), isNull(Users.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByEmail(email: string) {
    const [row] = await this.db
      .select()
      .from(Users)
      .where(and(eq(Users.email, email), isNull(Users.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findAll() {
    return this.db
      .select()
      .from(Users)
      .where(isNull(Users.deletedAt))
      .orderBy(desc(Users.createdAt));
  }
}
