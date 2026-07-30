export const OutboxStatus = {
  Pending: "Pending",
  Processing: "Processing",
  Published: "Published",
  Failed: "Failed",
} as const;

export type OutboxStatus = (typeof OutboxStatus)[keyof typeof OutboxStatus];

export const OUTBOX_STATUSES = Object.values(OutboxStatus);
