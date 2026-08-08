import { ALL_CAPABILITIES, ALL_RESOURCES, ALL_SYSTEM_ROLES } from "@pine/authorization";
import { uuidv7 } from "@pine/common";
import { eq, inArray } from "drizzle-orm";
import { closeDb, db, initializeDb } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { Capabilities, Resources, RoleCapabilities, Roles, type Transaction } from "@/db";

const seedResources = async (tx: Transaction): Promise<void> => {
  for (const resource of ALL_RESOURCES) {
    await tx
      .insert(Resources)
      .values({
        id: uuidv7(),
        name: resource.name,
        description: resource.description,
        isSystem: resource.isSystem,
      })
      .onConflictDoUpdate({
        target: Resources.name,
        set: {
          description: resource.description,
          isSystem: resource.isSystem,
          updatedAt: new Date(),
        },
      });
  }

  logger.info(`Seeded ${ALL_RESOURCES.length} system resource(s)`);
};

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

const seedRoles = async (tx: Transaction): Promise<void> => {
  const now = new Date();

  for (const role of ALL_SYSTEM_ROLES) {
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
        },
      });

    const capabilityKeys = [...role.capabilityKeys];

    await tx.delete(RoleCapabilities).where(eq(RoleCapabilities.roleId, role.id));

    if (capabilityKeys.length === 0) {
      continue;
    }

    const capabilities = await tx
      .select({ id: Capabilities.id, key: Capabilities.key })
      .from(Capabilities)
      .where(inArray(Capabilities.key, capabilityKeys));

    const byKey = new Map(capabilities.map((c) => [c.key, c.id]));
    const mappings = capabilityKeys.map((key) => {
      const capabilityId = byKey.get(key);
      if (!capabilityId) {
        throw new Error(`Seed failed: capability not found for key=${key} (role=${role.key})`);
      }
      return {
        roleId: role.id,
        capabilityId,
      };
    });

    await tx.insert(RoleCapabilities).values(mappings);
  }

  logger.info(`Seeded ${ALL_SYSTEM_ROLES.length} system role(s)`);
};

const seed = async (): Promise<void> => {
  await initializeDb();

  await db.transaction(async (tx) => {
    await seedResources(tx);
    await seedCapabilities(tx);
    await seedRoles(tx);
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
