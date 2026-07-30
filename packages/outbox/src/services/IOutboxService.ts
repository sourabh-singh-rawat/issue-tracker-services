import type { OutboxMessage, OutboxDbClient } from "../db";

export type OutboxServiceOptions = {
  tx?: OutboxDbClient;
};

export type EnqueueOutboxInput = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  aggregateType: string;
  aggregateId: string;
  payload: Record<string, unknown>;
  nextAttemptAt?: Date;
};

export type MarkOutboxFailedInput = {
  id: string;
  error: string;
  nextAttemptDelayMs?: number;
  nextAttemptAt?: Date;
};

export interface IOutboxService {
  schedule(input: EnqueueOutboxInput, options?: OutboxServiceOptions): Promise<OutboxMessage>;
  claimBatch(limit?: number, options?: OutboxServiceOptions): Promise<OutboxMessage[]>;
  complete(id: string, options?: OutboxServiceOptions): Promise<OutboxMessage>;
  failed(input: MarkOutboxFailedInput, options?: OutboxServiceOptions): Promise<OutboxMessage>;
  get(id: string, options?: OutboxServiceOptions): Promise<OutboxMessage | null>;
  getByEventId(eventId: string, options?: OutboxServiceOptions): Promise<OutboxMessage | null>;
}
