import {
  InsufficientPermissionError,
  PLATFORM_ROLES,
  parsePermission,
} from "@pine/authorization";
import { platformSystemRoles } from "@/features/roles/systemRoles";
import { describe, expect, it, vi } from "vitest";
import {
  PlatformRoleKeyConflictError,
  PlatformRoleNameConflictError,
  PlatformRoleNotFoundError,
  PlatformRoleSystemProtectedError,
} from "@/features/platformRoles/errors";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";
import { PlatformRoleService } from "@/features/platformRoles/services/PlatformRoleService";

const role = {
  id: "role-1",
  key: "platform.operator",
  name: "Platform Operator",
  description: "Operates the platform",
  isSystem: false,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const systemRole = {
  ...role,
  id: PLATFORM_ROLES.PLATFORM_ADMIN.id,
  key: PLATFORM_ROLES.PLATFORM_ADMIN.key,
  name: PLATFORM_ROLES.PLATFORM_ADMIN.name,
  isSystem: true,
};

const userId = "user-1";
const platformId = "platform-1";

const allowAuth = () => ({
  checkRelationship: vi.fn().mockResolvedValue(true),
  ensureRelationship: vi.fn().mockResolvedValue(undefined),
  deleteRelationship: vi.fn().mockResolvedValue(undefined),
});

const denyAuth = () => ({
  checkRelationship: vi.fn().mockResolvedValue(false),
  ensureRelationship: vi.fn().mockResolvedValue(undefined),
  deleteRelationship: vi.fn().mockResolvedValue(undefined),
});

const createService = (deps: {
  platformRoleRepository: IPlatformRoleRepository;
  authorizationClient?: ReturnType<typeof allowAuth>;
}) =>
  new PlatformRoleService(
    deps.platformRoleRepository,
    deps.authorizationClient ?? allowAuth(),
  );

describe("PlatformRoleService", () => {
  it("lists platform roles", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findAll: vi.fn().mockResolvedValue([role]),
      save: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
      softDelete: vi.fn(),
    };
    const authorizationClient = allowAuth();
    const service = createService({ platformRoleRepository, authorizationClient });

    await expect(service.listPlatformRoles(platformId, userId)).resolves.toEqual([
      ...platformSystemRoles(),
      role,
    ]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      namespace: "platform",
      object: platformId,
      relation: "read",
      subject: `identity:${userId}`,
    });
  });

  it("rejects list when user lacks read capability", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({
      platformRoleRepository,
      authorizationClient: denyAuth(),
    });

    await expect(service.listPlatformRoles(platformId, userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(platformRoleRepository.findAll).not.toHaveBeenCalled();
  });

  it("creates a platform role when key and name are unique", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      existsByKey: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(role),
      findAll: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByKey: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(
      service.createPlatformRole(
        {
          platformId,
          key: role.key,
          name: role.name,
          description: role.description,
        },
        userId,
      ),
    ).resolves.toEqual(role);
    expect(platformRoleRepository.save).toHaveBeenCalledWith({
      key: role.key,
      name: role.name,
      description: role.description,
    });
  });

  it("rejects create when key already exists", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      existsByKey: vi.fn().mockResolvedValue(true),
      existsByName: vi.fn(),
      save: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByKey: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(
      service.createPlatformRole({ platformId, key: role.key, name: role.name }, userId),
    ).rejects.toBeInstanceOf(PlatformRoleKeyConflictError);
    expect(platformRoleRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when name already exists", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      existsByKey: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByKey: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(
      service.createPlatformRole({ platformId, key: role.key, name: role.name }, userId),
    ).rejects.toBeInstanceOf(PlatformRoleNameConflictError);
  });

  it("gets a platform role by id", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn().mockResolvedValue(role),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(service.getPlatformRoleById(role.id, platformId, userId)).resolves.toEqual(role);
  });

  it("rejects get when role is missing", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(service.getPlatformRoleById("missing", platformId, userId)).rejects.toBeInstanceOf(
      PlatformRoleNotFoundError,
    );
  });

  it("updates a platform role", async () => {
    const updated = { ...role, name: "Updated Operator" };
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn().mockResolvedValue(role),
      existsByName: vi.fn().mockResolvedValue(false),
      update: vi.fn().mockResolvedValue(updated),
      findAll: vi.fn(),
      save: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(
      service.updatePlatformRole(role.id, { name: "Updated Operator" }, platformId, userId),
    ).resolves.toEqual(updated);
  });

  it("rejects update of system platform roles", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn(),
      existsByName: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      softDelete: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(
      service.updatePlatformRole(
        PLATFORM_ROLES.PLATFORM_ADMIN.id,
        { name: "Nope" },
        platformId,
        userId,
      ),
    ).rejects.toBeInstanceOf(PlatformRoleSystemProtectedError);
    expect(platformRoleRepository.findById).not.toHaveBeenCalled();
    expect(platformRoleRepository.update).not.toHaveBeenCalled();
  });

  it("deletes a platform role", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn().mockResolvedValue(role),
      softDelete: vi.fn().mockResolvedValue(true),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(service.deletePlatformRole(role.id, platformId, userId)).resolves.toBeUndefined();
    expect(platformRoleRepository.softDelete).toHaveBeenCalledWith(role.id);
  });

  it("rejects delete of system platform roles", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn(),
      softDelete: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(
      service.deletePlatformRole(PLATFORM_ROLES.PLATFORM_ADMIN.id, platformId, userId),
    ).rejects.toBeInstanceOf(PlatformRoleSystemProtectedError);
    expect(platformRoleRepository.findById).not.toHaveBeenCalled();
    expect(platformRoleRepository.softDelete).not.toHaveBeenCalled();
  });

  it("returns system role definition permissions for a platform admin role", () => {
    const service = createService({
      platformRoleRepository: {
        findAll: vi.fn(),
        save: vi.fn(),
        update: vi.fn(),
        findById: vi.fn(),
        findByKey: vi.fn(),
        existsByKey: vi.fn(),
        existsByName: vi.fn(),
        softDelete: vi.fn(),
      },
    });

    expect(service.getPermissionsForPlatformRole(systemRole)).toEqual(
      PLATFORM_ROLES.PLATFORM_ADMIN.permissionKeys.map((key) => {
        const parsed = parsePermission(key);
        return {
          key,
          namespace: parsed.namespace,
          permission: parsed.permission,
        };
      }),
    );
  });

  it("returns no permissions for custom platform roles without a definition", () => {
    const service = createService({
      platformRoleRepository: {
        findAll: vi.fn(),
        save: vi.fn(),
        update: vi.fn(),
        findById: vi.fn(),
        findByKey: vi.fn(),
        existsByKey: vi.fn(),
        existsByName: vi.fn(),
        softDelete: vi.fn(),
      },
    });

    expect(service.getPermissionsForPlatformRole(role)).toEqual([]);
  });
});
