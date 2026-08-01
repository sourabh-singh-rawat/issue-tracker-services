import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type IdentityProfile, IdentityProfiles } from "@/db";
import {
  IIdentityProfileRepository,
  IdentityProfileRepositoryOptions,
} from "@/features/identities/repositories/IIdentityProfileRepository";

@injectable()
export class IdentityProfileRepository implements IIdentityProfileRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: IdentityProfileRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: Partial<IdentityProfile> & {
      identityId: string;
      firstName: string;
      displayName: string;
    },
    options?: IdentityProfileRepositoryOptions,
  ): Promise<IdentityProfile> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(IdentityProfiles)
      .values({
        id: uuidv7(),
        identityId: entity.identityId,
        firstName: entity.firstName,
        middleName: entity.middleName ?? null,
        lastName: entity.lastName ?? null,
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
    entity: Partial<
      Pick<
        IdentityProfile,
        | "firstName"
        | "middleName"
        | "lastName"
        | "displayName"
        | "description"
        | "photoUrl"
        | "deletedAt"
      >
    >,
    options?: IdentityProfileRepositoryOptions,
  ): Promise<IdentityProfile> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(IdentityProfiles)
      .set({
        ...(entity.firstName !== undefined ? { firstName: entity.firstName } : {}),
        ...(entity.middleName !== undefined ? { middleName: entity.middleName } : {}),
        ...(entity.lastName !== undefined ? { lastName: entity.lastName } : {}),
        ...(entity.displayName !== undefined ? { displayName: entity.displayName } : {}),
        ...(entity.description !== undefined ? { description: entity.description } : {}),
        ...(entity.photoUrl !== undefined ? { photoUrl: entity.photoUrl } : {}),
        ...(entity.deletedAt !== undefined ? { deletedAt: entity.deletedAt } : {}),
        updatedAt: now,
        version: sql`${IdentityProfiles.version} + 1`,
      })
      .where(and(eq(IdentityProfiles.id, id), isNull(IdentityProfiles.deletedAt)))
      .returning();

    if (!updated) {
      throw new Error(`IdentityProfile not found for update: ${id}`);
    }

    return updated;
  }

  async existsById(id: string) {
    const row = await this.db
      .select({ id: IdentityProfiles.id })
      .from(IdentityProfiles)
      .where(and(eq(IdentityProfiles.id, id), isNull(IdentityProfiles.deletedAt)))
      .limit(1);

    return row.length > 0;
  }

  async softDelete(id: string, options?: IdentityProfileRepositoryOptions) {
    await this.update(id, { deletedAt: new Date() }, options);
  }

  async findById(id: string) {
    const [row] = await this.db
      .select()
      .from(IdentityProfiles)
      .where(and(eq(IdentityProfiles.id, id), isNull(IdentityProfiles.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByIdentityId(identityId: string, options?: IdentityProfileRepositoryOptions) {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(IdentityProfiles)
      .where(and(eq(IdentityProfiles.identityId, identityId), isNull(IdentityProfiles.deletedAt)))
      .limit(1);

    return row ?? null;
  }
}
