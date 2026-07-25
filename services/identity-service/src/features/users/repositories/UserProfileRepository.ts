import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type UserProfile, UserProfiles } from "@/db";
import {
  IUserProfileRepository,
  UserProfileRepositoryOptions,
} from "@/features/users/repositories/IUserProfileRepository";

@injectable()
export class UserProfileRepository implements IUserProfileRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: UserProfileRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<UserProfile> & { userId: string; displayName: string },
    options?: UserProfileRepositoryOptions,
  ): Promise<UserProfile> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(UserProfiles)
      .values({
        id: uuidv7(),
        userId: entity.userId,
        displayName: entity.displayName,
        description: entity.description ?? null,
        photoUrl: entity.photoUrl ?? null,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: Partial<Pick<UserProfile, "displayName" | "description" | "photoUrl" | "deletedAt">>,
    options?: UserProfileRepositoryOptions,
  ): Promise<UserProfile> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(UserProfiles)
      .set({
        ...(entity.displayName !== undefined ? { displayName: entity.displayName } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        ...(entity.photoUrl !== undefined ? { photoUrl: entity.photoUrl } : {}),
        ...(entity.deletedAt !== undefined ? { deletedAt: entity.deletedAt } : {}),
        updatedAt: now,
        version: sql`${UserProfiles.version} + 1`,
      })
      .where(and(eq(UserProfiles.id, id), isNull(UserProfiles.deletedAt)))
      .returning();

    if (!updated) {
      throw new Error(`UserProfile not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string) {
    const row = await this.db
      .select({ id: UserProfiles.id })
      .from(UserProfiles)
      .where(and(eq(UserProfiles.id, id), isNull(UserProfiles.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async softDelete(id: string, options?: UserProfileRepositoryOptions) {
    await this.update(id, { deletedAt: new Date() }, options);
  }

  async findById(id: string) {
    const [row] = await this.db
      .select()
      .from(UserProfiles)
      .where(and(eq(UserProfiles.id, id), isNull(UserProfiles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByUserId(userId: string, options?: UserProfileRepositoryOptions) {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(UserProfiles)
      .where(and(eq(UserProfiles.userId, userId), isNull(UserProfiles.deletedAt)))
      .limit(1);

    return row ?? null;
  }
}
