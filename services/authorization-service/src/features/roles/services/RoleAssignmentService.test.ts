import { describe, expect, it, vi } from "vitest";
import { RoleNotFoundError } from "@/features/roles/errors";
import { RoleAssignmentService } from "@/features/roles/services/RoleAssignmentService";

const role = {
  id: "role-1",
  key: "system.administrator",
  name: "System Administrator",
  description: null,
  isSystem: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const assignment = {
  id: "ra-1",
  roleId: "role-1",
  identityType: "user",
  identityId: "identity-1",
  assignedBy: null,
  assignedAt: new Date("2026-01-02T00:00:00.000Z"),
  expiresAt: null,
  revokedAt: null,
  reason: null,
};

const createService = (deps: {
  db?: unknown;
  roleAssignmentRepository?: unknown;
  roleRepository?: unknown;
  outboxService?: unknown;
}) =>
  new RoleAssignmentService(
    (deps.db ?? {
      transaction: async (fn: (tx: unknown) => Promise<unknown>) => fn({}),
    }) as never,
    (deps.roleAssignmentRepository ?? {}) as never,
    (deps.roleRepository ?? {}) as never,
    (deps.outboxService ?? { schedule: vi.fn() }) as never,
  );

describe("RoleAssignmentService", () => {
  it("assigns a role and schedules RoleAssignmentCreated when newly created", async () => {
    const roleRepository = {
      findById: vi.fn().mockResolvedValue(role),
    };
    const roleAssignmentRepository = {
      ensure: vi.fn().mockResolvedValue({ assignment, created: true }),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };

    const service = createService({
      roleRepository,
      roleAssignmentRepository,
      outboxService,
    });

    const result = await service.assignRole({
      identityType: "user",
      identityId: "identity-1",
      roleId: "role-1",
    });

    expect(result).toEqual(assignment);
    expect(roleRepository.findById).toHaveBeenCalledWith("role-1");
    expect(roleAssignmentRepository.ensure).toHaveBeenCalledWith(
      {
        roleId: "role-1",
        identityType: "user",
        identityId: "identity-1",
        assignedBy: undefined,
        expiresAt: undefined,
        reason: undefined,
      },
      { tx: {} },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: "authorization.role-assignment.created",
        eventVersion: 1,
        aggregateType: "role_assignment",
        aggregateId: assignment.id,
        payload: expect.objectContaining({
          type: "authorization.role-assignment.created",
          source: "pine/authorization-service",
          subject: assignment.id,
          data: {
            id: assignment.id,
            roleId: assignment.roleId,
            identityType: assignment.identityType,
            identityId: assignment.identityId,
            assignedBy: assignment.assignedBy,
            assignedAt: assignment.assignedAt.toISOString(),
            expiresAt: null,
            revokedAt: null,
            reason: assignment.reason,
          },
        }),
      }),
      { tx: {} },
    );
  });

  it("does not schedule an outbox event when the assignment already exists", async () => {
    const roleRepository = {
      findById: vi.fn().mockResolvedValue(role),
    };
    const roleAssignmentRepository = {
      ensure: vi.fn().mockResolvedValue({ assignment, created: false }),
    };
    const outboxService = {
      schedule: vi.fn(),
    };

    const service = createService({
      roleRepository,
      roleAssignmentRepository,
      outboxService,
    });

    const result = await service.assignRole({
      identityType: "user",
      identityId: "identity-1",
      roleId: "role-1",
    });

    expect(result).toEqual(assignment);
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("throws when the role does not exist", async () => {
    const roleRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };
    const roleAssignmentRepository = {
      ensure: vi.fn(),
    };
    const outboxService = {
      schedule: vi.fn(),
    };

    const service = createService({
      roleRepository,
      roleAssignmentRepository,
      outboxService,
    });

    await expect(
      service.assignRole({
        identityType: "user",
        identityId: "identity-1",
        roleId: "missing",
      }),
    ).rejects.toBeInstanceOf(RoleNotFoundError);
    expect(roleAssignmentRepository.ensure).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("returns the assignment when present", async () => {
    const roleAssignmentRepository = {
      findByIdentityAndRole: vi.fn().mockResolvedValue(assignment),
    };

    const service = createService({ roleAssignmentRepository });

    const result = await service.getAssignment("user", "identity-1", "role-1");

    expect(result).toEqual(assignment);
    expect(roleAssignmentRepository.findByIdentityAndRole).toHaveBeenCalledWith(
      "user",
      "identity-1",
      "role-1",
    );
  });
});
