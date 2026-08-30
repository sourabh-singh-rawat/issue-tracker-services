ALTER TABLE "identity_profiles" RENAME TO "profiles";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "identity_profiles_identity_id_identities_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "gender" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_identity_id_identities_id_fk" FOREIGN KEY ("identity_id") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;