DROP TABLE IF EXISTS "delegations" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "permission_grants" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "role_permissions" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "role_assignments" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "permissions" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "roles" CASCADE;--> statement-breakpoint
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" varchar(100) NOT NULL,
	"key" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"is_static" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "resources_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "resource_relations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"resource_type" varchar(100) NOT NULL,
	"key" varchar(100) NOT NULL,
	CONSTRAINT "resource_relations_type_key_unique" UNIQUE("resource_type","key")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"key" varchar(150) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "roles_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "role_resources" (
	"role_id" uuid NOT NULL,
	"resource_id" uuid NOT NULL,
	"relation" varchar(100) NOT NULL,
	CONSTRAINT "role_resources_pkey" PRIMARY KEY("role_id","resource_id","relation")
);
--> statement-breakpoint
CREATE TABLE "role_assignments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_id" uuid NOT NULL,
	"subject_type" varchar(100) NOT NULL,
	"subject_id" varchar(255) NOT NULL,
	"scope_type" varchar(100),
	"scope_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "role_resources" ADD CONSTRAINT "role_resources_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_resources" ADD CONSTRAINT "role_resources_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_assignments" ADD CONSTRAINT "role_assignments_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "resources_type_idx" ON "resources" USING btree ("type");--> statement-breakpoint
CREATE INDEX "resource_relations_resource_type_idx" ON "resource_relations" USING btree ("resource_type");--> statement-breakpoint
CREATE INDEX "role_resources_role_id_idx" ON "role_resources" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "role_resources_resource_id_idx" ON "role_resources" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "role_assignments_role_id_idx" ON "role_assignments" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "role_assignments_subject_idx" ON "role_assignments" USING btree ("subject_type","subject_id");--> statement-breakpoint
CREATE INDEX "role_assignments_scope_idx" ON "role_assignments" USING btree ("scope_type","scope_id");--> statement-breakpoint
CREATE UNIQUE INDEX "role_assignments_global_uidx" ON "role_assignments" USING btree ("role_id","subject_type","subject_id") WHERE "scope_type" is null and "scope_id" is null;--> statement-breakpoint
CREATE UNIQUE INDEX "role_assignments_scoped_uidx" ON "role_assignments" USING btree ("role_id","subject_type","subject_id","scope_type","scope_id") WHERE "scope_type" is not null and "scope_id" is not null;
