CREATE TABLE "attachment_uploads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tenant_id" uuid NOT NULL,
	"status" text NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"expected_size" integer NOT NULL,
	"storage_provider" text NOT NULL,
	"storage_object_key" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "attachment_versions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attachment_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"sha256" varchar(64) NOT NULL,
	"storage_provider" text NOT NULL,
	"storage_object_key" text NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_owner_id_identities_id_fk";
--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "tenant_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "current_version_id" uuid;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "security_status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "created_by" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "attachment_uploads" ADD CONSTRAINT "attachment_uploads_created_by_identities_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachment_versions" ADD CONSTRAINT "attachment_versions_attachment_id_attachments_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."attachments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachment_versions" ADD CONSTRAINT "attachment_versions_created_by_identities_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_created_by_identities_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "filename";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "original_filename";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "content_type";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "thumbnail_link";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "image_link";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "bucket";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "owner_id";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "issue_id";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "attachments" DROP COLUMN "version";