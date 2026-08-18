import "reflect-metadata";

import { ADMIN } from "@pine/authorization";
import { resolveIdentityId } from "@pine/common";
import type { IOutboxWorker } from "@pine/outbox";
import { broker, closeDb, container, initializeDb, TYPES } from "@/bootstrap";
import { GrantPlatformAdmin } from "@/features/platform/commands/GrantPlatformAdmin";
import type { IPlatformRelationService } from "@/features/platform/services/IPlatformRelationService";

const main = async (): Promise<void> => {
  const identityId = resolveIdentityId({
    envVarName: "GRANT_PLATFORM_ADMIN_IDENTITY_ID",
    missingMessage:
      "Usage: grant-platform-admin <identityId>  (or set GRANT_PLATFORM_ADMIN_IDENTITY_ID)",
  });

  await initializeDb();

  const command = new GrantPlatformAdmin(
    container.get<IPlatformRelationService>(TYPES.PlatformRelationService),
  );
  await command.execute(identityId);

  await broker.init();
  await container.get<IOutboxWorker>(TYPES.OutboxWorker).tick();

  console.log(`grant-platform-admin: assigned relation=${ADMIN} identity=${identityId}`);
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
