import { ALL_CAPABILITIES, ALL_DYNAMIC_RESOURCES, ALL_SYSTEM_ROLES } from "@pine/authorization";
import { uuidv7 } from "@pine/common";
import { eq, inArray } from "drizzle-orm";
import { closeDb, db, initializeDb } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import {
  ResourceRelations,
  Resources,
  RoleResources,
  Roles,
  type Transaction,
} from "@/db";

const CAPABILITY_HAS_RELATION = "has";

const seedResources = async (tx: Transaction): Promise<void> => {
  const staticResources = [...ALL_DYNAMIC_RESOURCES, ...ALL_CAPABILITIES];

  for (const resource of staticResources) {
    await tx
      .insert(Resources)
      .values({
        id: uuidv7(),
        type: resource.type,
        key: resource.key,
        name: resource.name,
        description: resource.description,
        isStatic: true,
      })
      .onConflictDoUpdate({
        target: Resources.key,
        set: {
          type: resource.type,
          name: resource.name,
          description: resource.description,
          isStatic: true,
          updatedAt: new Date(),
        },
      });
  }

  logger.info(`Seeded ${staticResources.length} static resource(s)`);
};

const seedResourceRelations = async (tx: Transaction): Promise<void> => {
  const byType = new Map<string, Set<string>>();

  for (const resource of [...ALL_DYNAMIC_RESOURCES, ...ALL_CAPABILITIES]) {
    const keys = byType.get(resource.type) ?? new Set<string>();
    for (const relationKey of Object.values(resource.relations)) {
      keys.add(relationKey);
    }
    byType.set(resource.type, keys);
  }

  let count = 0;
  for (const [resourceType, keys] of byType) {
    for (const key of keys) {
      await tx
        .insert(ResourceRelations)
        .values({
          id: uuidv7(),
          resourceType,
          key,
        })
        .onConflictDoNothing({
          target: [ResourceRelations.resourceType, ResourceRelations.key],
        });
      count += 1;
    }
  }

  logger.info(`Seeded resource relations for ${byType.size} type(s) (${count} upsert attempt(s))`);
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
        createdAt: now,
      })
      .onConflictDoUpdate({
        target: Roles.id,
        set: {
          key: role.key,
          name: role.name,
          description: role.description,
          updatedAt: now,
        },
      });

    const capabilityKeys = [...role.capabilityKeys];

    await tx.delete(RoleResources).where(eq(RoleResources.roleId, role.id));

    if (capabilityKeys.length === 0) {
      continue;
    }

    const resources = await tx
      .select({ id: Resources.id, key: Resources.key })
      .from(Resources)
      .where(inArray(Resources.key, capabilityKeys));

    const byKey = new Map(resources.map((r) => [r.key, r.id]));
    const mappings = capabilityKeys.map((key) => {
      const resourceId = byKey.get(key);
      if (!resourceId) {
        throw new Error(
          `Seed failed: capability resource not found for key=${key} (role=${role.key})`,
        );
      }
      return {
        roleId: role.id,
        resourceId,
        relation: CAPABILITY_HAS_RELATION,
      };
    });

    await tx.insert(RoleResources).values(mappings);
  }

  logger.info(`Seeded ${ALL_SYSTEM_ROLES.length} system role(s)`);
};

const seed = async (): Promise<void> => {
  await initializeDb();

  await db.transaction(async (tx) => {
    await seedResources(tx);
    await seedResourceRelations(tx);
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
