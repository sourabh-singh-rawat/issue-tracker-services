import { and, eq, isNull } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type User, Users } from "@/db";
import type {
  CreateUserEntity,
  IUserRepository,
  UserRepositoryOptions,
} from "@/features/user/repositories/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: UserRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateUserEntity, options?: UserRepositoryOptions): Promise<User> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Users)
      .values({
        id: entity.id,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async findById(id: string, options?: UserRepositoryOptions): Promise<User | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(Users)
      .where(and(eq(Users.id, id), isNull(Users.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async existsById(id: string, options?: UserRepositoryOptions): Promise<boolean> {
    const user = await this.findById(id, options);
    return user != null;
  }
}
