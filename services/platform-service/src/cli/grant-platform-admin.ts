import "reflect-metadata";

import { PLATFORM_ROLES } from "@pine/authorization";
import type { IOutboxService } from "@pine/outbox";
import { closeDb, container, initializeDb, TYPES } from "@/bootstrap";
import type { Database } from "@/db";
import type { IPlatformRoleAssignmentRepository } from "@/features/platformRoleAssignments";
import type { IPlatformRoleRepository } from "@/features/platformRoles";
import {
  schedulePlatformRoleAssignmentCreated,
  schedulePlatformRoleCapabilitiesUpdated,
} from "@/integrations/authorization/platformRoleGraph";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const resolveIdentityId = (): string => {
  const fromEnv = process.env.GRANT_PLATFORM_ADMIN_IDENTITY_ID?.trim();
  const positional = process.argv
    .slice(2)
    .map((arg) => arg.trim())
    .filter((arg) => arg.length > 0 && arg !== "--" && !arg.startsWith("-"));

  const identityId = fromEnv || positional[0];
  if (!identityId) {
    throw new Error(
      "Usage: grant-platform-admin <identityId>  (or set GRANT_PLATFORM_ADMIN_IDENTITY_ID)",
    );
  }

  if (!UUID_PATTERN.test(identityId)) {
    throw new Error(
      `grant-platform-admin: identityId must be a local identity UUID, got: ${identityId}`,
    );
  }

  return identityId;
};

const main = async (): Promise<void> => {
  const identityId = resolveIdentityId();
  const platformAdmin = PLATFORM_ROLES.PLATFORM_ADMIN;

  await initializeDb();

  const db = container.get<Database>(TYPES.Database);
  const platformRoleRepository = container.get<IPlatformRoleRepository>(
    TYPES.PlatformRoleRepository,
  );
  const platformRoleAssignmentRepository =
    container.get<IPlatformRoleAssignmentRepository>(TYPES.PlatformRoleAssignmentRepository);
  const outboxService = container.get<IOutboxService>(TYPES.OutboxService);

  const role = await platformRoleRepository.findByKey(platformAdmin.key);
  if (!role) {
    throw new Error(
      `Platform admin role not found (key=${platformAdmin.key}). Run db:seed first.`,
    );
  }

  const existing = await platformRoleAssignmentRepository.findByRoleAndIdentity(
    role.id,
    identityId,
  );

  if (existing) {
    await db.transaction(async (tx) => {
      await schedulePlatformRoleCapabilitiesUpdated(outboxService, role.id, role.key, {
        tx,
      });
      await schedulePlatformRoleAssignmentCreated(outboxService, existing, { tx });
    });

    console.log(
      `grant-platform-admin: already assigned role=${role.key} roleId=${role.id} identity=${identityId} (re-synced graph events)`,
    );
    return;
  }

  await db.transaction(async (tx) => {
    const assignment = await platformRoleAssignmentRepository.save(
      {
        platformRoleId: role.id,
        identityId,
        assignedBy: identityId,
        reason: "grant-platform-admin CLI",
      },
      { tx },
    );

    await schedulePlatformRoleCapabilitiesUpdated(outboxService, role.id, role.key, {
      tx,
    });
    await schedulePlatformRoleAssignmentCreated(outboxService, assignment, { tx });
  });

  console.log(
    `grant-platform-admin: assigned role=${role.key} roleId=${role.id} identity=${identityId}`,
  );
};

main()
  .then(async () => {
    await closeDb();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await closeDb().catch(() => undefined);
    process.exit(1);
  });
