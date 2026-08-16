import "reflect-metadata";

import { ADMIN } from "@pine/authorization";
import { resolveIdentityId } from "@pine/common";
import { closeDb, container, initializeDb, TYPES } from "@/bootstrap";
import { GrantPlatformAdmin } from "@/features/platform/commands/GrantPlatformAdmin";
import type { IPlatformMemberService } from "@/features/platform/services/IPlatformMemberService";

const main = async (): Promise<void> => {
  const identityId = resolveIdentityId({
    envVarName: "GRANT_PLATFORM_ADMIN_IDENTITY_ID",
    missingMessage:
      "Usage: grant-platform-admin <identityId>  (or set GRANT_PLATFORM_ADMIN_IDENTITY_ID)",
  });

  await initializeDb();

  const command = new GrantPlatformAdmin(
    container.get<IPlatformMemberService>(TYPES.PlatformMemberService),
  );
  await command.execute(identityId);

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
