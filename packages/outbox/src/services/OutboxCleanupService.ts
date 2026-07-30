import type { IOutboxRepository } from "../repositories";
import type {
  IOutboxCleanupService,
  OutboxCleanupRunOptions,
  OutboxCleanupServiceOptions,
} from "./IOutboxCleanupService";

const DEFAULT_RETENTION_MS = 7 * 24 * 60 * 60 * 1_000;
const DEFAULT_BATCH_SIZE = 1_000;

export class OutboxCleanupService implements IOutboxCleanupService {
  private readonly retentionMs: number;
  private readonly batchSize: number;

  constructor(
    private readonly outboxRepository: IOutboxRepository,
    options?: OutboxCleanupServiceOptions,
  ) {
    this.retentionMs = options?.retentionMs ?? DEFAULT_RETENTION_MS;
    this.batchSize = options?.batchSize ?? DEFAULT_BATCH_SIZE;
  }

  cleanup = async (options?: OutboxCleanupRunOptions): Promise<number> => {
    options?.signal?.throwIfAborted();

    const olderThan = options?.olderThan ?? new Date(Date.now() - this.retentionMs);
    const limit = options?.limit ?? this.batchSize;

    return this.outboxRepository.deletePublishedBefore(olderThan, limit, {
      tx: options?.tx,
    });
  };
}
