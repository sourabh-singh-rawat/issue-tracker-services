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
CREATE INDEX "capabilities_service_idx" ON "capabilities" USING btree ("service");--> statement-breakpoint
CREATE INDEX "capabilities_service_resource_idx" ON "capabilities" USING btree ("service","resource");