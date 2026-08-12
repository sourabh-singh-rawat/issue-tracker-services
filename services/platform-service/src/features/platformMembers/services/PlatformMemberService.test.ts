import {
  InsufficientPermissionError,
  PLATFORM_ROLES,
} from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import {
  PlatformMemberConflictError,
  PlatformMemberNotFoundError,
} from "@/features/platformMembers/errors";
import type { IPlatformMemberRepository } from "@/features/platformMembers/repositories";
import { PlatformMemberService } from "@/features/platformMembers/services/PlatformMemberService";
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

const emptyAssignmentRepo = (): IPlatformMemberRepository => ({
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
  platformMemberRepository: IPlatformMemberRepository;
  platformRoleRepository: IPlatformRoleRepository;
  authorizationClient?: ReturnType<typeof allowAuth>;
  outboxService?: ReturnType<typeof createOutbox>;
  db?: ReturnType<typeof createDb>;
}) =>
  new PlatformMemberService(
    deps.platformMemberRepository,
    deps.platformRoleRepository,
    deps.authorizationClient ?? allowAuth(),
    (deps.outboxService ?? createOutbox()) as never,
    (deps.db ?? createDb()) as never,
  );

describe("PlatformMemberService", () => {
  it("creates an assignment when role exists and pair is unique", async () => {
    const platformRoleRepository = emptyRoleRepo();
    platformRoleRepository.findById = vi.fn().mockResolvedValue(role);

    const platformMemberRepository = emptyAssignmentRepo();
    platformMemberRepository.findByRoleAndIdentity = vi
      .fn()
      .mockResolvedValue(null);
    platformMemberRepository.save = vi.fn().mockResolvedValue(assignment);
    const outboxService = createOutbox();

    const service = createService({
      platformMemberRepository,
      platformRoleRepository,
      outboxService,
    });

    await expect(
      service.createPlatformMember(
        {
          platformRoleId: role.id,
          identityId: assignment.identityId,
          reason: "bootstrap",
        },
        userId,
      ),
    ).resolves.toEqual(assignment);

    expect(platformMemberRepository.save).toHaveBeenCalledWith(
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

    const platformMemberRepository = emptyAssignmentRepo();
    const service = createService({
      platformMemberRepository,
      platformRoleRepository,
    });

    await expect(
      service.createPlatformMember(
        { platformRoleId: "missing", identityId: assignment.identityId },
        userId,
      ),
    ).rejects.toBeInstanceOf(PlatformRoleNotFoundError);
    expect(platformMemberRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when assignment already exists", async () => {
    const platformRoleRepository = emptyRoleRepo();
    platformRoleRepository.findById = vi.fn().mockResolvedValue(role);

    const platformMemberRepository = emptyAssignmentRepo();
    platformMemberRepository.findByRoleAndIdentity = vi
      .fn()
      .mockResolvedValue(assignment);

    const service = createService({
      platformMemberRepository,
      platformRoleRepository,
    });

    await expect(
      service.createPlatformMember(
        { platformRoleId: role.id, identityId: assignment.identityId },
        userId,
      ),
    ).rejects.toBeInstanceOf(PlatformMemberConflictError);
  });

  it("lists assignments", async () => {
    const platformMemberRepository = emptyAssignmentRepo();
    platformMemberRepository.findMany = vi.fn().mockResolvedValue([assignment]);

    const service = createService({
      platformMemberRepository,
      platformRoleRepository: emptyRoleRepo(),
    });

    await expect(
      service.listPlatformMembers({ identityId: assignment.identityId }, userId),
    ).resolves.toEqual([assignment]);
  });

  it("rejects list when user lacks read capability", async () => {
    const platformMemberRepository = emptyAssignmentRepo();
    const service = createService({
      platformMemberRepository,
      platformRoleRepository: emptyRoleRepo(),
      authorizationClient: denyAuth(),
    });

    await expect(
      service.listPlatformMembers({}, userId),
    ).rejects.toBeInstanceOf(InsufficientPermissionError);
    expect(platformMemberRepository.findMany).not.toHaveBeenCalled();
  });

  it("updates an assignment", async () => {
    const updated = { ...assignment, reason: "updated" };
    const platformMemberRepository = emptyAssignmentRepo();
    platformMemberRepository.findById = vi.fn().mockResolvedValue(assignment);
    platformMemberRepository.update = vi.fn().mockResolvedValue(updated);

    const service = createService({
      platformMemberRepository,
      platformRoleRepository: emptyRoleRepo(),
    });

    await expect(
      service.updatePlatformMember(assignment.id, { reason: "updated" }, userId),
    ).resolves.toEqual(updated);
  });

  it("rejects update when assignment is missing", async () => {
    const platformMemberRepository = emptyAssignmentRepo();
    platformMemberRepository.findById = vi.fn().mockResolvedValue(null);

    const service = createService({
      platformMemberRepository,
      platformRoleRepository: emptyRoleRepo(),
    });

    await expect(
      service.updatePlatformMember("missing", { reason: "x" }, userId),
    ).rejects.toBeInstanceOf(PlatformMemberNotFoundError);
  });

  it("deletes an assignment and schedules graph sync", async () => {
    const platformMemberRepository = emptyAssignmentRepo();
    platformMemberRepository.findById = vi.fn().mockResolvedValue(assignment);
    platformMemberRepository.softDelete = vi.fn().mockResolvedValue(true);
    const outboxService = createOutbox();

    const service = createService({
      platformMemberRepository,
      platformRoleRepository: emptyRoleRepo(),
      outboxService,
    });

    await expect(
      service.deletePlatformMember(assignment.id, userId),
    ).resolves.toBeUndefined();
    expect(platformMemberRepository.softDelete).toHaveBeenCalledWith(assignment.id, {
      tx: {},
    });
    expect(outboxService.schedule).toHaveBeenCalledTimes(1);
  });
});
