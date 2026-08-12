import { ALL_CAPABILITIES, ALL_PLATFORM_ROLES } from "@pine/authorization";
import { uuidv7 } from "@pine/common";
import { ExponentialBackoffPolicy, OutboxRepository, OutboxService } from "@pine/outbox";
import { and, eq, notInArray } from "drizzle-orm";
import { closeDb, db, initializeDb } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { Capabilities, PlatformRoles, type Transaction } from "@/db";
import { schedulePlatformRoleCapabilitiesUpdated } from "@/integrations/authorization/platformRoleGraph";

const seedCapabilities = async (tx: Transaction): Promise<void> => {
  for (const capability of ALL_CAPABILITIES) {
    await tx
      .insert(Capabilities)
      .values({
        id: uuidv7(),
        key: capability.key,
        service: capability.service,
        resource: capability.resource,
        action: capability.action,
      })
      .onConflictDoUpdate({
        target: Capabilities.key,
        set: {
          service: capability.service,
          resource: capability.resource,
          action: capability.action,
          updatedAt: new Date(),
        },
      });
  }

  logger.info(`Seeded ${ALL_CAPABILITIES.length} capability(ies)`);
};

const seedPlatformRoles = async (tx: Transaction): Promise<void> => {
  const now = new Date();
  const platformRoleIds = ALL_PLATFORM_ROLES.map((role) => role.id);

  await tx
    .delete(PlatformRoles)
    .where(and(eq(PlatformRoles.isSystem, true), notInArray(PlatformRoles.id, platformRoleIds)));

  for (const role of ALL_PLATFORM_ROLES) {
    await tx
      .insert(PlatformRoles)
      .values({
        id: role.id,
        key: role.key,
        name: role.name,
        description: role.description,
        isSystem: true,
        createdAt: now,
      })
      .onConflictDoUpdate({
        target: PlatformRoles.id,
        set: {
          key: role.key,
          name: role.name,
          description: role.description,
          isSystem: true,
          updatedAt: now,
          deletedAt: null,
        },
      });
  }

  logger.info(`Seeded ${ALL_PLATFORM_ROLES.length} platform role(s)`);
};

const seedGraphEvents = async (
  tx: Transaction,
  outboxService: OutboxService,
): Promise<void> => {
  for (const role of ALL_PLATFORM_ROLES) {
    await schedulePlatformRoleCapabilitiesUpdated(outboxService, role.id, role.key, { tx });
  }

  logger.info(
    `Scheduled capability graph sync for ${ALL_PLATFORM_ROLES.length} platform role(s)`,
  );
};

const seed = async (): Promise<void> => {
  await initializeDb();

  const outboxService = new OutboxService(
    new OutboxRepository(db),
    new ExponentialBackoffPolicy(),
  );

  await db.transaction(async (tx) => {
    await seedCapabilities(tx);
    await seedPlatformRoles(tx);
    await seedGraphEvents(tx, outboxService);
  });

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
