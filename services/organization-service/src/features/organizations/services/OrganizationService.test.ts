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

describe("OrganizationService", () => {
  it("lists organizations", async () => {
    const organizationRepository = {
      findAll: vi.fn().mockResolvedValue([organization]),
    };

    const service = new OrganizationService(organizationRepository as never);

    await expect(service.listOrganizations()).resolves.toEqual([organization]);
    expect(organizationRepository.findAll).toHaveBeenCalledOnce();
  });

  it("creates an organization when slug and name are unique", async () => {
    const organizationRepository = {
      existsBySlug: vi.fn().mockResolvedValue(false),
      existsByName: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(organization),
    };

    const service = new OrganizationService(organizationRepository as never);

    await expect(
      service.createOrganization({
        name: "Acme Corp",
        slug: "acme",
        description: "Primary organization",
      }),
    ).resolves.toEqual(organization);

    expect(organizationRepository.existsBySlug).toHaveBeenCalledWith("acme");
    expect(organizationRepository.existsByName).toHaveBeenCalledWith("Acme Corp");
    expect(organizationRepository.save).toHaveBeenCalledWith({
      name: "Acme Corp",
      slug: "acme",
      description: "Primary organization",
      isActive: undefined,
    });
  });

  it("rejects create when slug already exists", async () => {
    const organizationRepository = {
      existsBySlug: vi.fn().mockResolvedValue(true),
      existsByName: vi.fn(),
      save: vi.fn(),
    };

    const service = new OrganizationService(organizationRepository as never);

    await expect(
      service.createOrganization({ name: "Acme Corp", slug: "acme" }),
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

    const service = new OrganizationService(organizationRepository as never);

    await expect(
      service.createOrganization({ name: "Acme Corp", slug: "acme" }),
    ).rejects.toBeInstanceOf(OrganizationNameConflictError);

    expect(organizationRepository.save).not.toHaveBeenCalled();
  });

  it("soft-deletes an organization", async () => {
    const organizationRepository = {
      softDelete: vi.fn().mockResolvedValue(true),
    };

    const service = new OrganizationService(organizationRepository as never);

    await expect(service.deleteOrganization("org-1")).resolves.toBeUndefined();
    expect(organizationRepository.softDelete).toHaveBeenCalledWith("org-1");
  });

  it("throws OrganizationNotFoundError when deleting a missing organization", async () => {
    const organizationRepository = {
      softDelete: vi.fn().mockResolvedValue(false),
    };

    const service = new OrganizationService(organizationRepository as never);

    await expect(service.deleteOrganization("missing")).rejects.toBeInstanceOf(
      OrganizationNotFoundError,
    );
  });
});
