import { UserRegisteredEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { IdentityProviderType } from "@/features/identities/constants";
import {
  IdentityAlreadyExistsError,
  IdentityProviderUnavailableError,
} from "@/integrations/identity";
import { RegistrationService } from "./RegistrationService";

describe("RegistrationService", () => {
  it("registers a new identity, saves locally, and schedules UserRegistered in the outbox", async () => {
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "idp-1", email: "a@b.com" }),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn().mockResolvedValue({ id: "identity-1", email: "a@b.com" }),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };
    const tx = { kind: "tx" };
    const db = {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(tx)),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).resolves.toBeUndefined();

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(identityRepository.save).toHaveBeenCalledWith(
      {
        email: "a@b.com",
        idpId: "idp-1",
        idpProvider: IdentityProviderType.KRATOS,
      },
      { tx },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: UserRegisteredEvent.type,
        eventVersion: UserRegisteredEvent.version,
        aggregateType: "identity",
        aggregateId: "identity-1",
        payload: expect.objectContaining({
          type: UserRegisteredEvent.type,
          source: "pine/identity-service",
          specversion: "1.0",
          subject: "identity-1",
          dataschema: `urn:pine:events:${UserRegisteredEvent.type}:v${UserRegisteredEvent.version}`,
          datacontenttype: "application/json",
          data: {
            userId: "identity-1",
            email: "a@b.com",
          },
        }),
      }),
      { tx },
    );
    const scheduled = outboxService.schedule.mock.calls[0][0];
    expect(scheduled.eventId).toEqual(expect.any(String));
    expect(scheduled.payload.id).toEqual(scheduled.eventId);
    expect(scheduled.payload.time).toEqual(expect.any(String));
  });

  it("throws when the identity already exists and does not save or schedule", async () => {
    const identityProvider = {
      register: vi.fn().mockRejectedValue(new IdentityAlreadyExistsError()),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn(),
    };
    const outboxService = {
      schedule: vi.fn(),
    };
    const db = {
      transaction: vi.fn(),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).rejects.toBeInstanceOf(IdentityAlreadyExistsError);

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(db.transaction).not.toHaveBeenCalled();
    expect(identityRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("throws when the identity provider is unavailable and does not save or schedule", async () => {
    const identityProvider = {
      register: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn(),
    };
    const outboxService = {
      schedule: vi.fn(),
    };
    const db = {
      transaction: vi.fn(),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(db.transaction).not.toHaveBeenCalled();
    expect(identityRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("deletes the IdP identity and propagates the error when local persistence fails", async () => {
    const saveError = new Error("database unavailable");
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "idp-1", email: "a@b.com" }),
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };
    const identityRepository = {
      save: vi.fn().mockRejectedValue(saveError),
    };
    const outboxService = {
      schedule: vi.fn(),
    };
    const tx = { kind: "tx" };
    const db = {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(tx)),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(service.registerWithEmailAndPassword("a@b.com", "password")).rejects.toBe(
      saveError,
    );

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(identityRepository.save).toHaveBeenCalledWith(
      {
        email: "a@b.com",
        idpId: "idp-1",
        idpProvider: IdentityProviderType.KRATOS,
      },
      { tx },
    );
    expect(outboxService.schedule).not.toHaveBeenCalled();
    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
  });

  it("deletes the IdP identity when outbox scheduling fails after IdP registration", async () => {
    const scheduleError = new Error("outbox unavailable");
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "idp-1", email: "a@b.com" }),
      deleteIdentity: vi.fn().mockResolvedValue(undefined),
    };
    const identityRepository = {
      save: vi.fn().mockResolvedValue({ id: "identity-1", email: "a@b.com" }),
    };
    const outboxService = {
      schedule: vi.fn().mockRejectedValue(scheduleError),
    };
    const tx = { kind: "tx" };
    const db = {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(tx)),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(service.registerWithEmailAndPassword("a@b.com", "password")).rejects.toBe(
      scheduleError,
    );

    expect(identityRepository.save).toHaveBeenCalled();
    expect(outboxService.schedule).toHaveBeenCalledWith(expect.any(Object), { tx });
    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
  });
});
