import { InsufficientPermissionError } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import {
  InvalidParentOrganizationError,
  OrganizationNameConflictError,
  OrganizationNotFoundError,
  OrganizationSlugConflictError,
} from "@/features/organizations/errors";
import { OrganizationService } from "@/features/organizations/services/OrganizationService";
import { TenantNotFoundError } from "@/features/tenants/errors";

const tenant = {
  id: "tenant-1",
  name: "Acme Tenant",
  slug: "acme-tenant",
  description: null,
  isActive: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const organization = {
  id: "org-1",
  tenantId: "tenant-1",
  parentOrganizationId: null,
  name: "Acme Corp",
  slug: "acme",
  description: "Primary organization",
  isActive: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const childOrganization = {
  ...organization,
  id: "org-2",
  parentOrganizationId: "org-1",
  name: "Acme Division",
  slug: "acme-division",
};

const userId = "user-1";

const createService = (deps: {
  organizationRepository?: unknown;
  tenantRepository?: unknown;
  authorizationClient?: unknown;
}) =>
  new OrganizationService(
    (deps.organizationRepository ?? {}) as never,
    (deps.tenantRepository ?? {
      findById: vi.fn().mockResolvedValue(tenant),
    }) as never,
    (deps.authorizationClient ?? {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    }) as never,
  );

describe("OrganizationService", () => {
  it("lists organizations for a tenant", async () => {
    const organizationRepository = {
      findMany: vi.fn().mockResolvedValue([organization]),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(
      service.listOrganizations({ tenantId: "tenant-1" }, userId),
    ).resolves.toEqual([organization]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "organization:organization:read" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(organizationRepository.findMany).toHaveBeenCalledWith({
      tenantId: "tenant-1",
      parentOrganizationId: undefined,
    });
  });

  it("rejects list when the caller lacks permission", async () => {
    const organizationRepository = {
      findMany: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(
      service.listOrganizations({ tenantId: "tenant-1" }, userId),
    ).rejects.toBeInstanceOf(InsufficientPermissionError);
    expect(organizationRepository.findMany).not.toHaveBeenCalled();
  });

  it("rejects list when tenant is missing", async () => {
    const organizationRepository = {
      findMany: vi.fn(),
    };
    const tenantRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = createService({ organizationRepository, tenantRepository });

    await expect(
      service.listOrganizations({ tenantId: "missing" }, userId),
    ).rejects.toBeInstanceOf(TenantNotFoundError);
    expect(organizationRepository.findMany).not.toHaveBeenCalled();
  });

  it("creates a root organization when slug and name are unique", async () => {
    const organizationRepository = {
      existsBySlugInTenant: vi.fn().mockResolvedValue(false),
      existsByNameInTenant: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(organization),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(
      service.createOrganization(
        {
          tenantId: "tenant-1",
          name: "Acme Corp",
          slug: "acme",
          description: "Primary organization",
        },
        userId,
      ),
    ).resolves.toEqual(organization);

    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "organization:organization:create" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(organizationRepository.save).toHaveBeenCalledWith({
      tenantId: "tenant-1",
      parentOrganizationId: undefined,
      name: "Acme Corp",
      slug: "acme",
      description: "Primary organization",
      isActive: undefined,
    });
  });

  it("creates a child organization when parent is in the same tenant", async () => {
    const organizationRepository = {
      findById: vi.fn().mockResolvedValue(organization),
      existsBySlugInTenant: vi.fn().mockResolvedValue(false),
      existsByNameInTenant: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(childOrganization),
    };

    const service = createService({ organizationRepository });

    await expect(
      service.createOrganization(
        {
          tenantId: "tenant-1",
          parentOrganizationId: "org-1",
          name: "Acme Division",
          slug: "acme-division",
        },
        userId,
      ),
    ).resolves.toEqual(childOrganization);

    expect(organizationRepository.findById).toHaveBeenCalledWith("org-1");
    expect(organizationRepository.save).toHaveBeenCalledWith({
      tenantId: "tenant-1",
      parentOrganizationId: "org-1",
      name: "Acme Division",
      slug: "acme-division",
      description: undefined,
      isActive: undefined,
    });
  });

  it("rejects create when parent organization is missing or in another tenant", async () => {
    const organizationRepository = {
      findById: vi.fn().mockResolvedValue({ ...organization, tenantId: "other-tenant" }),
      existsBySlugInTenant: vi.fn(),
      save: vi.fn(),
    };

    const service = createService({ organizationRepository });

    await expect(
      service.createOrganization(
        {
          tenantId: "tenant-1",
          parentOrganizationId: "org-1",
          name: "Acme Division",
          slug: "acme-division",
        },
        userId,
      ),
    ).rejects.toBeInstanceOf(InvalidParentOrganizationError);
    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when tenant is missing", async () => {
    const organizationRepository = {
      save: vi.fn(),
    };
    const tenantRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = createService({ organizationRepository, tenantRepository });

    await expect(
      service.createOrganization(
        { tenantId: "missing", name: "Acme Corp", slug: "acme" },
        userId,
      ),
    ).rejects.toBeInstanceOf(TenantNotFoundError);
    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when slug already exists in the tenant", async () => {
    const organizationRepository = {
      existsBySlugInTenant: vi.fn().mockResolvedValue(true),
      existsByNameInTenant: vi.fn(),
      save: vi.fn(),
    };

    const service = createService({ organizationRepository });

    await expect(
      service.createOrganization(
        { tenantId: "tenant-1", name: "Acme Corp", slug: "acme" },
        userId,
      ),
    ).rejects.toBeInstanceOf(OrganizationSlugConflictError);
    expect(organizationRepository.existsByNameInTenant).not.toHaveBeenCalled();
    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when name already exists in the tenant", async () => {
    const organizationRepository = {
      existsBySlugInTenant: vi.fn().mockResolvedValue(false),
      existsByNameInTenant: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const service = createService({ organizationRepository });

    await expect(
      service.createOrganization(
        { tenantId: "tenant-1", name: "Acme Corp", slug: "acme" },
        userId,
      ),
    ).rejects.toBeInstanceOf(OrganizationNameConflictError);
    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("soft-deletes an organization", async () => {
    const organizationRepository = {
      softDelete: vi.fn().mockResolvedValue(true),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
      ensureRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(service.deleteOrganization("org-1", userId)).resolves.toBeUndefined();
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "organization:organization:delete" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(organizationRepository.softDelete).toHaveBeenCalledWith("org-1");
  });

  it("throws OrganizationNotFoundError when deleting a missing organization", async () => {
    const organizationRepository = {
      softDelete: vi.fn().mockResolvedValue(false),
    };

    const service = createService({ organizationRepository });

    await expect(service.deleteOrganization("missing", userId)).rejects.toBeInstanceOf(
      OrganizationNotFoundError,
    );
  });
});
