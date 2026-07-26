import { describe, expect, it, vi } from "vitest";
import { IdentityNotFoundError } from "@/features/me/errors";
import { MeService } from "@/features/me/services/MeService";

describe("MeService", () => {
  it("returns the identity from the repository", async () => {
    const identity = {
      id: "identity-1",
      email: "a@b.com",
      idpId: null,
      idpProvider: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      version: 1,
    };
    const identityRepository = {
      findById: vi.fn().mockResolvedValue(identity),
    };

    const service = new MeService(identityRepository as never);

    await expect(service.getCurrentUser("identity-1")).resolves.toEqual(identity);
    expect(identityRepository.findById).toHaveBeenCalledWith("identity-1");
  });

  it("throws IdentityNotFoundError when the identity does not exist", async () => {
    const identityRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = new MeService(identityRepository as never);

    await expect(service.getCurrentUser("missing")).rejects.toBeInstanceOf(IdentityNotFoundError);
    expect(identityRepository.findById).toHaveBeenCalledWith("missing");
  });
});
