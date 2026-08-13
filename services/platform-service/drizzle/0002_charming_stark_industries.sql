ALTER TABLE "organization_members" DROP CONSTRAINT "organization_members_role_id_organization_roles_role_id_fk";--> statement-breakpoint
ALTER TABLE "platform_members" DROP CONSTRAINT "platform_members_platform_role_id_platform_roles_role_id_fk";--> statement-breakpoint
ALTER TABLE "tenant_members" DROP CONSTRAINT "tenant_members_role_id_tenant_roles_role_id_fk";--> statement-breakpoint
ALTER TABLE "organization_roles" DROP CONSTRAINT "organization_roles_pkey";--> statement-breakpoint
ALTER TABLE "platform_roles" DROP CONSTRAINT "platform_roles_pkey";--> statement-breakpoint
ALTER TABLE "tenant_roles" DROP CONSTRAINT "tenant_roles_pkey";--> statement-breakpoint
ALTER TABLE "organization_roles" ADD COLUMN "id" uuid;--> statement-breakpoint
ALTER TABLE "platform_roles" ADD COLUMN "id" uuid;--> statement-breakpoint
ALTER TABLE "tenant_roles" ADD COLUMN "id" uuid;--> statement-breakpoint
UPDATE "organization_roles" SET "id" = "role_id" WHERE "id" IS NULL;--> statement-breakpoint
UPDATE "platform_roles" SET "id" = "role_id" WHERE "id" IS NULL;--> statement-breakpoint
UPDATE "tenant_roles" SET "id" = "role_id" WHERE "id" IS NULL;--> statement-breakpoint
ALTER TABLE "organization_roles" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "platform_roles" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tenant_roles" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_roles" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "platform_roles" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "tenant_roles" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "organization_roles" ADD CONSTRAINT "organization_roles_role_id_unique" UNIQUE("role_id");--> statement-breakpoint
ALTER TABLE "platform_roles" ADD CONSTRAINT "platform_roles_role_id_unique" UNIQUE("role_id");--> statement-breakpoint
ALTER TABLE "tenant_roles" ADD CONSTRAINT "tenant_roles_role_id_unique" UNIQUE("role_id");--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_role_id_organization_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."organization_roles"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_members" ADD CONSTRAINT "platform_members_platform_role_id_platform_roles_role_id_fk" FOREIGN KEY ("platform_role_id") REFERENCES "public"."platform_roles"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_members" ADD CONSTRAINT "tenant_members_role_id_tenant_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."tenant_roles"("role_id") ON DELETE no action ON UPDATE no action;
