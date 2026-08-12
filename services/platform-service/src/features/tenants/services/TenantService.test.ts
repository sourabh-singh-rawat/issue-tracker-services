import { InsufficientPermissionError } from "@pine/authorization";
import { TenantCreatedEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import {
  TenantNameConflictError,
  TenantNotFoundError,
  TenantSlugConflictError,
} from "@/features/tenants/errors";
import { TenantService } from "@/features/tenants/services/TenantService";

const tenant = {
  id: "org-1",
  name: "Acme Corp",
  slug: "acme",
  description: "Primary tenant",
  isActive: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const userId = "user-1";

const createDbMock = (tx: unknown = { tx: true }) => ({
  transaction: vi.fn(async (cb: (tx: unknown) => Promise<unknown>) => cb(tx)),
});

const createService = (deps: {
  tenantRepository?: unknown;
  authorizationClient?: unknown;
  outboxService?: unknown;
  db?: unknown;
}) =>
  new TenantService(
    (deps.tenantRepository ?? {}) as never,
    (deps.authorizationClient ?? {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    }) as never,
    (deps.outboxService ?? {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    }) as never,
    (deps.db ?? createDbMock()) as never,
  );

describe("TenantService", () => {
  it("lists tenants", async () => {
    const tenantRepository = {
      findAll: vi.fn().mockResolvedValue([tenant]),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ tenantRepository, authorizationClient });

    await expect(service.listTenants(userId)).resolves.toEqual([tenant]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "platform:tenant:read" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(tenantRepository.findAll).toHaveBeenCalledOnce();
  });

  it("rejects list when user lacks read capability", async () => {
    const tenantRepository = {
      findAll: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ tenantRepository, authorizationClient });

    await expect(service.listTenants(userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(tenantRepository.findAll).not.toHaveBeenCalled();
  });

  it("creates a tenant and schedules TenantCreated in the outbox", async () => {
    const tx = { tx: true };
    const db = createDbMock(tx);
    const tenantRepository = {
      existsBySlug: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(tenant),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };

    const service = createService({
      tenantRepository,
      authorizationClient,
      outboxService,
      db,
    });

    await expect(
      service.createTenant(
        {
          name: "Acme Corp",
          slug: "acme",
          description: "Primary tenant",
        },
        userId,
      ),
    ).resolves.toEqual(tenant);

    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "platform:tenant:create" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(tenantRepository.existsBySlug).toHaveBeenCalledWith("acme");
    expect(tenantRepository.existsByName).toHaveBeenCalledWith("Acme Corp");
    expect(db.transaction).toHaveBeenCalledOnce();
    expect(tenantRepository.save).toHaveBeenCalledWith(
      {
        name: "Acme Corp",
        slug: "acme",
        description: "Primary tenant",
        isActive: undefined,
      },
      { tx },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: TenantCreatedEvent.type,
        eventVersion: TenantCreatedEvent.version,
        aggregateType: "tenant",
        aggregateId: tenant.id,
        payload: expect.objectContaining({
          type: TenantCreatedEvent.type,
          source: "pine/platform-service",
          subject: tenant.id,
          data: {
            id: tenant.id,
            name: tenant.name,
            slug: tenant.slug,
            isActive: tenant.isActive,
            version: tenant.version,
            createdAt: tenant.createdAt.toISOString(),
            description: tenant.description,
          },
        }),
      }),
      { tx },
    );
  });

  it("rejects create when user lacks create capability", async () => {
    const tenantRepository = {
      existsBySlug: vi.fn(),
      existsByName: vi.fn(),
      save: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };
    const outboxService = {
      schedule: vi.fn(),
    };

    const service = createService({
      tenantRepository,
      authorizationClient,
      outboxService,
    });

    await expect(
      service.createTenant({ name: "Acme Corp", slug: "acme" }, userId),
    ).rejects.toBeInstanceOf(InsufficientPermissionError);

    expect(tenantRepository.existsBySlug).not.toHaveBeenCalled();
    expect(tenantRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("rejects create when slug already exists", async () => {
    const tenantRepository = {
      existsBySlug: vi.fn().mockResolvedValue(true),
      existsByName: vi.fn(),
      save: vi.fn(),
    };
    const outboxService = {
      schedule: vi.fn(),
    };

    const service = createService({ tenantRepository, outboxService });

    await expect(
      service.createTenant({ name: "Acme Corp", slug: "acme" }, userId),
    ).rejects.toBeInstanceOf(TenantSlugConflictError);

    expect(tenantRepository.existsByName).not.toHaveBeenCalled();
    expect(tenantRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("rejects create when name already exists", async () => {
    const tenantRepository = {
      existsBySlug: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };
    const outboxService = {
      schedule: vi.fn(),
    };

    const service = createService({ tenantRepository, outboxService });

    await expect(
      service.createTenant({ name: "Acme Corp", slug: "acme" }, userId),
    ).rejects.toBeInstanceOf(TenantNameConflictError);

    expect(tenantRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("soft-deletes an tenant", async () => {
    const tenantRepository = {
      softDelete: vi.fn().mockResolvedValue(true),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ tenantRepository, authorizationClient });

    await expect(service.deleteTenant("org-1", userId)).resolves.toBeUndefined();
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "platform:tenant:suspend" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(tenantRepository.softDelete).toHaveBeenCalledWith("org-1");
  });

  it("rejects delete when user lacks delete capability", async () => {
    const tenantRepository = {
      softDelete: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ tenantRepository, authorizationClient });

    await expect(service.deleteTenant("org-1", userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(tenantRepository.softDelete).not.toHaveBeenCalled();
  });

  it("throws TenantNotFoundError when deleting a missing tenant", async () => {
    const tenantRepository = {
      softDelete: vi.fn().mockResolvedValue(false),
    };

    const service = createService({ tenantRepository });

    await expect(service.deleteTenant("missing", userId)).rejects.toBeInstanceOf(
      TenantNotFoundError,
    );
  });
});
