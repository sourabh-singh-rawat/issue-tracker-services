import { ADMIN, MEMBER, OWNER } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import { InvalidOrganizationRelationError } from "@/features/organizations/errors";
import { OrganizationMemberService } from "@/features/organizations/services/OrganizationMemberService";

const organizationId = "org-1";
const identityId = "user-1";
const actorId = "actor-1";

const allowAuth = () => ({
  checkRelationship: vi.fn().mockResolvedValue(true),
  ensureRelationship: vi.fn().mockResolvedValue(undefined),
  deleteRelationship: vi.fn().mockResolvedValue(undefined),
  listRelationships: vi.fn().mockResolvedValue([]),
});

describe("OrganizationMemberService", () => {
  it("lists owner, admin, and member relations", async () => {
    const authorizationClient = allowAuth();
    authorizationClient.listRelationships.mockImplementation(async ({ relation }) => {
      if (relation === OWNER) {
        return [
          {
            object: { namespace: "organization", id: organizationId },
            relation: OWNER,
            subject: { namespace: "identity", id: identityId },
          },
        ];
      }
      if (relation === MEMBER) {
        return [
          {
            object: { namespace: "organization", id: organizationId },
            relation: MEMBER,
            subject: { namespace: "identity", id: "user-2" },
          },
        ];
      }
      return [];
    });
    const service = new OrganizationMemberService(authorizationClient);

    await expect(service.list({ organizationId }, actorId)).resolves.toEqual([
      {
        id: `${organizationId}:${OWNER}:${identityId}`,
        organizationId,
        identityId,
        relation: OWNER,
      },
      {
        id: `${organizationId}:${MEMBER}:user-2`,
        organizationId,
        identityId: "user-2",
        relation: MEMBER,
      },
    ]);
    expect(authorizationClient.checkRelationship).toHaveBeenCalled();
  });

  it("filters by relation", async () => {
    const authorizationClient = allowAuth();
    authorizationClient.listRelationships.mockResolvedValue([
      {
        object: { namespace: "organization", id: organizationId },
        relation: ADMIN,
        subject: { namespace: "identity", id: identityId },
      },
    ]);
    const service = new OrganizationMemberService(authorizationClient);

    await expect(
      service.list({ organizationId, relation: ADMIN }, actorId),
    ).resolves.toEqual([
      {
        id: `${organizationId}:${ADMIN}:${identityId}`,
        organizationId,
        identityId,
        relation: ADMIN,
      },
    ]);
    expect(authorizationClient.listRelationships).toHaveBeenCalledTimes(1);
  });

  it("rejects an invalid relation", async () => {
    const authorizationClient = allowAuth();
    const service = new OrganizationMemberService(authorizationClient);

    await expect(
      service.list({ organizationId, relation: "viewer" }, actorId),
    ).rejects.toBeInstanceOf(InvalidOrganizationRelationError);
  });
});
