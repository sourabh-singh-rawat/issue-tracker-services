import { describe, expect, it, vi } from "vitest";
import {
  PermissionKeyConflictError,
  PermissionNotFoundError,
} from "@/features/permissions/errors";
import { PermissionService } from "@/features/permissions/services/PermissionService";

const permission = {
  id: "res-1",
  type: "capability",
  key: "authorization.roles.create",
  name: "Create roles",
  description: "Allows creating roles",
  isStatic: false,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const createService = (permissionRepository: unknown) =>
  new PermissionService(permissionRepository as never);

describe("PermissionService", () => {
  it("creates a permission when the key is unique", async () => {
    const permissionRepository = {
      existsByKey: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(permission),
    };

    const service = createService(permissionRepository);

    await expect(
      service.createPermission({
        key: "authorization.roles.create",
        name: "Create roles",
        description: "Allows creating roles",
      }),
    ).resolves.toEqual(permission);

    expect(permissionRepository.existsByKey).toHaveBeenCalledWith("authorization.roles.create");
    expect(permissionRepository.save).toHaveBeenCalledWith({
      key: "authorization.roles.create",
      name: "Create roles",
      description: "Allows creating roles",
    });
  });

  it("rejects create when the permission key already exists", async () => {
    const permissionRepository = {
      existsByKey: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const service = createService(permissionRepository);

    await expect(
      service.createPermission({
        key: "authorization.roles.create",
        name: "Create roles",
      }),
    ).rejects.toBeInstanceOf(PermissionKeyConflictError);
    expect(permissionRepository.save).not.toHaveBeenCalled();
  });

  it("returns a permission by key", async () => {
    const permissionRepository = {
      findByKey: vi.fn().mockResolvedValue(permission),
    };

    const service = createService(permissionRepository);

    await expect(service.getPermissionByKey("authorization.roles.create")).resolves.toEqual(
      permission,
    );
    expect(permissionRepository.findByKey).toHaveBeenCalledWith("authorization.roles.create");
  });

  it("throws when permission key is missing", async () => {
    const permissionRepository = {
      findByKey: vi.fn().mockResolvedValue(null),
    };

    const service = createService(permissionRepository);

    await expect(service.getPermissionByKey("missing")).rejects.toBeInstanceOf(
      PermissionNotFoundError,
    );
  });

  it("lists permissions", async () => {
    const permissionRepository = {
      findAll: vi.fn().mockResolvedValue([permission]),
    };

    const service = createService(permissionRepository);

    await expect(service.getPermissions()).resolves.toEqual([permission]);
  });

  it("updates a permission", async () => {
    const updated = { ...permission, name: "Create role", version: 2 };
    const permissionRepository = {
      findByKey: vi.fn().mockResolvedValue(permission),
      update: vi.fn().mockResolvedValue(updated),
    };

    const service = createService(permissionRepository);

    await expect(
      service.updatePermission("authorization.roles.create", {
        name: "Create role",
        description: "Allows creating roles",
      }),
    ).resolves.toEqual(updated);

    expect(permissionRepository.update).toHaveBeenCalledWith("authorization.roles.create", {
      name: "Create role",
      description: "Allows creating roles",
    });
  });

  it("throws when updating a missing permission", async () => {
    const permissionRepository = {
      findByKey: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };

    const service = createService(permissionRepository);

    await expect(
      service.updatePermission("missing", { name: "X" }),
    ).rejects.toBeInstanceOf(PermissionNotFoundError);
    expect(permissionRepository.update).not.toHaveBeenCalled();
  });
});
