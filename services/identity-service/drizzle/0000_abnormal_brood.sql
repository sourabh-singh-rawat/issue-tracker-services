CREATE TABLE "client_grant_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"client_id" uuid NOT NULL,
	"grant_id" uuid NOT NULL,
	CONSTRAINT "client_grant_types_client_id_grant_id_unique" UNIQUE("client_id","grant_id")
);
--> statement-breakpoint
CREATE TABLE "client_redirect_uris" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"client_id" uuid NOT NULL,
	"uri" text NOT NULL,
	CONSTRAINT "client_redirect_uris_client_id_uri_unique" UNIQUE("client_id","uri")
);
--> statement-breakpoint
CREATE TABLE "client_scopes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"client_id" uuid NOT NULL,
	"scope_id" uuid NOT NULL,
	CONSTRAINT "client_scopes_client_id_scope_id_unique" UNIQUE("client_id","scope_id")
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"name" text NOT NULL,
	"oauth_provider" text,
	"provider_client_id" text
);
--> statement-breakpoint
CREATE TABLE "grants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "grants_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "scopes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "scopes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"user_id" uuid NOT NULL,
	"display_name" text NOT NULL,
	"description" text,
	"photo_url" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"version" integer DEFAULT 1 NOT NULL,
	"email" text NOT NULL,
	"idp_id" text,
	"idp_provider" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "client_grant_types" ADD CONSTRAINT "client_grant_types_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_grant_types" ADD CONSTRAINT "client_grant_types_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_redirect_uris" ADD CONSTRAINT "client_redirect_uris_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_scopes" ADD CONSTRAINT "client_scopes_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_scopes" ADD CONSTRAINT "client_scopes_scope_id_scopes_id_fk" FOREIGN KEY ("scope_id") REFERENCES "public"."scopes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
INSERT INTO "scopes" ("id", "name", "description", "version") VALUES
	(gen_random_uuid(), 'openid', 'OpenID Connect subject identifier (sub claim)', 1),
	(gen_random_uuid(), 'profile', 'End-user default profile claims (name, picture, etc.)', 1),
	(gen_random_uuid(), 'email', 'End-user email address claims', 1);
--> statement-breakpoint
INSERT INTO "grants" ("id", "name", "description", "version") VALUES
    (gen_random_uuid(), 'authorization_code', 'Authorization Code grant for interactive user authentication.', 1),
    (gen_random_uuid(), 'client_credentials', 'Client Credentials grant for machine-to-machine authentication.', 1),
    (gen_random_uuid(), 'refresh_token', 'Refresh Token grant for obtaining a new access token.', 1),
    (gen_random_uuid(), 'device_code', 'Device Authorization grant for devices with limited input capabilities.', 1);
