import { describe, expect, it, vi } from "vitest";
import { AuthorizationService } from "@/features/authorization/services/AuthorizationService";

const createService = (
  roleResourceRepository: unknown,
  authorizationGraphProvider: unknown = { checkPermission: vi.fn() },
) =>
  new AuthorizationService(
    roleResourceRepository as never,
    authorizationGraphProvider as never,
  );

describe("AuthorizationService", () => {
  it("returns true when any role has any of the permissions", async () => {
    const roleResourceRepository = {
      existsByRoleKeysAndResourceKeys: vi.fn().mockResolvedValue(true),
    };

    const service = createService(roleResourceRepository);

    await expect(
      service.hasCapability(
        ["system.administrator", "system.read-only"],
        ["authorization.roles.create", "authorization.roles.read"],
      ),
    ).resolves.toBe(true);

    expect(roleResourceRepository.existsByRoleKeysAndResourceKeys).toHaveBeenCalledWith(
      ["system.administrator", "system.read-only"],
      ["authorization.roles.create", "authorization.roles.read"],
    );
  });

  it("returns false when no roles are provided", async () => {
    const roleResourceRepository = {
      existsByRoleKeysAndResourceKeys: vi.fn().mockResolvedValue(true),
    };

    const service = createService(roleResourceRepository);

    await expect(service.hasCapability([], ["authorization.roles.create"])).resolves.toBe(false);
    expect(roleResourceRepository.existsByRoleKeysAndResourceKeys).not.toHaveBeenCalled();
  });

  it("returns false when no permissions are provided", async () => {
    const roleResourceRepository = {
      existsByRoleKeysAndResourceKeys: vi.fn().mockResolvedValue(true),
    };

    const service = createService(roleResourceRepository);

    await expect(service.hasCapability(["system.administrator"], [])).resolves.toBe(false);
    expect(roleResourceRepository.existsByRoleKeysAndResourceKeys).not.toHaveBeenCalled();
  });

  it("delegates relationship checks to the authorization graph provider", async () => {
    const authorizationGraphProvider = {
      checkPermission: vi.fn().mockResolvedValue(true),
    };
    const service = createService({}, authorizationGraphProvider);

    const relationship = {
      object: { type: "organization", id: "org-1" },
      relation: "member",
      subject: { type: "user", id: "user-1" },
    };

    await expect(service.hasRelationship(relationship)).resolves.toBe(true);
    expect(authorizationGraphProvider.checkPermission).toHaveBeenCalledWith(
      relationship.object,
      relationship.relation,
      relationship.subject,
    );
  });
});
