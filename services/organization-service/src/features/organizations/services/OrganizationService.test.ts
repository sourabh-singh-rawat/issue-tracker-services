import { InsufficientPermissionError } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import {
  OrganizationNameConflictError,
  OrganizationNotFoundError,
  OrganizationSlugConflictError,
} from "@/features/organizations/errors";
import { OrganizationService } from "@/features/organizations/services/OrganizationService";

const organization = {
  id: "org-1",
  name: "Acme Corp",
  slug: "acme",
  description: "Primary organization",
  isActive: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const userId = "user-1";

const createService = (deps: {
  organizationRepository?: unknown;
  authorizationClient?: unknown;
}) =>
  new OrganizationService(
    (deps.organizationRepository ?? {}) as never,
    (deps.authorizationClient ?? {
      checkRelationship: vi.fn().mockResolvedValue(true),
    }) as never,
  );

describe("OrganizationService", () => {
  it("lists organizations", async () => {
    const organizationRepository = {
      findAll: vi.fn().mockResolvedValue([organization]),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(service.listOrganizations(userId)).resolves.toEqual([organization]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "organization:organization:read" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(organizationRepository.findAll).toHaveBeenCalledOnce();
  });

  it("rejects list when user lacks read capability", async () => {
    const organizationRepository = {
      findAll: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(service.listOrganizations(userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(organizationRepository.findAll).not.toHaveBeenCalled();
  });

  it("creates an organization when slug and name are unique", async () => {
    const organizationRepository = {
      existsBySlug: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(organization),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(
      service.createOrganization(
        {
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
    expect(organizationRepository.existsBySlug).toHaveBeenCalledWith("acme");
    expect(organizationRepository.existsByName).toHaveBeenCalledWith("Acme Corp");
    expect(organizationRepository.save).toHaveBeenCalledWith({
      name: "Acme Corp",
      slug: "acme",
      description: "Primary organization",
      isActive: undefined,
    });
  });

  it("rejects create when user lacks create capability", async () => {
    const organizationRepository = {
      existsBySlug: vi.fn(),
      existsByName: vi.fn(),
      save: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(
      service.createOrganization({ name: "Acme Corp", slug: "acme" }, userId),
    ).rejects.toBeInstanceOf(InsufficientPermissionError);

    expect(organizationRepository.existsBySlug).not.toHaveBeenCalled();
    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when slug already exists", async () => {
    const organizationRepository = {
      existsBySlug: vi.fn().mockResolvedValue(true),
      existsByName: vi.fn(),
      save: vi.fn(),
    };

    const service = createService({ organizationRepository });

    await expect(
      service.createOrganization({ name: "Acme Corp", slug: "acme" }, userId),
    ).rejects.toBeInstanceOf(OrganizationSlugConflictError);

    expect(organizationRepository.existsByName).not.toHaveBeenCalled();
    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("rejects create when name already exists", async () => {
    const organizationRepository = {
      existsBySlug: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const service = createService({ organizationRepository });

    await expect(
      service.createOrganization({ name: "Acme Corp", slug: "acme" }, userId),
    ).rejects.toBeInstanceOf(OrganizationNameConflictError);

    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("soft-deletes an organization", async () => {
    const organizationRepository = {
      softDelete: vi.fn().mockResolvedValue(true),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(true),
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

  it("rejects delete when user lacks delete capability", async () => {
    const organizationRepository = {
      softDelete: vi.fn(),
    };
    const authorizationClient = {
      checkRelationship: vi.fn().mockResolvedValue(false),
    };

    const service = createService({ organizationRepository, authorizationClient });

    await expect(service.deleteOrganization("org-1", userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(organizationRepository.softDelete).not.toHaveBeenCalled();
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
