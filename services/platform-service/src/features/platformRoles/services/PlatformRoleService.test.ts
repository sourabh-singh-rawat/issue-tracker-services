import { InsufficientPermissionError, PLATFORM_ROLES } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
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

const emptyCapabilityRepository = (): ICapabilityRepository => ({
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  existsByKey: vi.fn(),
  findByKey: vi.fn(),
  findByKeys: vi.fn().mockResolvedValue([]),
  findAll: vi.fn(),
});

const createService = (deps: {
  platformRoleRepository: IPlatformRoleRepository;
  capabilityRepository?: ICapabilityRepository;
  authorizationClient?: ReturnType<typeof allowAuth>;
}) =>
  new PlatformRoleService(
    deps.platformRoleRepository,
    deps.capabilityRepository ?? emptyCapabilityRepository(),
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

    await expect(service.listPlatformRoles(userId)).resolves.toEqual([role]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "platform:platform_role:read" },
      relation: "has",
      subject: { type: "user", id: userId },
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

    await expect(service.listPlatformRoles(userId)).rejects.toBeInstanceOf(
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
      service.createPlatformRole({ key: role.key, name: role.name }, userId),
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
      service.createPlatformRole({ key: role.key, name: role.name }, userId),
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

    await expect(service.getPlatformRoleById(role.id, userId)).resolves.toEqual(role);
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

    await expect(service.getPlatformRoleById("missing", userId)).rejects.toBeInstanceOf(
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
      service.updatePlatformRole(role.id, { name: "Updated Operator" }, userId),
    ).resolves.toEqual(updated);
  });

  it("rejects update of system platform roles", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn().mockResolvedValue(systemRole),
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
      service.updatePlatformRole(systemRole.id, { name: "Nope" }, userId),
    ).rejects.toBeInstanceOf(PlatformRoleSystemProtectedError);
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

    await expect(service.deletePlatformRole(role.id, userId)).resolves.toBeUndefined();
    expect(platformRoleRepository.softDelete).toHaveBeenCalledWith(role.id);
  });

  it("rejects delete of system platform roles", async () => {
    const platformRoleRepository: IPlatformRoleRepository = {
      findById: vi.fn().mockResolvedValue(systemRole),
      softDelete: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      findByKey: vi.fn(),
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
    };
    const service = createService({ platformRoleRepository });

    await expect(service.deletePlatformRole(systemRole.id, userId)).rejects.toBeInstanceOf(
      PlatformRoleSystemProtectedError,
    );
    expect(platformRoleRepository.softDelete).not.toHaveBeenCalled();
  });

  it("returns ordered catalog capabilities for a system platform role", async () => {
    const keys = [...PLATFORM_ROLES.PLATFORM_ADMIN.capabilityKeys];
    const catalog = keys.map((key, index) => {
      const [service, resource, action] = key.split(":");
      return {
        id: `cap-${index}`,
        key,
        service: service ?? "",
        resource: resource ?? "",
        action: action ?? "",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: null,
      };
    });
    const capabilityRepository: ICapabilityRepository = {
      ...emptyCapabilityRepository(),
      findByKeys: vi.fn().mockResolvedValue([...catalog].reverse()),
    };
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
      capabilityRepository,
    });

    await expect(service.getCapabilitiesForPlatformRole(systemRole)).resolves.toEqual(catalog);
    expect(capabilityRepository.findByKeys).toHaveBeenCalledWith(keys);
  });

  it("returns no capabilities for custom platform roles without a definition", async () => {
    const capabilityRepository = emptyCapabilityRepository();
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
      capabilityRepository,
    });

    await expect(service.getCapabilitiesForPlatformRole(role)).resolves.toEqual([]);
    expect(capabilityRepository.findByKeys).not.toHaveBeenCalled();
  });
});
