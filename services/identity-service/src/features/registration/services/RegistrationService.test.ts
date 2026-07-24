import { describe, it, expect, vi } from "vitest";
import {
  IdentityAlreadyExistsError,
  IdentityProviderUnavailableError,
} from "@/integrations/identity";
import { RegistrationService } from "./RegistrationService";

describe("RegistrationService", () => {
  it("registers a new user with the identity provider and saves locally", async () => {
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "identity-1", email: "a@b.com" }),
    };
    const userRepository = {
      save: vi.fn().mockResolvedValue(undefined),
    };

    const service = new RegistrationService(identityProvider as never, userRepository as never);

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).resolves.toBeUndefined();

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(userRepository.save).toHaveBeenCalledWith({
      email: "a@b.com",
      externalId: "identity-1",
    });
  });

  it("throws when the identity already exists and does not save locally", async () => {
    const identityProvider = {
      register: vi.fn().mockRejectedValue(new IdentityAlreadyExistsError()),
    };
    const userRepository = {
      save: vi.fn(),
    };

    const service = new RegistrationService(identityProvider as never, userRepository as never);

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).rejects.toBeInstanceOf(IdentityAlreadyExistsError);

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it("throws when the identity provider is unavailable and does not save locally", async () => {
    const identityProvider = {
      register: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };
    const userRepository = {
      save: vi.fn(),
    };

    const service = new RegistrationService(identityProvider as never, userRepository as never);

    await expect(
      service.registerWithEmailAndPassword("a@b.com", "password"),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it("propagates the error when local persistence fails after identity registration", async () => {
    const saveError = new Error("database unavailable");
    const identityProvider = {
      register: vi.fn().mockResolvedValue({ id: "identity-1", email: "a@b.com" }),
    };
    const userRepository = {
      save: vi.fn().mockRejectedValue(saveError),
    };

    const service = new RegistrationService(identityProvider as never, userRepository as never);

    await expect(service.registerWithEmailAndPassword("a@b.com", "password")).rejects.toBe(
      saveError,
    );

    expect(identityProvider.register).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
    });
    expect(userRepository.save).toHaveBeenCalledWith({
      email: "a@b.com",
      externalId: "identity-1",
    });
  });
});
