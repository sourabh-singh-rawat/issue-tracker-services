import { describe, expect, it, vi } from "vitest";
import {
  CapabilityKeyConflictError,
  CapabilityNotFoundError,
} from "@/features/capabilities/errors";
import { CapabilityService } from "@/features/capabilities/services/CapabilityService";

const capability = {
  id: "cap-1",
  key: "authorization:roles:create",
  service: "authorization",
  resource: "roles",
  action: "create",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const createService = (capabilityRepository: unknown) =>
  new CapabilityService(capabilityRepository as never);

describe("CapabilityService", () => {
  it("creates a capability when the key is unique", async () => {
    const capabilityRepository = {
      existsByKey: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(capability),
    };

    const service = createService(capabilityRepository);

    await expect(
      service.createCapability({
        service: "authorization",
        resource: "roles",
        action: "create",
      }),
    ).resolves.toEqual(capability);

    expect(capabilityRepository.existsByKey).toHaveBeenCalledWith("authorization:roles:create");
    expect(capabilityRepository.save).toHaveBeenCalledWith({
      key: "authorization:roles:create",
      service: "authorization",
      resource: "roles",
      action: "create",
    });
  });

  it("rejects create when the capability key already exists", async () => {
    const capabilityRepository = {
      existsByKey: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const service = createService(capabilityRepository);

    await expect(
      service.createCapability({
        service: "authorization",
        resource: "roles",
        action: "create",
      }),
    ).rejects.toBeInstanceOf(CapabilityKeyConflictError);
    expect(capabilityRepository.save).not.toHaveBeenCalled();
  });

  it("returns a capability by key", async () => {
    const capabilityRepository = {
      findByKey: vi.fn().mockResolvedValue(capability),
    };

    const service = createService(capabilityRepository);

    await expect(service.getCapabilityByKey("authorization:roles:create")).resolves.toEqual(
      capability,
    );
    expect(capabilityRepository.findByKey).toHaveBeenCalledWith("authorization:roles:create");
  });

  it("throws when capability key is missing", async () => {
    const capabilityRepository = {
      findByKey: vi.fn().mockResolvedValue(null),
    };

    const service = createService(capabilityRepository);

    await expect(service.getCapabilityByKey("missing")).rejects.toBeInstanceOf(
      CapabilityNotFoundError,
    );
  });

  it("lists capabilities", async () => {
    const capabilityRepository = {
      findAll: vi.fn().mockResolvedValue([capability]),
    };

    const service = createService(capabilityRepository);

    await expect(service.getCapabilities()).resolves.toEqual([capability]);
  });

  it("updates a capability", async () => {
    const updated = {
      ...capability,
      action: "read",
      key: "authorization:roles:read",
    };
    const capabilityRepository = {
      findByKey: vi.fn().mockResolvedValue(capability),
      existsByKey: vi.fn().mockResolvedValue(false),
      update: vi.fn().mockResolvedValue(updated),
    };

    const service = createService(capabilityRepository);

    await expect(
      service.updateCapability("authorization:roles:create", {
        action: "read",
      }),
    ).resolves.toEqual(updated);

    expect(capabilityRepository.update).toHaveBeenCalledWith("authorization:roles:create", {
      key: "authorization:roles:read",
      service: "authorization",
      resource: "roles",
      action: "read",
    });
  });

  it("throws when updating a missing capability", async () => {
    const capabilityRepository = {
      findByKey: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };

    const service = createService(capabilityRepository);

    await expect(service.updateCapability("missing", { action: "read" })).rejects.toBeInstanceOf(
      CapabilityNotFoundError,
    );
    expect(capabilityRepository.update).not.toHaveBeenCalled();
  });

  it("deletes a capability by key", async () => {
    const capabilityRepository = {
      delete: vi.fn().mockResolvedValue(true),
    };

    const service = createService(capabilityRepository);

    await expect(service.deleteCapability("authorization:roles:create")).resolves.toBeUndefined();
    expect(capabilityRepository.delete).toHaveBeenCalledWith("authorization:roles:create");
  });

  it("throws when deleting a missing capability", async () => {
    const capabilityRepository = {
      delete: vi.fn().mockResolvedValue(false),
    };

    const service = createService(capabilityRepository);

    await expect(service.deleteCapability("missing")).rejects.toBeInstanceOf(
      CapabilityNotFoundError,
    );
  });
});
