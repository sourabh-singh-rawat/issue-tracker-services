import {
  ALL_ORGANIZATION_ROLES,
  InsufficientPermissionError,
  ORGANIZATION_ROLES,
} from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import { OrganizationNotFoundError } from "@/features/organizations/errors";
import type { IOrganizationRepository } from "@/features/organizations/repositories";
import { OrganizationRoleNotFoundError } from "@/features/organizationRoles/errors";
import type { IOrganizationRoleRepository } from "@/features/organizationRoles/repositories";
import { OrganizationRoleService } from "@/features/organizationRoles/services/OrganizationRoleService";
import { organizationSystemRoles, toOrganizationSystemRole } from "@/features/roles/systemRoles";

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

const customRole = {
  id: "role-custom",
  key: "organization.reviewer",
  name: "Reviewer",
  description: "Reviews organization work",
  isSystem: false,
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

const emptyRepository = (): IOrganizationRoleRepository => ({
  findByOrganizationId: vi.fn().mockResolvedValue([]),
  save: vi.fn(),
  findById: vi.fn(),
  findByOrganizationIdAndKey: vi.fn(),
  existsByKeyInOrganization: vi.fn(),
});

const createService = (deps: {
  organizationRoleRepository: IOrganizationRoleRepository;
  organizationRepository?: IOrganizationRepository;
  authorizationClient?: ReturnType<typeof allowAuth>;
}) =>
  new OrganizationRoleService(
    deps.organizationRoleRepository,
    deps.organizationRepository ?? {
      save: vi.fn(),
      update: vi.fn(),
      findById: vi.fn().mockResolvedValue(organization),
      existsBySlugInTenant: vi.fn(),
      existsByNameInTenant: vi.fn(),
      findMany: vi.fn(),
      softDelete: vi.fn(),
    },
    deps.authorizationClient ?? allowAuth(),
  );

describe("OrganizationRoleService", () => {
  it("lists catalog system roles plus custom stored roles", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      ...emptyRepository(),
      findByOrganizationId: vi.fn().mockResolvedValue([customRole]),
    };
    const authorizationClient = allowAuth();

    const service = createService({ organizationRoleRepository, authorizationClient });

    await expect(service.listOrganizationRoles("org-1", userId)).resolves.toEqual([
      ...organizationSystemRoles("org-1"),
      customRole,
    ]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalledWith({
      namespace: "organization",
      object: "org-1",
      relation: "read",
      subject: `identity:${userId}`,
    });
    expect(organizationRoleRepository.findByOrganizationId).toHaveBeenCalledWith("org-1");
  });

  it("rejects list when the organization is missing", async () => {
    const organizationRoleRepository = emptyRepository();
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
    const organizationRoleRepository = emptyRepository();

    const service = createService({
      organizationRoleRepository,
      authorizationClient: denyAuth(),
    });

    await expect(service.listOrganizationRoles("org-1", userId)).rejects.toBeInstanceOf(
      InsufficientPermissionError,
    );
    expect(organizationRoleRepository.findByOrganizationId).not.toHaveBeenCalled();
  });

  it("gets a catalog organization role by id", async () => {
    const organizationRoleRepository = emptyRepository();
    const service = createService({ organizationRoleRepository });

    await expect(
      service.getOrganizationRoleById(ORGANIZATION_ROLES.ORGANIZATION_OWNER.id, userId),
    ).resolves.toEqual(
      toOrganizationSystemRole(ALL_ORGANIZATION_ROLES[0], ""),
    );
    expect(organizationRoleRepository.findById).not.toHaveBeenCalled();
  });

  it("gets a custom organization role by id", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      ...emptyRepository(),
      findById: vi.fn().mockResolvedValue(customRole),
    };

    const service = createService({ organizationRoleRepository });

    await expect(service.getOrganizationRoleById(customRole.id, userId)).resolves.toEqual(
      customRole,
    );
  });

  it("rejects get when role is missing", async () => {
    const organizationRoleRepository: IOrganizationRoleRepository = {
      ...emptyRepository(),
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = createService({ organizationRoleRepository });

    await expect(service.getOrganizationRoleById("missing", userId)).rejects.toBeInstanceOf(
      OrganizationRoleNotFoundError,
    );
  });
});
