export type OutboxCleanupWorkerOptions = {
  pollIntervalMs?: number;
  errorDelayMs?: number;
};

export interface IOutboxCleanupWorker {
  tick: (signal?: AbortSignal) => Promise<number>;
  start: () => boolean;
  stop: () => boolean;
  isRunning: () => boolean;
}
