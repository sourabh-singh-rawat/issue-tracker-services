import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export type OutboxDatabase = NodePgDatabase<any>;
export type OutboxTransaction = Parameters<Parameters<OutboxDatabase["transaction"]>[0]>[0];
export type OutboxDbClient = OutboxDatabase | OutboxTransaction;
