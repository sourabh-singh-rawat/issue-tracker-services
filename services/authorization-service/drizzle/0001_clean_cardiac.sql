CREATE TABLE "role_assignments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"identity_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"assigned_by" uuid,
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "role_assignments_identity_id_role_id_unique" UNIQUE("identity_id","role_id")
);
--> statement-breakpoint
ALTER TABLE "role_assignments" ADD CONSTRAINT "role_assignments_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;