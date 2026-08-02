import "reflect-metadata";

import { closeDb, container, initializeDb, logger, TYPES } from "@/bootstrap";
import type { IAdminService } from "@/features/admin";
import type { IIdentityAdminProvider } from "@/integrations/identity";

const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
};

const optionalEnv = (name: string): string | undefined => {
  const value = process.env[name]?.trim();
  return value || undefined;
};

const bootstrapAdmin = async (): Promise<void> => {
  const email = requireEnv("BOOTSTRAP_ADMIN_EMAIL");
  const username = requireEnv("BOOTSTRAP_ADMIN_USERNAME");
  const password = requireEnv("BOOTSTRAP_ADMIN_PASSWORD");
  const firstName = requireEnv("BOOTSTRAP_ADMIN_FIRST_NAME");
  const lastName = requireEnv("BOOTSTRAP_ADMIN_LAST_NAME");
  const middleName = optionalEnv("BOOTSTRAP_ADMIN_MIDDLE_NAME");

  await initializeDb();

  const identityAdminProvider = container.get<IIdentityAdminProvider>(TYPES.IdentityAdminProvider);
  const adminService = container.get<IAdminService>(TYPES.AdminService);

  if (await identityAdminProvider.existsByEmail(email)) {
    logger.info(`bootstrap-admin: identity already exists email=${email}`);
    return;
  }

  const identity = await adminService.createIdentity({
    email,
    username,
    password,
    emailVerified: true,
    firstName,
    middleName,
    lastName,
  });

  logger.info(
    `bootstrap-admin: created identity id=${identity.id} idpId=${identity.idpId} email=${email} username=${username}`,
  );
};

bootstrapAdmin()
  .then(async () => {
    await closeDb();
    process.exit(0);
  })
  .catch(async () => {
    await closeDb().catch(() => undefined);
    process.exit(1);
  });
