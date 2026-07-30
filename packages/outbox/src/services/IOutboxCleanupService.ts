import type { OutboxDbClient } from "../db";

export type OutboxCleanupServiceOptions = {
  retentionMs?: number;
  batchSize?: number;
};

export type OutboxCleanupRunOptions = {
  olderThan?: Date;
  limit?: number;
  tx?: OutboxDbClient;
  signal?: AbortSignal;
};

export interface IOutboxCleanupService {
  cleanup(options?: OutboxCleanupRunOptions): Promise<number>;
}
