import { describe, expect, it, vi } from "vitest";
import { AuthorizationService } from "@/features/authorization/services/AuthorizationService";

describe("AuthorizationService", () => {
  it("delegates relationship checks to the authorization graph provider", async () => {
    const authorizationGraphProvider = {
      checkPermission: vi.fn().mockResolvedValue(true),
    };
    const service = new AuthorizationService(authorizationGraphProvider as never);

    const relationship = {
      object: { type: "tenant", id: "tenant-1" },
      relation: "member",
      subject: { type: "user", id: "user-1" },
    };

    await expect(service.hasRelationship(relationship)).resolves.toBe(true);
    expect(authorizationGraphProvider.checkPermission).toHaveBeenCalledWith(
      relationship.object,
      relationship.relation,
      relationship.subject,
    );
  });
});
