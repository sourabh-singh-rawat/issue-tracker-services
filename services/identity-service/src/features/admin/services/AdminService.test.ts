import { UserNotFoundError } from "@pine/common";
import { UserRegisteredEvent } from "@pine/events";
import { describe, it, expect, vi } from "vitest";
import { IdentityProviderType } from "@/features/identities/constants";
import { IdentityNotFoundError, IdentityProviderUnavailableError } from "@/integrations/identity";
import { AdminService } from "./AdminService";

function createDbMock() {
  return {
    transaction: vi.fn(async (cb: (tx: unknown) => Promise<void>) => {
      await cb({ tx: true });
    }),
  };
}

function createOutboxMock() {
  return {
    schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
  };
}

describe("AdminService.createIdentity", () => {
  it("creates via IdP admin API, saves identity and profile, and schedules UserRegistered", async () => {
    const tx = { tx: true };
    const db = {
      transaction: vi.fn(async (cb: (tx: unknown) => Promise<unknown>) => cb(tx)),
    };
    const identityRepository = {
      save: vi.fn().mockResolvedValue({
        id: "identity-1",
        idpId: "idp-1",
        idpProvider: IdentityProviderType.KRATOS,
      }),
    };
    const identityProfileRepository = {
      save: vi.fn().mockResolvedValue({ id: "profile-1", identityId: "identity-1" }),
      findByIdentityId: vi.fn(),
      softDelete: vi.fn(),
    };
    const identityAdminProvider = {
      createIdentity: vi.fn().mockResolvedValue({ id: "idp-1", email: "admin@pine.local" }),
      deleteIdentity: vi.fn(),
    };
    const outboxService = createOutboxMock();

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      outboxService as never,
      db as never,
    );

    const result = await service.createIdentity({
      email: "admin@pine.local",
      username: "admin",
      password: "secret",
      emailVerified: true,
      firstName: "Sourabh",
      lastName: "Rawat",
    });

    expect(result).toEqual({
      id: "identity-1",
      createdAt: undefined,
      updatedAt: undefined,
    });
    expect(identityAdminProvider.createIdentity).toHaveBeenCalledWith({
      email: "admin@pine.local",
      username: "admin",
      password: "secret",
      emailVerified: true,
    });
    expect(identityRepository.save).toHaveBeenCalledWith(
      {
        idpId: "idp-1",
        idpProvider: IdentityProviderType.KRATOS,
      },
      { tx },
    );
    expect(identityProfileRepository.save).toHaveBeenCalledWith(
      {
        identityId: "identity-1",
        firstName: "Sourabh",
        middleName: undefined,
        lastName: "Rawat",
      },
      { tx },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: UserRegisteredEvent.type,
        aggregateId: "identity-1",
      }),
      { tx },
    );
    expect(identityAdminProvider.deleteIdentity).not.toHaveBeenCalled();
  });

  it("rolls back the IdP identity when local persistence fails", async () => {
    const saveError = new Error("database unavailable");
    const db = {
      transaction: vi.fn(async (cb: (tx: unknown) => Promise<unknown>) => cb({ tx: true })),
    };
    const identityRepository = {
      save: vi.fn().mockRejectedValue(saveError),
    };
    const identityAdminProvider = {
      createIdentity: vi.fn().mockResolvedValue({ id: "idp-1", email: "admin@pine.local" }),
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      identityRepository as never,
      { findByIdentityId: vi.fn(), softDelete: vi.fn() } as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
      db as never,
    );

    await expect(
      service.createIdentity({
        email: "admin@pine.local",
        username: "admin",
        password: "secret",
        emailVerified: true,
        firstName: "Sourabh",
        lastName: "Rawat",
      }),
    ).rejects.toBe(saveError);

    expect(identityAdminProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
  });

  it("propagates IdP errors without saving locally", async () => {
    const identityAdminProvider = {
      createIdentity: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn(),
    };
    const db = createDbMock();
    const outboxService = createOutboxMock();

    const service = new AdminService(
      identityRepository as never,
      { findByIdentityId: vi.fn(), softDelete: vi.fn() } as never,
      identityAdminProvider as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.createIdentity({
        email: "admin@pine.local",
        username: "admin",
        password: "secret",
        emailVerified: false,
        firstName: "Sourabh",
        lastName: "Rawat",
      }),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);

    expect(db.transaction).not.toHaveBeenCalled();
    expect(identityRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });
});

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
    const identityAdminProvider = {
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).resolves.toBeUndefined();

    expect(identityRepository.findById).toHaveBeenCalledWith("identity-row-1");
    expect(identityAdminProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
    expect(db.transaction).toHaveBeenCalledOnce();
    expect(identityProfileRepository.findByIdentityId).toHaveBeenCalledWith("identity-row-1");
    expect(identityProfileRepository.softDelete).toHaveBeenCalledWith("profile-1", { tx });
    expect(identityRepository.softDelete).toHaveBeenCalledWith("identity-row-1", { tx });
  });

  it("soft-deletes the identity when no profile exists", async () => {
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
      findByIdentityId: vi.fn().mockResolvedValue(null),
      softDelete: vi.fn(),
    };
    const identityAdminProvider = {
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).resolves.toBeUndefined();

    expect(identityAdminProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
    expect(identityProfileRepository.findByIdentityId).toHaveBeenCalledWith("identity-row-1");
    expect(identityProfileRepository.softDelete).not.toHaveBeenCalled();
    expect(identityRepository.softDelete).toHaveBeenCalledWith("identity-row-1", { tx });
    expect(db.transaction).toHaveBeenCalledOnce();
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
    const identityAdminProvider = {
      deleteIdentity: vi.fn().mockRejectedValue(new IdentityNotFoundError()),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
      db as never,
    );

    await expect(service.deleteIdentity("identity-row-1")).rejects.toBeInstanceOf(
      IdentityNotFoundError,
    );

    expect(identityAdminProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
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
    const identityAdminProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
      db as never,
    );

    await expect(service.deleteIdentity("missing")).rejects.toBeInstanceOf(UserNotFoundError);

    expect(identityAdminProvider.deleteIdentity).not.toHaveBeenCalled();
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
    const identityAdminProvider = {
      deleteIdentity: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
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
    const identityAdminProvider = {
      deleteIdentity: vi.fn(),
    };

    const service = new AdminService(
      identityRepository as never,
      identityProfileRepository as never,
      identityAdminProvider as never,
      createOutboxMock() as never,
      createDbMock() as never,
    );

    await expect(service.findIdentities()).resolves.toEqual([
      { id: "identity-row-1", createdAt: undefined, updatedAt: undefined },
      { id: "identity-row-2", createdAt: undefined, updatedAt: undefined },
    ]);
    expect(identityRepository.findAll).toHaveBeenCalledOnce();
  });
});
