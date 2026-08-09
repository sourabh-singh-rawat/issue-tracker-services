export type OutboxWorkerOptions = {
  batchSize?: number;
  pollIntervalMs?: number;
  errorDelayMs?: number;
};

export interface IOutboxWorker {
  tick: () => Promise<number>;
  start: () => boolean;
  stop: () => boolean;
  isRunning: () => boolean;
}
