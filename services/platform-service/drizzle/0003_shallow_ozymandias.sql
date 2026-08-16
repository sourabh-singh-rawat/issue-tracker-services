CREATE TABLE "identities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"display_name" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
DROP TABLE "capabilities" CASCADE;--> statement-breakpoint
DROP TABLE "organization_members" CASCADE;--> statement-breakpoint
DROP TABLE "organization_roles" CASCADE;--> statement-breakpoint
DROP TABLE "platform_members" CASCADE;--> statement-breakpoint
DROP TABLE "platform_roles" CASCADE;--> statement-breakpoint
DROP TABLE "roles" CASCADE;--> statement-breakpoint
DROP TABLE "tenant_members" CASCADE;--> statement-breakpoint
DROP TABLE "tenant_roles" CASCADE;