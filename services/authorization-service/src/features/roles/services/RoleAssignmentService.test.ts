import { describe, expect, it, vi } from "vitest";
import { RoleNotFoundError } from "@/features/roles/errors";
import { RoleAssignmentService } from "@/features/roles/services/RoleAssignmentService";

const role = {
  id: "role-1",
  key: "system.administrator",
  name: "System Administrator",
  description: null,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const assignment = {
  id: "ra-1",
  roleId: "role-1",
  subjectType: "user",
  subjectId: "identity-1",
  scopeType: null,
  scopeId: null,
  createdAt: new Date("2026-01-02T00:00:00.000Z"),
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
      subjectType: "user",
      subjectId: "identity-1",
      roleId: "role-1",
    });

    expect(result).toEqual(assignment);
    expect(roleRepository.findById).toHaveBeenCalledWith("role-1");
    expect(roleAssignmentRepository.ensure).toHaveBeenCalledWith(
      {
        roleId: "role-1",
        subjectType: "user",
        subjectId: "identity-1",
        scopeType: undefined,
        scopeId: undefined,
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
            subjectType: assignment.subjectType,
            subjectId: assignment.subjectId,
            scopeType: assignment.scopeType,
            scopeId: assignment.scopeId,
            createdAt: assignment.createdAt.toISOString(),
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
      subjectType: "user",
      subjectId: "identity-1",
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
        subjectType: "user",
        subjectId: "identity-1",
        roleId: "missing",
      }),
    ).rejects.toBeInstanceOf(RoleNotFoundError);
    expect(roleAssignmentRepository.ensure).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("returns the assignment when present", async () => {
    const roleAssignmentRepository = {
      findBySubjectAndRole: vi.fn().mockResolvedValue(assignment),
    };

    const service = createService({ roleAssignmentRepository });

    const result = await service.getAssignment("user", "identity-1", "role-1");

    expect(result).toEqual(assignment);
    expect(roleAssignmentRepository.findBySubjectAndRole).toHaveBeenCalledWith(
      "user",
      "identity-1",
      "role-1",
      undefined,
    );
  });
});
