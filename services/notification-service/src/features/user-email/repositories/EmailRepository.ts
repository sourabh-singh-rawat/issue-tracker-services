import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type Email, Emails } from "@/db";
import type {
  CreateEmailEntity,
  EmailRepositoryOptions,
  IEmailRepository,
  UpdateEmailEntity,
} from "@/features/user-email/repositories/IEmailRepository";

@injectable()
export class EmailRepository implements IEmailRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: EmailRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: CreateEmailEntity, options?: EmailRepositoryOptions): Promise<Email> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Emails)
      .values({
        id: entity.id ?? uuidv7(),
        type: entity.type,
        email: entity.email,
        status: entity.status ?? "Pending",
        message: entity.html,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    entity: UpdateEmailEntity,
    options?: EmailRepositoryOptions,
  ): Promise<void> {
    const client = this.client(options);
    const now = new Date();

    await client
      .update(Emails)
      .set({
        ...(entity.status !== undefined ? { status: entity.status } : {}),
        ...(entity.html !== undefined ? { message: entity.html } : {}),
        updatedAt: now,
        version: sql`${Emails.version} + 1`,
      })
      .where(and(eq(Emails.id, id), isNull(Emails.deletedAt)));
  }
}
