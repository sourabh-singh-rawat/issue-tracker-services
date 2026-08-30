CREATE TABLE "attachment_scans" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attachment_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"scope_type" text,
	"scope_id" uuid,
	"tenant_id" uuid,
	"type" text NOT NULL,
	"status" text NOT NULL,
	"scanner" text,
	"duration_ms" integer,
	"result" jsonb,
	"metadata" jsonb,
	"storage_provider" text,
	"storage_object_key" text,
	"scanned_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
