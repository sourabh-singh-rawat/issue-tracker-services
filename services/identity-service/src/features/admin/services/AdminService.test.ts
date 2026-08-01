import { UserNotFoundError, UserProfileNotFoundError } from "@pine/common";
import { describe, it, expect, vi } from "vitest";
import { IdentityNotFoundError, IdentityProviderUnavailableError } from "@/integrations/identity";
import { AdminService } from "./AdminService";

function createDbMock() {
  return {
    transaction: vi.fn(async (cb: (tx: unknown) => Promise<void>) => {
      await cb({ tx: true });
    }),
  };
}

describe("AdminService", () => {
  it("deletes the IdP identity, soft-deletes profile and identity in a transaction", async () => {
    const tx = { tx: true };
    const db = {
      transaction: vi.fn(async (cb: (tx: unknown) => Promise<void>) => {
        await cb(tx);
      }),
    };
    const identityRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "identity-row-1",
        idpId: "idp-1",
        idpProvider: "kratos",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const identityProfileRepository = {
      findByIdentityId: vi
        .fn()
        .mockResolvedValue({ id: "profile-1", identityId: "identity-row-1" }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).resolves.toBeUndefined();

    expect(identityRepository.findById).toHaveBeenCalledWith("identity-row-1");
    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
    expect(db.transaction).toHaveBeenCalledOnce();
    expect(identityProfileRepository.findByIdentityId).toHaveBeenCalledWith("identity-row-1");
    expect(identityProfileRepository.softDelete).toHaveBeenCalledWith("profile-1", { tx });
    expect(identityRepository.softDelete).toHaveBeenCalledWith("identity-row-1", { tx });
  });

  it("throws UserProfileNotFoundError when no profile exists", async () => {
    const db = createDbMock();
    const identityRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "identity-row-1",
        idpId: "idp-1",
        idpProvider: "kratos",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const identityProfileRepository = {
      findByIdentityId: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).rejects.toBeInstanceOf(
      UserProfileNotFoundError,
    );

    expect(identityProfileRepository.softDelete).not.toHaveBeenCalled();
    expect(identityRepository.softDelete).not.toHaveBeenCalled();
    expect(db.transaction).not.toHaveBeenCalled();
  });

  it("propagates IdentityNotFoundError from the IdP and does not soft-delete locally", async () => {
    const db = createDbMock();
    const identityRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "identity-row-1",
        idpId: "idp-1",
        idpProvider: "kratos",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const identityProfileRepository = {
      findByIdentityId: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockRejectedValue(new IdentityNotFoundError()),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).rejects.toBeInstanceOf(
      IdentityNotFoundError,
    );

    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
    expect(identityRepository.softDelete).not.toHaveBeenCalled();
    expect(db.transaction).not.toHaveBeenCalled();
  });

  it("throws UserNotFoundError when the identity does not exist", async () => {
    const db = createDbMock();
    const identityRepository = {
      findById: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityProfileRepository = {
      findByIdentityId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteIdentity("missing")).rejects.toBeInstanceOf(UserNotFoundError);

    expect(identityProvider.deleteIdentity).not.toHaveBeenCalled();
    expect(db.transaction).not.toHaveBeenCalled();
    expect(identityRepository.softDelete).not.toHaveBeenCalled();
  });

  it("propagates IdP unavailability and does not soft-delete locally", async () => {
    const db = createDbMock();
    const identityRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "identity-row-1",
        idpId: "idp-1",
        idpProvider: "kratos",
      }),
      softDelete: vi.fn(),
    };
    const identityProfileRepository = {
      findByIdentityId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );

    expect(db.transaction).not.toHaveBeenCalled();
    expect(identityProfileRepository.softDelete).not.toHaveBeenCalled();
    expect(identityRepository.softDelete).not.toHaveBeenCalled();
  });

  it("returns all identities from the repository", async () => {
    const identities = [
      { id: "identity-row-1", idpId: "idp-1", idpProvider: "kratos" },
      { id: "identity-row-2", idpId: "idp-2", idpProvider: "kratos" },
    ];
    const identityRepository = {
      findAll: vi.fn().mockResolvedValue(identities),
    };
    const identityProfileRepository = {
      findByIdentityId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityProvider as never,
      createDbMock() as never,
    );

    await expect(service.findIdentities()).resolves.toEqual(identities);
    expect(identityRepository.findAll).toHaveBeenCalledOnce();
  });
});
