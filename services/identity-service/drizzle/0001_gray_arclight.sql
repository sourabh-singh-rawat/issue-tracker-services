ALTER TABLE "identities" DROP CONSTRAINT "identities_email_unique";--> statement-breakpoint
ALTER TABLE "identities" ALTER COLUMN "idp_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "identities" ALTER COLUMN "idp_provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "identity_profiles" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "identity_profiles" ADD COLUMN "middle_name" text;--> statement-breakpoint
ALTER TABLE "identity_profiles" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "identities" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "identities" ADD CONSTRAINT "identities_idp_id_unique" UNIQUE("idp_id");