import { ALL_PLATFORM_ROLES, ALL_TENANT_ROLES } from "@pine/authorization";
import { ExponentialBackoffPolicy, OutboxRepository, OutboxService } from "@pine/outbox";
import { isNull } from "drizzle-orm";
import { closeDb, db, initializeDb } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { TenantMembers } from "@/db";
import { scheduleTenantMemberCreated } from "@/features/tenantMembers/services/TenantMemberService";
import { scheduleTenantRolePermissionsUpdated } from "@/features/tenantRoles/services/TenantRoleService";
import { schedulePlatformRolePermissionsUpdated } from "@/features/platformRoles/services/PlatformRoleService";

const seedGraphEvents = async (
  outboxService: OutboxService,
): Promise<void> => {
  for (const role of ALL_PLATFORM_ROLES) {
    await schedulePlatformRolePermissionsUpdated(outboxService, role.id, role.key);
  }

  logger.info(
    `Scheduled permission graph sync for ${ALL_PLATFORM_ROLES.length} platform system role(s)`,
  );

  for (const role of ALL_TENANT_ROLES) {
    await scheduleTenantRolePermissionsUpdated(outboxService, role.id, role.key);
  }

  logger.info(
    `Scheduled permission graph sync for ${ALL_TENANT_ROLES.length} tenant system role(s)`,
  );

  const tenantMembers = await db
    .select()
    .from(TenantMembers)
    .where(isNull(TenantMembers.deletedAt));

  for (const member of tenantMembers) {
    await scheduleTenantMemberCreated(outboxService, member);
  }

  logger.info(`Scheduled graph sync for ${tenantMembers.length} tenant member(s)`);
};

const seed = async (): Promise<void> => {
  await initializeDb();

  const outboxService = new OutboxService(
    new OutboxRepository(db),
    new ExponentialBackoffPolicy(),
  );

  await seedGraphEvents(outboxService);

  logger.info("Seed completed");
};

seed()
  .then(async () => {
    await closeDb();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error("Seed failed", error);
    await closeDb().catch(() => undefined);
    process.exit(1);
  });
