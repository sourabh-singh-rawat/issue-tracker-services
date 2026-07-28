import { UserRegisteredEvent } from "@pine/events";
import { describe, it, expect, vi } from "vitest";
import { IdentityProviderType } from "@/features/identities/constants";
import {
  IdentityAlreadyExistsError,
  IdentityProviderUnavailableError,
} from "@/integrations/identity";
import { RegistrationService } from "./RegistrationService";

describe("RegistrationService", () => {
  it("registers a new identity with the identity provider, saves locally, and publishes UserRegistered", async () => {
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "idp-1", email: "a@b.com" }),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn().mockResolvedValue({ id: "identity-1", email: "a@b.com" }),
    };
    const publisher = {
      send: vi.fn().mockResolvedValue(undefined),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      publisher as never,
    );

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).resolves.toBeUndefined();

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(identityRepository.save).toHaveBeenCalledWith({
      email: "a@b.com",
      idpId: "idp-1",
      idpProvider: IdentityProviderType.KRATOS,
    });
    expect(publisher.send).toHaveBeenCalledWith(
      expect.objectContaining({
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
    );
    const published = publisher.send.mock.calls[0][0];
    expect(published.id).toEqual(expect.any(String));
    expect(published.time).toEqual(expect.any(String));
  });

  it("throws when the identity already exists and does not save or publish", async () => {
    const identityProvider = {
      register: vi.fn().mockRejectedValue(new IdentityAlreadyExistsError()),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn(),
    };
    const publisher = {
      send: vi.fn(),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      publisher as never,
    );

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).rejects.toBeInstanceOf(IdentityAlreadyExistsError);

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(identityRepository.save).not.toHaveBeenCalled();
    expect(publisher.send).not.toHaveBeenCalled();
  });

  it("throws when the identity provider is unavailable and does not save or publish", async () => {
    const identityProvider = {
      register: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn(),
    };
    const publisher = {
      send: vi.fn(),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      publisher as never,
    );

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(identityRepository.save).not.toHaveBeenCalled();
    expect(publisher.send).not.toHaveBeenCalled();
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
    const publisher = {
      send: vi.fn(),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      publisher as never,
    );

    await expect(service.registerWithEmailAndPassword("a@b.com", "password")).rejects.toBe(
      saveError,
    );

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(identityRepository.save).toHaveBeenCalledWith({
      email: "a@b.com",
      idpId: "idp-1",
      idpProvider: IdentityProviderType.KRATOS,
    });
    expect(identityProvider.deleteIdentity).toHaveBeenCalledWith("idp-1");
    expect(publisher.send).not.toHaveBeenCalled();
  });

  it("does not delete the IdP identity when publishing fails after a successful save", async () => {
    const publishError = new Error("broker unavailable");
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "idp-1", email: "a@b.com" }),
      deleteIdentity: vi.fn(),
    };
    const identityRepository = {
      save: vi.fn().mockResolvedValue({ id: "identity-1", email: "a@b.com" }),
    };
    const publisher = {
      send: vi.fn().mockRejectedValue(publishError),
    };

    const service = new RegistrationService(
      identityProvider as never,
      identityRepository as never,
      publisher as never,
    );

    await expect(service.registerWithEmailAndPassword("a@b.com", "password")).rejects.toBe(
      publishError,
    );

    expect(identityRepository.save).toHaveBeenCalled();
    expect(identityProvider.deleteIdentity).not.toHaveBeenCalled();
  });
});
