import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Profile, Profiles } from "@/db";
import {
  IProfileRepository,
  ProfileRepositoryOptions,
} from "@/features/profiles/repositories/IProfileRepository";

@injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: Partial<Profile> & {
      identityId: string;
      firstName: string;
    },
    options?: ProfileRepositoryOptions,
  ): Promise<Profile> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Profiles)
      .values({
        id: uuidv7(),
        identityId: entity.identityId,
        firstName: entity.firstName,
        middleName: entity.middleName ?? null,
        lastName: entity.lastName ?? null,
        gender: entity.gender ?? null,
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
    entity: Partial<
      Pick<
        Profile,
        | "firstName"
        | "middleName"
        | "lastName"
        | "gender"
        | "description"
        | "photoUrl"
        | "deletedAt"
      >
    >,
    options?: ProfileRepositoryOptions,
  ): Promise<Profile> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(Profiles)
      .set({
        ...(entity.firstName !== undefined ? { firstName: entity.firstName } : {}),
        ...(entity.middleName !== undefined ? { middleName: entity.middleName } : {}),
        ...(entity.lastName !== undefined ? { lastName: entity.lastName } : {}),
        ...(entity.gender !== undefined ? { gender: entity.gender } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        ...(entity.photoUrl !== undefined ? { photoUrl: entity.photoUrl } : {}),
        ...(entity.deletedAt !== undefined ? { deletedAt: entity.deletedAt } : {}),
        updatedAt: now,
        version: sql`${Profiles.version} + 1`,
      })
      .where(and(eq(Profiles.id, id), isNull(Profiles.deletedAt)))
      .returning();

    if (!updated) {
      throw new Error(`Profile not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string) {
    const row = await this.db
      .select({ id: Profiles.id })
      .from(Profiles)
      .where(and(eq(Profiles.id, id), isNull(Profiles.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async softDelete(id: string, options?: ProfileRepositoryOptions) {
    await this.update(id, { deletedAt: new Date() }, options);
  }

  async findById(id: string) {
    const [row] = await this.db
      .select()
      .from(Profiles)
      .where(and(eq(Profiles.id, id), isNull(Profiles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByIdentityId(identityId: string, options?: ProfileRepositoryOptions) {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(Profiles)
      .where(and(eq(Profiles.identityId, identityId), isNull(Profiles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  private client(options?: ProfileRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
