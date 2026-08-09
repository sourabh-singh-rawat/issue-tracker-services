import type { OutboxMessage, OutboxDbClient } from "../db";
import type { OutboxStatus } from "../constants";

export type OutboxRepositoryOptions = {
  tx?: OutboxDbClient;
};

export type CreateOutboxMessageEntity = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  aggregateType: string;
  aggregateId: string;
  payload: Record<string, unknown>;
  nextAttemptAt?: Date;
};

export type MarkFailedParams = {
  id: string;
  error: string;
  nextAttemptAt: Date;
};

export interface IOutboxRepository {
  save(
    entity: CreateOutboxMessageEntity,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage>;
  findById(id: string, options?: OutboxRepositoryOptions): Promise<OutboxMessage | null>;
  findByEventId(eventId: string, options?: OutboxRepositoryOptions): Promise<OutboxMessage | null>;
  claimDue(limit: number, options?: OutboxRepositoryOptions): Promise<OutboxMessage[]>;
  markPublished(
    id: string,
    publishedAt?: Date,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null>;
  markFailed(
    params: MarkFailedParams,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null>;
  updateStatus(
    id: string,
    status: OutboxStatus,
    options?: OutboxRepositoryOptions,
  ): Promise<OutboxMessage | null>;
  deletePublishedBefore(
    before: Date,
    limit: number,
    options?: OutboxRepositoryOptions,
  ): Promise<number>;
}
