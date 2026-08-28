ALTER TABLE "attachment_uploads" ALTER COLUMN "tenant_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "tenant_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "attachment_uploads" ADD COLUMN "scope_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "attachment_uploads" ADD COLUMN "scope_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "scope_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "scope_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "attachment_uploads" ADD CONSTRAINT "attachment_uploads_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;