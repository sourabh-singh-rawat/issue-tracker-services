import { uuidv7 } from "@pine/common";
import { and, asc, eq, inArray, isNotNull, lte, or, sql } from "drizzle-orm";
import type { OutboxDatabase, OutboxDbClient, OutboxMessage } from "../db";
import { OutboxMessages } from "../db";
import { OutboxStatus } from "../constants";
import type {
  CreateOutboxMessageEntity,
  IOutboxRepository,
  MarkFailedParams,
  OutboxRepositoryOptions,
} from "./IOutboxRepository";

export class OutboxRepository implements IOutboxRepository {
  constructor(private readonly db: OutboxDatabase) {}

  private readonly client = (options?: OutboxRepositoryOptions): OutboxDbClient => {
    return options?.tx ?? this.db;
  };

  save = async (
    entity: CreateOutboxMessageEntity,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage> => {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(OutboxMessages)
      .values({
        id: uuidv7(),
        eventId: entity.eventId,
        eventType: entity.eventType,
        eventVersion: entity.eventVersion,
        aggregateType: entity.aggregateType,
        aggregateId: entity.aggregateId,
        payload: entity.payload,
        status: OutboxStatus.Pending,
        retryCount: 0,
        nextAttemptAt: entity.nextAttemptAt ?? now,
        lastAttemptAt: null,
        lastError: null,
        publishedAt: null,
      })
      .returning();

    return created;
  };

  findById = async (
    id: string,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null> => {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(OutboxMessages)
      .where(eq(OutboxMessages.id, id))
      .limit(1);
    return row ?? null;
  };

  findByEventId = async (
    eventId: string,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null> => {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(OutboxMessages)
      .where(eq(OutboxMessages.eventId, eventId))
      .limit(1);
    return row ?? null;
  };

  claimDue = async (limit: number, options?: OutboxRepositoryOptions): Promise<OutboxMessage[]> => {
    if (limit <= 0) return [];

    const run = async (client: OutboxDbClient): Promise<OutboxMessage[]> => {
      const now = new Date();

      const due = await client
        .select()
        .from(OutboxMessages)
        .where(
          and(
            or(
              eq(OutboxMessages.status, OutboxStatus.Pending),
              eq(OutboxMessages.status, OutboxStatus.Failed),
            ),
            lte(OutboxMessages.nextAttemptAt, now),
          ),
        )
        .orderBy(asc(OutboxMessages.nextAttemptAt))
        .limit(limit)
        .for("update", { skipLocked: true });

      if (due.length === 0) {
        return [];
      }

      const ids = due.map((row) => row.id);

      return client
        .update(OutboxMessages)
        .set({
          status: OutboxStatus.Processing,
          lastAttemptAt: now,
        })
        .where(inArray(OutboxMessages.id, ids))
        .returning();
    };

    if (options?.tx) {
      return run(options.tx);
    }

    return this.db.transaction((tx) => run(tx));
  };

  markPublished = async (
    id: string,
    publishedAt: Date = new Date(),
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null> => {
    const client = this.client(options);
    const [row] = await client
      .update(OutboxMessages)
      .set({
        status: OutboxStatus.Published,
        publishedAt,
        lastError: null,
        nextAttemptAt: publishedAt,
      })
      .where(eq(OutboxMessages.id, id))
      .returning();

    return row ?? null;
  };

  markFailed = async (
    params: MarkFailedParams,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null> => {
    const client = this.client(options);
    const now = new Date();

    const [row] = await client
      .update(OutboxMessages)
      .set({
        status: OutboxStatus.Failed,
        lastError: params.error,
        lastAttemptAt: now,
        nextAttemptAt: params.nextAttemptAt,
        retryCount: sql`${OutboxMessages.retryCount} + 1`,
      })
      .where(eq(OutboxMessages.id, params.id))
      .returning();

    return row ?? null;
  };

  updateStatus = async (
    id: string,
    status: OutboxStatus,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null> => {
    const client = this.client(options);
    const [row] = await client
      .update(OutboxMessages)
      .set({ status })
      .where(eq(OutboxMessages.id, id))
      .returning();

    return row ?? null;
  };

  deletePublishedBefore = async (
    before: Date,
    limit: number,
    options?: OutboxRepositoryOptions,
  ): Promise<number> => {
    if (limit <= 0) return 0;

    const client = this.client(options);
    const due = await client
      .select({ id: OutboxMessages.id })
      .from(OutboxMessages)
      .where(
        and(
          eq(OutboxMessages.status, OutboxStatus.Published),
          isNotNull(OutboxMessages.publishedAt),
          lte(OutboxMessages.publishedAt, before),
        ),
      )
      .orderBy(asc(OutboxMessages.publishedAt))
      .limit(limit);

    if (due.length === 0) return 0;

    const deleted = await client
      .delete(OutboxMessages)
      .where(
        inArray(
          OutboxMessages.id,
          due.map((row) => row.id),
        ),
      )
      .returning({ id: OutboxMessages.id });

    return deleted.length;
  };
}
