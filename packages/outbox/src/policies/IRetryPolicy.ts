export interface IRetryPolicy {
  nextAttempt(attemptNumber: number): number;
}
