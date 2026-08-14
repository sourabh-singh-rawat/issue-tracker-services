import { describe, expect, it, vi } from "vitest";
import { AuthorizationService } from "@/features/authorization/services/AuthorizationService";

describe("AuthorizationService", () => {
  it("delegates relationship checks to the authorization graph provider", async () => {
    const authorizationGraphProvider = {
      checkPermission: vi.fn().mockResolvedValue(true),
      listRelationships: vi.fn(),
      createRelationship: vi.fn(),
      deleteRelationship: vi.fn(),
    };
    const service = new AuthorizationService(authorizationGraphProvider);

    const input = {
      namespace: "tenant",
      object: "tenant-1",
      relation: "member",
      subject: "identity:user-1",
    };

    await expect(service.hasRelationship(input)).resolves.toBe(true);
    expect(authorizationGraphProvider.checkPermission).toHaveBeenCalledWith(input);
  });

  it("creates a relationship when none exists", async () => {
    const authorizationGraphProvider = {
      checkPermission: vi.fn(),
      listRelationships: vi.fn().mockResolvedValue([]),
      createRelationship: vi.fn().mockResolvedValue(undefined),
      deleteRelationship: vi.fn(),
    };
    const service = new AuthorizationService(authorizationGraphProvider);

    const relationship = {
      object: { type: "permission", id: "platform:create_tenant" },
      relation: "has",
      subjectSet: { type: "role", id: "role-1", relation: "member" },
    };

    await expect(service.ensureRelationship(relationship)).resolves.toEqual({ created: true });
    expect(authorizationGraphProvider.createRelationship).toHaveBeenCalledWith(relationship);
  });

  it("skips create when relationship already exists", async () => {
    const relationship = {
      object: { type: "role", id: "role-1" },
      relation: "member",
      subject: { type: "identity", id: "user-1" },
    };
    const authorizationGraphProvider = {
      checkPermission: vi.fn(),
      listRelationships: vi.fn().mockResolvedValue([relationship]),
      createRelationship: vi.fn(),
      deleteRelationship: vi.fn(),
    };
    const service = new AuthorizationService(authorizationGraphProvider);

    await expect(service.ensureRelationship(relationship)).resolves.toEqual({ created: false });
    expect(authorizationGraphProvider.createRelationship).not.toHaveBeenCalled();
  });
});
