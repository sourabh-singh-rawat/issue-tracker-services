import { UserNotFoundError, UserProfileNotFoundError } from "@pine/common";
import { describe, it, expect, vi } from "vitest";
import {
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
} from "@/integrations/identity";
import { AdminService } from "./AdminService";

function createDbMock() {
  return {
    transaction: vi.fn(async (cb: (tx: unknown) => Promise<void>) => {
      await cb({ tx: true });
    }),
  };
}

describe("AdminService", () => {
  it("deletes the IdP identity, soft-deletes profile and user in a transaction", async () => {
    const tx = { tx: true };
    const db = {
      transaction: vi.fn(async (cb: (tx: unknown) => Promise<void>) => {
        await cb(tx);
      }),
    };
    const userRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        email: "a@b.com",
        idpId: "identity-1",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const userProfileRepository = {
      findByUserId: vi.fn().mockResolvedValue({ id: "profile-1", userId: "user-1" }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteUser("user-1")).resolves.toBeUndefined();

    expect(userRepository.findById).toHaveBeenCalledWith("user-1");
    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("identity-1");
    expect(db.transaction).toHaveBeenCalledOnce();
    expect(userProfileRepository.findByUserId).toHaveBeenCalledWith("user-1");
    expect(userProfileRepository.softDelete).toHaveBeenCalledWith("profile-1", { tx });
    expect(userRepository.softDelete).toHaveBeenCalledWith("user-1", { tx });
  });

  it("throws UserProfileNotFoundError when no profile exists", async () => {
    const db = createDbMock();
    const userRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        email: "a@b.com",
        idpId: "identity-1",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const userProfileRepository = {
      findByUserId: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteUser("user-1")).rejects.toBeInstanceOf(UserProfileNotFoundError);

    expect(userProfileRepository.softDelete).not.toHaveBeenCalled();
    expect(userRepository.softDelete).not.toHaveBeenCalled();
    expect(db.transaction).not.toHaveBeenCalled();
  });

  it("throws IdentityNotFoundError when the user has no idpId", async () => {
    const db = createDbMock();
    const userRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        email: "a@b.com",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const userProfileRepository = {
      findByUserId: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteUser("user-1")).rejects.toBeInstanceOf(IdentityNotFoundError);

    expect(identityProvider.deleteIdentity).not.toHaveBeenCalled();
    expect(userRepository.softDelete).not.toHaveBeenCalled();
  });

  it("propagates IdentityNotFoundError from the IdP and does not soft-delete locally", async () => {
    const db = createDbMock();
    const userRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        email: "a@b.com",
        idpId: "identity-1",
      }),
      softDelete: vi.fn().mockResolvedValue(undefined),
    };
    const userProfileRepository = {
      findByUserId: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockRejectedValue(new IdentityNotFoundError()),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteUser("user-1")).rejects.toBeInstanceOf(IdentityNotFoundError);

    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("identity-1");
    expect(userRepository.softDelete).not.toHaveBeenCalled();
    expect(db.transaction).not.toHaveBeenCalled();
  });

  it("throws UserNotFoundError when the user does not exist", async () => {
    const db = createDbMock();
    const userRepository = {
      findById: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const userProfileRepository = {
      findByUserId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteUser("missing")).rejects.toBeInstanceOf(UserNotFoundError);

    expect(identityProvider.deleteIdentity).not.toHaveBeenCalled();
    expect(db.transaction).not.toHaveBeenCalled();
    expect(userRepository.softDelete).not.toHaveBeenCalled();
  });

  it("propagates IdP unavailability and does not soft-delete locally", async () => {
    const db = createDbMock();
    const userRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "user-1",
        email: "a@b.com",
        idpId: "identity-1",
      }),
      softDelete: vi.fn(),
    };
    const userProfileRepository = {
      findByUserId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      db as never,
    );

    await expect(service.deleteUser("user-1")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );

    expect(db.transaction).not.toHaveBeenCalled();
    expect(userProfileRepository.softDelete).not.toHaveBeenCalled();
    expect(userRepository.softDelete).not.toHaveBeenCalled();
  });

  it("returns all users from the repository", async () => {
    const users = [
      { id: "user-1", email: "a@b.com" },
      { id: "user-2", email: "c@d.com" },
    ];
    const userRepository = {
      findAll: vi.fn().mockResolvedValue(users),
    };
    const userProfileRepository = {
      findByUserId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      userRepository as never,
      userProfileRepository as never,
      identityProvider as never,
      createDbMock() as never,
    );

    await expect(service.findUsers()).resolves.toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalledOnce();
  });
});
