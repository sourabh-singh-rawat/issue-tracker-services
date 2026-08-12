import {
  ALL_CAPABILITIES,
  ALL_ORGANIZATION_ROLES,
  ALL_PLATFORM_ROLES,
  ALL_TENANT_ROLES,
} from "@pine/authorization";
import { uuidv7 } from "@pine/common";
import { ExponentialBackoffPolicy, OutboxRepository, OutboxService } from "@pine/outbox";
import { and, eq, inArray, isNull, notInArray } from "drizzle-orm";
import { closeDb, db, initializeDb } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import {
  Capabilities,
  OrganizationRoles,
  PlatformRoles,
  Roles,
  TenantRoles,
  type Transaction,
} from "@/db";
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

const upsertSystemRole = async (
  tx: Transaction,
  role: {
    id: string;
    key: string;
    name: string;
    description: string;
  },
  now: Date,
): Promise<void> => {
  await tx
    .insert(Roles)
    .values({
      id: role.id,
      key: role.key,
      name: role.name,
      description: role.description,
      isSystem: true,
      createdAt: now,
    })
    .onConflictDoUpdate({
      target: Roles.id,
      set: {
        key: role.key,
        name: role.name,
        description: role.description,
        isSystem: true,
        updatedAt: now,
        deletedAt: null,
      },
    });
};

const seedPlatformRoles = async (tx: Transaction): Promise<void> => {
  const now = new Date();
  const systemRoleIds = ALL_PLATFORM_ROLES.map((role) => role.id);

  const obsoleteSystemPlatformRoles = await tx
    .select({ roleId: PlatformRoles.roleId })
    .from(PlatformRoles)
    .innerJoin(Roles, eq(Roles.id, PlatformRoles.roleId))
    .where(and(eq(Roles.isSystem, true), notInArray(Roles.id, systemRoleIds)));

  const obsoleteIds = obsoleteSystemPlatformRoles.map((row) => row.roleId);
  if (obsoleteIds.length > 0) {
    await tx.delete(PlatformRoles).where(inArray(PlatformRoles.roleId, obsoleteIds));
    await tx.delete(Roles).where(inArray(Roles.id, obsoleteIds));
  }

  for (const role of ALL_PLATFORM_ROLES) {
    await upsertSystemRole(tx, role, now);

    await tx
      .insert(PlatformRoles)
      .values({ id: uuidv7(), roleId: role.id })
      .onConflictDoNothing({ target: PlatformRoles.roleId });
  }

  logger.info(`Seeded ${ALL_PLATFORM_ROLES.length} platform system role(s)`);
};

const seedCatalogSystemRoles = async (
  tx: Transaction,
  roles: readonly {
    id: string;
    key: string;
    name: string;
    description: string;
  }[],
  label: string,
): Promise<void> => {
  const now = new Date();
  const systemRoleIds = roles.map((role) => role.id);
  const systemRoleKeys = roles.map((role) => role.key);

  const obsoleteSystemRoles = await tx
    .select({ roleId: Roles.id })
    .from(Roles)
    .leftJoin(OrganizationRoles, eq(OrganizationRoles.roleId, Roles.id))
    .leftJoin(PlatformRoles, eq(PlatformRoles.roleId, Roles.id))
    .leftJoin(TenantRoles, eq(TenantRoles.roleId, Roles.id))
    .where(
      and(
        eq(Roles.isSystem, true),
        inArray(Roles.key, systemRoleKeys),
        notInArray(Roles.id, systemRoleIds),
        isNull(OrganizationRoles.roleId),
        isNull(PlatformRoles.roleId),
        isNull(TenantRoles.roleId),
      ),
    );

  const obsoleteIds = obsoleteSystemRoles.map((row) => row.roleId);
  if (obsoleteIds.length > 0) {
    await tx.delete(Roles).where(inArray(Roles.id, obsoleteIds));
  }

  for (const role of roles) {
    await upsertSystemRole(tx, role, now);
  }

  logger.info(`Seeded ${roles.length} ${label} system role(s)`);
};

const seedTenantRoles = async (tx: Transaction): Promise<void> => {
  await seedCatalogSystemRoles(tx, ALL_TENANT_ROLES, "tenant");
};

const seedOrganizationRoles = async (tx: Transaction): Promise<void> => {
  await seedCatalogSystemRoles(tx, ALL_ORGANIZATION_ROLES, "organization");
};

const seedGraphEvents = async (
  tx: Transaction,
  outboxService: OutboxService,
): Promise<void> => {
  for (const role of ALL_PLATFORM_ROLES) {
    await schedulePlatformRoleCapabilitiesUpdated(outboxService, role.id, role.key, { tx });
  }

  logger.info(
    `Scheduled capability graph sync for ${ALL_PLATFORM_ROLES.length} platform system role(s)`,
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
    await seedTenantRoles(tx);
    await seedOrganizationRoles(tx);
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
