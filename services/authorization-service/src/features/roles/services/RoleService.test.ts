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

const createService = (deps: {
  db?: unknown;
  roleRepository?: unknown;
  roleCapabilityRepository?: unknown;
  capabilityRepository?: unknown;
  outboxService?: unknown;
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

    const service = createService({
      roleRepository,
      roleCapabilityRepository,
      capabilityRepository,
    });

    const result = await service.createRole({
      key: "custom.admin",
      name: "Admin",
      description: "Full access",
      capabilityKeys: ["authorization:capability:read"],
    });

    expect(result).toEqual(role);
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

  it("throws when role key already exists", async () => {
    const service = createService({
      roleRepository: {
        existsByKey: vi.fn().mockResolvedValue(true),
        existsByName: vi.fn(),
        save: vi.fn(),
      },
    });

    await expect(service.createRole({ key: "custom.admin", name: "Admin" })).rejects.toBeInstanceOf(
      RoleKeyConflictError,
    );
  });

  it("throws when role name already exists", async () => {
    const service = createService({
      roleRepository: {
        existsByKey: vi.fn().mockResolvedValue(false),
        existsByName: vi.fn().mockResolvedValue(true),
        save: vi.fn(),
      },
    });

    await expect(service.createRole({ key: "custom.admin", name: "Admin" })).rejects.toBeInstanceOf(
      RoleNameConflictError,
    );
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
      service.createRole({
        key: "custom.admin",
        name: "Admin",
        capabilityKeys: ["missing:capability:key"],
      }),
    ).rejects.toBeInstanceOf(CapabilityNotFoundError);
  });

  it("returns roles from the repository", async () => {
    const roleRepository = {
      findAll: vi.fn().mockResolvedValue([role]),
    };
    const service = createService({ roleRepository });

    await expect(service.getRoles()).resolves.toEqual([role]);
  });

  it("throws when updating a missing role", async () => {
    const service = createService({
      roleRepository: {
        findById: vi.fn().mockResolvedValue(null),
      },
    });

    await expect(service.updateRole("missing", { name: "x" })).rejects.toBeInstanceOf(
      RoleNotFoundError,
    );
  });
});
