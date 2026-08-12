import { InsufficientPermissionError, ORGANIZATION_ROLES } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import { OrganizationNotFoundError } from "@/features/organizations/errors";
import type { IOrganizationRepository } from "@/features/organizations/repositories";
import { OrganizationRoleNotFoundError } from "@/features/organizationRoles/errors";
import type { IOrganizationRoleRepository } from "@/features/organizationRoles/repositories";
import { OrganizationRoleService } from "@/features/organizationRoles/services/OrganizationRoleService";

const organization = {
  id: "org-1",
  tenantId: "tenant-1",
  parentOrganizationId: null,
  name: "Acme Corp",
  slug: "acme",
  description: null,
  isActive: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
};

const ownerRole = {
  id: "role-owner",
  key: ORGANIZATION_ROLES.ORGANIZATION_OWNER.key,
  name: ORGANIZATION_ROLES.ORGANIZATION_OWNER.name,
  description: ORGANIZATION_ROLES.ORGANIZATION_OWNER.description,
  isSystem: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
  organizationId: "org-1",
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
  organizationRoleRepository: IOrganizationRoleRepository;
  organizationRepository?: IOrganizationRepository;
  capabilityRepository?: ICapabilityRepository;
  authorizationClient?: ReturnType<typeof allowAuth>;
}) =>
  new OrganizationRoleService(
    deps.organizationRoleRepository,
    deps.organizationRepository ??
      ({
        findById: vi.fn().mockResolvedValue(organization),
      } as never),
    deps.capabilityRepository ?? emptyCapabilityRepository(),
    deps.authorizationClient ?? allowAuth(),
  );

describe("OrganizationRoleService", () => {
  it("lists organization roles for an organization", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      findByOrganizationId: vi.fn().mockResolvedValue([ownerRole]),
      save: vi.fn(),
      findById: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
      seedSystemRoles: vi.fn(),
    };
    const authorizationClient = allowAuth();

    const service = createService({ organizationRoleRepository, authorizationClient });

    await expect(service.listOrganizationRoles("org-1", userId)).resolves.toEqual([ownerRole]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      object: { type: "capability", id: "organization:organization:read" },
      relation: "has",
      subject: { type: "user", id: userId },
    });
    expect(organizationRoleRepository.findByOrganizationId).toHaveBeenCalledWith("org-1");
    expect(organizationRoleRepository.seedSystemRoles).not.toHaveBeenCalled();
  });

  it("seeds system roles when an organization has none yet", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      findByOrganizationId: vi.fn().mockResolvedValue([]),
      seedSystemRoles: vi.fn().mockResolvedValue([ownerRole]),
      save: vi.fn(),
      findById: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
    };

    const service = createService({ organizationRoleRepository });

    await expect(service.listOrganizationRoles("org-1", userId)).resolves.toEqual([ownerRole]);
    expect(organizationRoleRepository.seedSystemRoles).toHaveBeenCalledWith("org-1");
  });

  it("rejects list when the organization is missing", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      findByOrganizationId: vi.fn(),
      save: vi.fn(),
      findById: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
      seedSystemRoles: vi.fn(),
    };
    const organizationRepository = {
      findById: vi.fn().mockResolvedValue(null),
    } as never;

    const service = createService({ organizationRoleRepository, organizationRepository });

    await expect(service.listOrganizationRoles("missing", userId)).rejects.toBeInstanceOf(
      OrganizationNotFoundError,
    );
    expect(organizationRoleRepository.findByOrganizationId).not.toHaveBeenCalled();
  });

  it("rejects list when the caller lacks permission", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      findByOrganizationId: vi.fn(),
      save: vi.fn(),
      findById: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
      seedSystemRoles: vi.fn(),
    };

    const service = createService({
      organizationRoleRepository,
      authorizationClient: denyAuth(),
    });

    await expect(service.listOrganizationRoles("org-1", userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(organizationRoleRepository.findByOrganizationId).not.toHaveBeenCalled();
  });

  it("gets an organization role by id", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      findById: vi.fn().mockResolvedValue(ownerRole),
      findByOrganizationId: vi.fn(),
      save: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
      seedSystemRoles: vi.fn(),
    };

    const service = createService({ organizationRoleRepository });

    await expect(service.getOrganizationRoleById(ownerRole.id, userId)).resolves.toEqual(
      ownerRole,
    );
  });

  it("rejects get when role is missing", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findByOrganizationId: vi.fn(),
      save: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
      seedSystemRoles: vi.fn(),
    };

    const service = createService({ organizationRoleRepository });

    await expect(service.getOrganizationRoleById("missing", userId)).rejects.toBeInstanceOf(
      OrganizationRoleNotFoundError,
    );
  });

  it("seeds system roles via the repository", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      seedSystemRoles: vi.fn().mockResolvedValue([ownerRole]),
      findById: vi.fn(),
      findByOrganizationId: vi.fn(),
      save: vi.fn(),
      findByOrganizationIdAndKey: vi.fn(),
      existsByKeyInOrganization: vi.fn(),
    };

    const service = createService({ organizationRoleRepository });

    await expect(service.seedSystemRoles("org-1")).resolves.toEqual([ownerRole]);
    expect(organizationRoleRepository.seedSystemRoles).toHaveBeenCalledWith("org-1", undefined);
  });
});
