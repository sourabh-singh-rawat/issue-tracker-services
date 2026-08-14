import "reflect-metadata";

import { PLATFORM_ROLES } from "@pine/authorization";
import type { IOutboxService } from "@pine/outbox";
import { closeDb, container, initializeDb, TYPES } from "@/bootstrap";
import type { Database } from "@/db";
import type { IPlatformMemberRepository } from "@/features/platformMembers";
import { schedulePlatformMemberCreated } from "@/features/platformMembers/services/PlatformMemberService";
import { schedulePlatformRolePermissionsUpdated } from "@/features/platformRoles/services/PlatformRoleService";

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
  const platformMemberRepository =
    container.get<IPlatformMemberRepository>(TYPES.PlatformMemberRepository);
  const outboxService = container.get<IOutboxService>(TYPES.OutboxService);

  const role = platformAdmin;

  const existing = await platformMemberRepository.findByRoleAndIdentity(
    role.id,
    identityId,
  );

  if (existing) {
    await db.transaction(async (tx) => {
      await schedulePlatformRolePermissionsUpdated(outboxService, role.id, role.key, {
        tx,
      });
      await schedulePlatformMemberCreated(outboxService, existing, { tx });
    });

    console.log(
      `grant-platform-admin: already assigned role=${role.key} roleId=${role.id} identity=${identityId} (re-synced graph events)`,
    );
    return;
  }

  await db.transaction(async (tx) => {
    const assignment = await platformMemberRepository.save(
      {
        platformRoleId: role.id,
        identityId,
        assignedBy: identityId,
        reason: "grant-platform-admin CLI",
      },
      { tx },
    );

    await schedulePlatformRolePermissionsUpdated(outboxService, role.id, role.key, {
      tx,
    });
    await schedulePlatformMemberCreated(outboxService, assignment, { tx });
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
