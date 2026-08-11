import { InsufficientPermissionError } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import { CapabilityNotFoundError } from "@/features/capabilities/errors";
import {
  RoleKeyConflictError,
  RoleNameConflictError,
  RoleNotFoundError,
} from "@/features/roles/errors";
import { RoleService } from "@/features/roles/services/RoleService";

const role = {
  id: "role-1",
  key: "custom.admin",
  name: "Admin",
  description: "Full access",
  isSystem: false,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const userId = "user-1";

const createService = (deps: {
  db?: unknown;
  roleRepository?: unknown;
  roleCapabilityRepository?: unknown;
  capabilityRepository?: unknown;
  outboxService?: unknown;
  authorizationClient?: unknown;
}) =>
  new RoleService(
    (deps.db ?? {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn({})),
    }) as never,
    (deps.roleRepository ?? {}) as never,
    (deps.roleCapabilityRepository ?? {
      saveMany: vi.fn(),
      syncForRole: vi.fn(),
    }) as never,
    (deps.capabilityRepository ?? { findByKeys: vi.fn().mockResolvedValue([]) }) as never,
    (deps.outboxService ?? { schedule: vi.fn().mockResolvedValue(undefined) }) as never,
    (deps.authorizationClient ?? {
      checkRelationship: vi.fn().mockResolvedValue(true),
    }) as never,
  );

describe("RoleService", () => {
  it("creates a role when key and name are unique", async () => {
    const roleRepository = {
      existsByKey: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(role),
    };
    const roleCapabilityRepository = {
      saveMany: vi.fn().mockResolvedValue([]),
    };
    const capabilityRepository = {
      findByKeys: vi
        .fn()
        .mockResolvedValue([{ id: "cap-1", key: "authorization:capability:read" }]),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
    };

    const service = createService({
      roleRepository,
      roleCapabilityRepository,
      capabilityRepository,
      authorizationClient,
    });

    const result = await service.createRole(
      {
        key: "custom.admin",
        name: "Admin",
        description: "Full access",
        capabilityKeys: ["authorization:capability:read"],
      },
      userId,
    );

    expect(result).toEqual(role);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "authorization:role:create" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(roleRepository.save).toHaveBeenCalledWith(
      {
        key: "custom.admin",
        name: "Admin",
        description: "Full access",
      },
      { tx: {} },
    );
    expect(roleCapabilityRepository.saveMany).toHaveBeenCalledWith(
      [
        {
          roleId: role.id,
          capabilityId: "cap-1",
        },
      ],
      { tx: {} },
    );
  });

  it("throws when the caller lacks create role capability", async () => {
    const roleRepository = {
      existsByKey: vi.fn(),
      existsByName: vi.fn(),
      save: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };

    const service = createService({
      roleRepository,
      authorizationClient,
    });

    await expect(
      service.createRole({ key: "custom.admin", name: "Admin" }, userId),
    ).rejects.toBeInstanceOf(InsufficientPermissionError);
    expect(roleRepository.existsByKey).not.toHaveBeenCalled();
    expect(roleRepository.save).not.toHaveBeenCalled();
  });

  it("throws when role key already exists", async () => {
    const service = createService({
      roleRepository: {
        existsByKey: vi.fn().mockResolvedValue(true),
        existsByName: vi.fn(),
        save: vi.fn(),
      },
    });

    await expect(
      service.createRole({ key: "custom.admin", name: "Admin" }, userId),
    ).rejects.toBeInstanceOf(RoleKeyConflictError);
  });

  it("throws when role name already exists", async () => {
    const service = createService({
      roleRepository: {
        existsByKey: vi.fn().mockResolvedValue(false),
        existsByName: vi.fn().mockResolvedValue(true),
        save: vi.fn(),
      },
    });

    await expect(
      service.createRole({ key: "custom.admin", name: "Admin" }, userId),
    ).rejects.toBeInstanceOf(RoleNameConflictError);
  });

  it("throws when a capability key is missing", async () => {
    const service = createService({
      roleRepository: {
        existsByKey: vi.fn().mockResolvedValue(false),
        existsByName: vi.fn().mockResolvedValue(false),
        save: vi.fn(),
      },
      capabilityRepository: {
        findByKeys: vi.fn().mockResolvedValue([]),
      },
    });

    await expect(
      service.createRole(
        {
          key: "custom.admin",
          name: "Admin",
          capabilityKeys: ["missing:capability:key"],
        },
        userId,
      ),
    ).rejects.toBeInstanceOf(CapabilityNotFoundError);
  });

  it("returns a role by id when the caller has read capability", async () => {
    const roleRepository = {
      findById: vi.fn().mockResolvedValue(role),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
    };
    const service = createService({ roleRepository, authorizationClient });

    await expect(service.getRoleById(role.id, userId)).resolves.toEqual(role);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "authorization:role:read" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
  });

  it("throws when the caller lacks read role capability for getRoleById", async () => {
    const roleRepository = {
      findById: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };
    const service = createService({ roleRepository, authorizationClient });

    await expect(service.getRoleById(role.id, userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(roleRepository.findById).not.toHaveBeenCalled();
  });

  it("throws when getRoleById cannot find the role", async () => {
    const service = createService({
      roleRepository: {
        findById: vi.fn().mockResolvedValue(null),
      },
    });

    await expect(service.getRoleById("missing", userId)).rejects.toBeInstanceOf(RoleNotFoundError);
  });

  it("returns roles from the repository when the caller has read capability", async () => {
    const roleRepository = {
      findAll: vi.fn().mockResolvedValue([role]),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
    };
    const service = createService({ roleRepository, authorizationClient });

    await expect(service.getRoles(userId)).resolves.toEqual([role]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "authorization:role:read" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
  });

  it("throws when the caller lacks read role capability", async () => {
    const roleRepository = {
      findAll: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };
    const service = createService({ roleRepository, authorizationClient });

    await expect(service.getRoles(userId)).rejects.toBeInstanceOf(InsufficientPermissionError);
    expect(roleRepository.findAll).not.toHaveBeenCalled();
  });

  it("updates a role when the caller has update capability", async () => {
    const updated = { ...role, name: "Updated Admin" };
    const roleRepository = {
      findById: vi.fn().mockResolvedValue(role),
      existsByName: vi.fn().mockResolvedValue(false),
      update: vi.fn().mockResolvedValue(updated),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
    };
    const service = createService({ roleRepository, authorizationClient });

    await expect(service.updateRole(role.id, { name: "Updated Admin" }, userId)).resolves.toEqual(
      updated,
    );
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "authorization:role:update" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
  });

  it("throws when the caller lacks update role capability", async () => {
    const roleRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };
    const service = createService({ roleRepository, authorizationClient });

    await expect(service.updateRole(role.id, { name: "x" }, userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(roleRepository.findById).not.toHaveBeenCalled();
    expect(roleRepository.update).not.toHaveBeenCalled();
  });

  it("throws when updating a missing role", async () => {
    const service = createService({
      roleRepository: {
        findById: vi.fn().mockResolvedValue(null),
      },
    });

    await expect(service.updateRole("missing", { name: "x" }, userId)).rejects.toBeInstanceOf(
      RoleNotFoundError,
    );
  });
});
