import { ADMIN, PLATFORM_OBJECT_ID } from "@pine/authorization";
import { describe, expect, it, vi } from "vitest";
import { PlatformMemberService } from "@/features/platform/services/PlatformMemberService";

const identityId = "user-1";
const actorId = "actor-1";

const allowAuth = () => ({
  checkRelationship: vi.fn().mockResolvedValue(true),
  ensureRelationship: vi.fn().mockResolvedValue(undefined),
  deleteRelationship: vi.fn().mockResolvedValue(undefined),
  listRelationships: vi.fn().mockResolvedValue([]),
});

describe("PlatformMemberService", () => {
  it("writes the platform admin relation", async () => {
    const authorizationClient = allowAuth();
    const service = new PlatformMemberService(authorizationClient);

    const member = await service.create(
      {
        relation: ADMIN,
        identityId,
      },
      actorId,
    );

    expect(authorizationClient.ensureRelationship).toHaveBeenCalledWith({
      object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
      relation: ADMIN,
      subject: { namespace: "identity", id: identityId },
    });
    expect(member.relation).toBe(ADMIN);
    expect(member.identityId).toBe(identityId);
  });
});
