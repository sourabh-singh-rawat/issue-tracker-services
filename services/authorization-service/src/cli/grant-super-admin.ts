import { SYSTEM_ROLES, USER } from "@pine/authorization";
import { container, TYPES } from "@/bootstrap";
import type { IRoleAssignmentService, IRoleRepository } from "@/features/roles";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const resolveIdentityId = (): string => {
  const fromEnv = process.env.GRANT_SUPER_ADMIN_IDENTITY_ID?.trim();
  const positional = process.argv
    .slice(2)
    .map((arg) => arg.trim())
    .filter((arg) => arg.length > 0 && arg !== "--" && !arg.startsWith("-"));

  const identityId = fromEnv || positional[0];
  if (!identityId) {
    throw new Error(
      "Usage: grant-super-admin <identityId>  (or set GRANT_SUPER_ADMIN_IDENTITY_ID)",
    );
  }

  if (!UUID_PATTERN.test(identityId)) {
    throw new Error(
      `grant-super-admin: identityId must be a local identity UUID, got: ${identityId}`,
    );
  }

  return identityId;
};

const main = async () => {
  const identityId = resolveIdentityId();
  const systemAdmin = SYSTEM_ROLES.SYSTEM_ADMINISTRATOR;

  const roleRepository = container.get<IRoleRepository>(TYPES.RoleRepository);
  const roleAssignmentService = container.get<IRoleAssignmentService>(TYPES.RoleAssignmentService);

  const role = await roleRepository.findByKey(systemAdmin.key);
  if (!role) {
    throw new Error(
      `System administrator role not found (key=${systemAdmin.key}). Run db:seed first.`,
    );
  }

  const existing = await roleAssignmentService.getAssignment(
    USER.name,
    identityId,
    role.id,
  );

  await roleAssignmentService.assignRole({
    identityType: USER.name,
    identityId,
    roleId: role.id,
    reason: "grant-super-admin CLI",
  });

  if (existing) {
    console.log(
      `grant-super-admin: already assigned role=${role.key} roleId=${role.id} identity=${USER.name}:${identityId}`,
    );
  } else {
    console.log(
      `grant-super-admin: assigned role=${role.key} roleId=${role.id} identity=${USER.name}:${identityId} (keto sync via outbox)`,
    );
  }
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
