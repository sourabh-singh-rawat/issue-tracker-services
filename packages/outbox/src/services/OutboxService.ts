import type { OutboxMessage } from "../db";
import { OutboxMessageNotFoundError } from "../errors";
import type { IRetryPolicy } from "../policies";
import type { IOutboxRepository } from "../repositories";
import type {
  EnqueueOutboxInput,
  IOutboxService,
  MarkOutboxFailedInput,
  OutboxServiceOptions,
} from "./IOutboxService";

const DEFAULT_CLAIM_LIMIT = 50;

export class OutboxService implements IOutboxService {
  constructor(
    private readonly outboxRepository: IOutboxRepository,
    private readonly retryPolicy: IRetryPolicy,
  ) {}

  schedule = async (
    input: EnqueueOutboxInput,
    options?: OutboxServiceOptions,
  ): Promise<OutboxMessage> => {
    return this.outboxRepository.save(
      {
        eventId: input.eventId,
        eventType: input.eventType,
        eventVersion: input.eventVersion,
        aggregateType: input.aggregateType,
        aggregateId: input.aggregateId,
        payload: input.payload,
        nextAttemptAt: input.nextAttemptAt,
      },
      { tx: options?.tx },
    );
  };

  claimBatch = async (
    limit: number = DEFAULT_CLAIM_LIMIT,
    options?: OutboxServiceOptions,
  ): Promise<OutboxMessage[]> => {
    return this.outboxRepository.claimDue(limit, { tx: options?.tx });
  };

  complete = async (id: string, options?: OutboxServiceOptions): Promise<OutboxMessage> => {
    const updated = await this.outboxRepository.markPublished(id, new Date(), { tx: options?.tx });
    if (!updated) throw new OutboxMessageNotFoundError(`Outbox message not found: ${id}`);

    return updated;
  };

  failed = async (
    input: MarkOutboxFailedInput,
    options?: OutboxServiceOptions,
  ): Promise<OutboxMessage> => {
    const existing = await this.outboxRepository.findById(input.id, { tx: options?.tx });
    if (!existing) throw new OutboxMessageNotFoundError(`Outbox message not found: ${input.id}`);

    const nextAttemptAt =
      input.nextAttemptAt ??
      new Date(
        Date.now() +
          (input.nextAttemptDelayMs ?? this.retryPolicy.nextAttempt(existing.retryCount + 1)),
      );

    const updated = await this.outboxRepository.markFailed(
      {
        id: input.id,
        error: input.error,
        nextAttemptAt,
      },
      { tx: options?.tx },
    );

    if (!updated) throw new OutboxMessageNotFoundError(`Outbox message not found: ${input.id}`);

    return updated;
  };

  get = async (id: string, options?: OutboxServiceOptions): Promise<OutboxMessage | null> => {
    return this.outboxRepository.findById(id, { tx: options?.tx });
  };

  getByEventId = async (
    eventId: string,
    options?: OutboxServiceOptions,
  ): Promise<OutboxMessage | null> => {
    return this.outboxRepository.findByEventId(eventId, { tx: options?.tx });
  };
}
