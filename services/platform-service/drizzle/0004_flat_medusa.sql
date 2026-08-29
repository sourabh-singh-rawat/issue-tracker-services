CREATE TABLE "identity_organization_preferences" (
	"id" uuid PRIMARY KEY NOT NULL,
	"identity_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"tenant_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "identity_organization_preferences_identity_id_unique" UNIQUE("identity_id")
);
--> statement-breakpoint
ALTER TABLE "identity_organization_preferences" ADD CONSTRAINT "identity_organization_preferences_identity_id_identities_id_fk" FOREIGN KEY ("identity_id") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity_organization_preferences" ADD CONSTRAINT "identity_organization_preferences_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity_organization_preferences" ADD CONSTRAINT "identity_organization_preferences_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;