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
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "resources_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "role_assignments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_id" uuid NOT NULL,
	"identity_type" varchar(100) NOT NULL,
	"identity_id" varchar(255) NOT NULL,
	"assigned_by" varchar(255),
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"reason" text
);
--> statement-breakpoint
CREATE TABLE "role_capabilities" (
	"role_id" uuid NOT NULL,
	"capability_id" uuid NOT NULL,
	CONSTRAINT "role_capabilities_pkey" PRIMARY KEY("role_id","capability_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"key" varchar(150) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "roles_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "role_assignments" ADD CONSTRAINT "role_assignments_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_capabilities" ADD CONSTRAINT "role_capabilities_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_capabilities" ADD CONSTRAINT "role_capabilities_capability_id_capabilities_id_fk" FOREIGN KEY ("capability_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "capabilities_service_idx" ON "capabilities" USING btree ("service");--> statement-breakpoint
CREATE INDEX "capabilities_service_resource_idx" ON "capabilities" USING btree ("service","resource");--> statement-breakpoint
CREATE UNIQUE INDEX "outbox_event_id_uidx" ON "outbox_messages" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "outbox_status_next_attempt_idx" ON "outbox_messages" USING btree ("status","next_attempt_at");--> statement-breakpoint
CREATE INDEX "outbox_aggregate_idx" ON "outbox_messages" USING btree ("aggregate_type","aggregate_id");--> statement-breakpoint
CREATE INDEX "role_assignments_role_id_idx" ON "role_assignments" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "role_assignments_identity_idx" ON "role_assignments" USING btree ("identity_type","identity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "role_assignments_role_identity_uidx" ON "role_assignments" USING btree ("role_id","identity_type","identity_id");--> statement-breakpoint
CREATE INDEX "role_capabilities_role_id_idx" ON "role_capabilities" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "role_capabilities_capability_id_idx" ON "role_capabilities" USING btree ("capability_id");