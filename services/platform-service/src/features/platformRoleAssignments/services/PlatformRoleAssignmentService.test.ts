import {
  InsufficientPermissionError,
  PLATFORM_ROLES,
} from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import {
  PlatformRoleAssignmentConflictError,
  PlatformRoleAssignmentNotFoundError,
} from "@/features/platformRoleAssignments/errors";
import type { IPlatformRoleAssignmentRepository } from "@/features/platformRoleAssignments/repositories";
import { PlatformRoleAssignmentService } from "@/features/platformRoleAssignments/services/PlatformRoleAssignmentService";
import { PlatformRoleNotFoundError } from "@/features/platformRoles/errors";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";

const role = {
  id: PLATFORM_ROLES.PLATFORM_ADMIN.id,
  key: PLATFORM_ROLES.PLATFORM_ADMIN.key,
  name: PLATFORM_ROLES.PLATFORM_ADMIN.name,
  description: PLATFORM_ROLES.PLATFORM_ADMIN.description,
  isSystem: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const assignment = {
  id: "assignment-1",
  platformRoleId: role.id,
  identityId: "identity-1",
  assignedBy: "user-1",
  assignedAt: new Date("2026-01-02T00:00:00.000Z"),
  expiresAt: null,
  reason: "bootstrap",
  version: 1,
  createdAt: new Date("2026-01-02T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
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

const emptyRoleRepo = (): IPlatformRoleRepository => ({
  save: vi.fn(),
  update: vi.fn(),
  findById: vi.fn(),
  findByKey: vi.fn(),
  existsByKey: vi.fn(),
  existsByName: vi.fn(),
  findAll: vi.fn(),
  softDelete: vi.fn(),
});

const emptyAssignmentRepo = (): IPlatformRoleAssignmentRepository => ({
  save: vi.fn(),
  update: vi.fn(),
  findById: vi.fn(),
  findByRoleAndIdentity: vi.fn(),
  findMany: vi.fn(),
  softDelete: vi.fn(),
});

const createOutbox = () => ({
  schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
  claimBatch: vi.fn(),
  complete: vi.fn(),
  failed: vi.fn(),
  get: vi.fn(),
  getByEventId: vi.fn(),
});

const createDb = () => ({
  transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn({})),
});

const createService = (deps: {
  platformRoleAssignmentRepository: IPlatformRoleAssignmentRepository;
  platformRoleRepository: IPlatformRoleRepository;
  authorizationClient?: ReturnType<typeof allowAuth>;
  outboxService?: ReturnType<typeof createOutbox>;
  db?: ReturnType<typeof createDb>;
}) =>
  new PlatformRoleAssignmentService(
    deps.platformRoleAssignmentRepository,
    deps.platformRoleRepository,
    deps.authorizationClient ?? allowAuth(),
    (deps.outboxService ?? createOutbox()) as never,
    (deps.db ?? createDb()) as never,
  );

describe("PlatformRoleAssignmentService", () => {
  it("creates an assignment when role exists and pair is unique", async () => {
    const platformRoleRepository = emptyRoleRepo();
    platformRoleRepository.findById = vi.fn().mockResolvedValue(role);

    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    platformRoleAssignmentRepository.findByRoleAndIdentity = vi
      .fn()
      .mockResolvedValue(null);
    platformRoleAssignmentRepository.save = vi.fn().mockResolvedValue(assignment);
    const outboxService = createOutbox();

    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository,
      outboxService,
    });

    await expect(
      service.createPlatformRoleAssignment(
        {
          platformRoleId: role.id,
          identityId: assignment.identityId,
          reason: "bootstrap",
        },
        userId,
      ),
    ).resolves.toEqual(assignment);

    expect(platformRoleAssignmentRepository.save).toHaveBeenCalledWith(
      {
        platformRoleId: role.id,
        identityId: assignment.identityId,
        assignedBy: userId,
        expiresAt: undefined,
        reason: "bootstrap",
      },
      { tx: {} },
    );
    expect(outboxService.schedule).toHaveBeenCalledTimes(2);
  });

  it("rejects create when platform role is missing", async () => {
    const platformRoleRepository = emptyRoleRepo();
    platformRoleRepository.findById = vi.fn().mockResolvedValue(null);

    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository,
    });

    await expect(
      service.createPlatformRoleAssignment(
        { platformRoleId: "missing", identityId: assignment.identityId },
        userId,
      ),
    ).rejects.toBeInstanceOf(PlatformRoleNotFoundError);
    expect(platformRoleAssignmentRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when assignment already exists", async () => {
    const platformRoleRepository = emptyRoleRepo();
    platformRoleRepository.findById = vi.fn().mockResolvedValue(role);

    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    platformRoleAssignmentRepository.findByRoleAndIdentity = vi
      .fn()
      .mockResolvedValue(assignment);

    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository,
    });

    await expect(
      service.createPlatformRoleAssignment(
        { platformRoleId: role.id, identityId: assignment.identityId },
        userId,
      ),
    ).rejects.toBeInstanceOf(PlatformRoleAssignmentConflictError);
  });

  it("lists assignments", async () => {
    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    platformRoleAssignmentRepository.findMany = vi.fn().mockResolvedValue([assignment]);

    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository: emptyRoleRepo(),
    });

    await expect(
      service.listPlatformRoleAssignments({ identityId: assignment.identityId }, userId),
    ).resolves.toEqual([assignment]);
  });

  it("rejects list when user lacks read capability", async () => {
    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository: emptyRoleRepo(),
      authorizationClient: denyAuth(),
    });

    await expect(
      service.listPlatformRoleAssignments({}, userId),
    ).rejects.toBeInstanceOf(InsufficientPermissionError);
    expect(platformRoleAssignmentRepository.findMany).not.toHaveBeenCalled();
  });

  it("updates an assignment", async () => {
    const updated = { ...assignment, reason: "updated" };
    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    platformRoleAssignmentRepository.findById = vi.fn().mockResolvedValue(assignment);
    platformRoleAssignmentRepository.update = vi.fn().mockResolvedValue(updated);

    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository: emptyRoleRepo(),
    });

    await expect(
      service.updatePlatformRoleAssignment(assignment.id, { reason: "updated" }, userId),
    ).resolves.toEqual(updated);
  });

  it("rejects update when assignment is missing", async () => {
    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    platformRoleAssignmentRepository.findById = vi.fn().mockResolvedValue(null);

    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository: emptyRoleRepo(),
    });

    await expect(
      service.updatePlatformRoleAssignment("missing", { reason: "x" }, userId),
    ).rejects.toBeInstanceOf(PlatformRoleAssignmentNotFoundError);
  });

  it("deletes an assignment and schedules graph sync", async () => {
    const platformRoleAssignmentRepository = emptyAssignmentRepo();
    platformRoleAssignmentRepository.findById = vi.fn().mockResolvedValue(assignment);
    platformRoleAssignmentRepository.softDelete = vi.fn().mockResolvedValue(true);
    const outboxService = createOutbox();

    const service = createService({
      platformRoleAssignmentRepository,
      platformRoleRepository: emptyRoleRepo(),
      outboxService,
    });

    await expect(
      service.deletePlatformRoleAssignment(assignment.id, userId),
    ).resolves.toBeUndefined();
    expect(platformRoleAssignmentRepository.softDelete).toHaveBeenCalledWith(assignment.id, {
      tx: {},
    });
    expect(outboxService.schedule).toHaveBeenCalledTimes(1);
  });
});
