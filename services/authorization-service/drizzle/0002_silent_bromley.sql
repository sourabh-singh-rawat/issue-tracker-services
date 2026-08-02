CREATE TABLE "outbox_messages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"event_id" uuid NOT NULL,
	"event_type" varchar(255) NOT NULL,
	"event_version" integer NOT NULL,
	"aggregate_type" varchar(100) NOT NULL,
	"aggregate_id" uuid NOT NULL,
	"payload" jsonb NOT NULL,
	"status" varchar(32) DEFAULT 'Pending' NOT NULL,
	"retry_count" integer DEFAULT 0 NOT NULL,
	"next_attempt_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_attempt_at" timestamp with time zone,
	"last_error" text,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "outbox_event_id_uidx" ON "outbox_messages" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "outbox_status_next_attempt_idx" ON "outbox_messages" USING btree ("status","next_attempt_at");--> statement-breakpoint
CREATE INDEX "outbox_aggregate_idx" ON "outbox_messages" USING btree ("aggregate_type","aggregate_id");