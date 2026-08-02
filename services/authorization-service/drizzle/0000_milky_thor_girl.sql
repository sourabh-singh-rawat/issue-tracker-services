CREATE TABLE "delegations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"delegator_identity_id" uuid NOT NULL,
	"delegate_identity_id" uuid NOT NULL,
	"permission_key" varchar(150) NOT NULL,
	"resource_type" varchar(100) NOT NULL,
	"resource_id" uuid NOT NULL,
	"starts_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission_grants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subject_type" varchar(100) NOT NULL,
	"subject_id" uuid NOT NULL,
	"resource_type" varchar(100) NOT NULL,
	"resource_id" uuid NOT NULL,
	"permission_key" varchar(150) NOT NULL,
	"granted_by" uuid NOT NULL,
	"granted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"key" varchar(150) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_id" uuid NOT NULL,
	"permission_key" varchar(150) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_key_unique" UNIQUE("role_id","permission_key")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"key" varchar(150) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "roles_key_unique" UNIQUE("key"),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "delegations" ADD CONSTRAINT "delegations_permission_key_permissions_key_fk" FOREIGN KEY ("permission_key") REFERENCES "public"."permissions"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permission_grants" ADD CONSTRAINT "permission_grants_permission_key_permissions_key_fk" FOREIGN KEY ("permission_key") REFERENCES "public"."permissions"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_key_permissions_key_fk" FOREIGN KEY ("permission_key") REFERENCES "public"."permissions"("key") ON DELETE no action ON UPDATE no action;