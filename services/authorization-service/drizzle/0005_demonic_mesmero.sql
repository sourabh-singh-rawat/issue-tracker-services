CREATE TABLE "capabilities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"service" varchar(100) NOT NULL,
	"resource" varchar(100) NOT NULL,
	"action" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "capabilities_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "identities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_capabilities" (
	"role_id" uuid NOT NULL,
	"capability_id" uuid NOT NULL,
	CONSTRAINT "role_capabilities_pkey" PRIMARY KEY("role_id","capability_id")
);
--> statement-breakpoint
ALTER TABLE "resource_relations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "role_resources" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "resource_relations" CASCADE;--> statement-breakpoint
DROP TABLE "role_resources" CASCADE;--> statement-breakpoint
ALTER TABLE "resources" DROP CONSTRAINT "resources_key_unique";--> statement-breakpoint
DROP INDEX "resources_type_idx";--> statement-breakpoint
DROP INDEX "role_assignments_subject_idx";--> statement-breakpoint
DROP INDEX "role_assignments_scope_idx";--> statement-breakpoint
DROP INDEX "role_assignments_global_uidx";--> statement-breakpoint
DROP INDEX "role_assignments_scoped_uidx";--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "identity_type" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "identity_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "assigned_by" varchar(255);--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "assigned_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "expires_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "revoked_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD COLUMN "reason" text;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "role_capabilities" ADD CONSTRAINT "role_capabilities_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_capabilities" ADD CONSTRAINT "role_capabilities_capability_id_capabilities_id_fk" FOREIGN KEY ("capability_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "capabilities_service_idx" ON "capabilities" USING btree ("service");--> statement-breakpoint
CREATE INDEX "capabilities_service_resource_idx" ON "capabilities" USING btree ("service","resource");--> statement-breakpoint
CREATE INDEX "role_capabilities_role_id_idx" ON "role_capabilities" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "role_capabilities_capability_id_idx" ON "role_capabilities" USING btree ("capability_id");--> statement-breakpoint
CREATE INDEX "role_assignments_identity_idx" ON "role_assignments" USING btree ("identity_type","identity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "role_assignments_role_identity_uidx" ON "role_assignments" USING btree ("role_id","identity_type","identity_id");--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "key";--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "is_static";--> statement-breakpoint
ALTER TABLE "role_assignments" DROP COLUMN "subject_type";--> statement-breakpoint
ALTER TABLE "role_assignments" DROP COLUMN "subject_id";--> statement-breakpoint
ALTER TABLE "role_assignments" DROP COLUMN "scope_type";--> statement-breakpoint
ALTER TABLE "role_assignments" DROP COLUMN "scope_id";--> statement-breakpoint
ALTER TABLE "role_assignments" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_name_unique" UNIQUE("name");