import type { IRetryPolicy } from "./IRetryPolicy";

const DEFAULT_BASE_MS = 1_000;
const DEFAULT_MAX_MS = 5 * 60 * 1_000;

export class ExponentialBackoffPolicy implements IRetryPolicy {
  constructor(
    private readonly baseMs: number = DEFAULT_BASE_MS,
    private readonly maxMs: number = DEFAULT_MAX_MS,
  ) {}

  nextAttempt = (attemptNumber: number): number => {
    const exponent = Math.max(0, attemptNumber - 1);
    const delay = this.baseMs * 2 ** exponent;
    return Math.min(delay, this.maxMs);
  };
}
