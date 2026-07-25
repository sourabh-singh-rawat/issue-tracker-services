ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "identities";
--> statement-breakpoint
ALTER TABLE "user_profiles" RENAME TO "identity_profiles";
--> statement-breakpoint
ALTER TABLE "identity_profiles" RENAME COLUMN "user_id" TO "identity_id";
--> statement-breakpoint
ALTER TABLE "identities" RENAME CONSTRAINT "users_email_unique" TO "identities_email_unique";
--> statement-breakpoint
ALTER TABLE "identity_profiles" ADD CONSTRAINT "identity_profiles_identity_id_identities_id_fk" FOREIGN KEY ("identity_id") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;
