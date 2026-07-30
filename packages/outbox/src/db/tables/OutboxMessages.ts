import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type * as DrizzlePg from "drizzle-orm/pg-core";
import { OutboxStatus } from "../../constants/OutboxStatus";

const outboxMessages = pgTable(
  "outbox_messages",
  {
    id: uuid("id").primaryKey().notNull(),
    eventId: uuid("event_id").notNull(),
    eventType: varchar("event_type", { length: 255 }).notNull(),
    eventVersion: integer("event_version").notNull(),
    aggregateType: varchar("aggregate_type", { length: 100 }).notNull(),
    aggregateId: uuid("aggregate_id").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
    status: varchar("status", { length: 32 })
      .$type<OutboxStatus>()
      .notNull()
      .default(OutboxStatus.Pending),
    retryCount: integer("retry_count").notNull().default(0),
    nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }).notNull().defaultNow(),
    lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true }),
    lastError: text("last_error"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("outbox_event_id_uidx").on(table.eventId),
    index("outbox_status_next_attempt_idx").on(table.status, table.nextAttemptAt),
    index("outbox_aggregate_idx").on(table.aggregateType, table.aggregateId),
  ],
);

export type OutboxMessagesTable = typeof outboxMessages;

export const OutboxMessages: OutboxMessagesTable = outboxMessages;

export type OutboxMessage = typeof OutboxMessages.$inferSelect;
export type NewOutboxMessage = typeof OutboxMessages.$inferInsert;

type _DrizzlePgRef = DrizzlePg.PgColumn;
