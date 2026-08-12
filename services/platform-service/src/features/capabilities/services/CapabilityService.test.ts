import { describe, expect, it, vi } from "vitest";
import {
  CapabilityKeyConflictError,
  CapabilityNotFoundError,
} from "@/features/capabilities/errors";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import { CapabilityService } from "@/features/capabilities/services/CapabilityService";

const capability = {
  id: "cap-1",
  key: "platform:tenant:create",
  service: "platform",
  resource: "tenant",
  action: "create",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const emptyRepo = (): ICapabilityRepository => ({
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  existsByKey: vi.fn(),
  findByKey: vi.fn(),
  findByKeys: vi.fn(),
  findAll: vi.fn(),
});

describe("CapabilityService", () => {
  it("creates a capability when the key is unique", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.existsByKey = vi.fn().mockResolvedValue(false);
    capabilityRepository.save = vi.fn().mockResolvedValue(capability);

    const service = new CapabilityService(capabilityRepository);

    await expect(
      service.createCapability({
        service: "platform",
        resource: "tenant",
        action: "create",
      }),
    ).resolves.toEqual(capability);

    expect(capabilityRepository.existsByKey).toHaveBeenCalledWith("platform:tenant:create");
    expect(capabilityRepository.save).toHaveBeenCalledWith({
      key: "platform:tenant:create",
      service: "platform",
      resource: "tenant",
      action: "create",
    });
  });

  it("rejects create when the capability key already exists", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.existsByKey = vi.fn().mockResolvedValue(true);

    const service = new CapabilityService(capabilityRepository);

    await expect(
      service.createCapability({
        service: "platform",
        resource: "tenant",
        action: "create",
      }),
    ).rejects.toBeInstanceOf(CapabilityKeyConflictError);
    expect(capabilityRepository.save).not.toHaveBeenCalled();
  });

  it("returns a capability by key", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.findByKey = vi.fn().mockResolvedValue(capability);

    const service = new CapabilityService(capabilityRepository);

    await expect(service.getCapabilityByKey("platform:tenant:create")).resolves.toEqual(
      capability,
    );
  });

  it("throws when capability key is missing", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.findByKey = vi.fn().mockResolvedValue(null);

    const service = new CapabilityService(capabilityRepository);

    await expect(service.getCapabilityByKey("missing")).rejects.toBeInstanceOf(
      CapabilityNotFoundError,
    );
  });

  it("lists capabilities", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.findAll = vi.fn().mockResolvedValue([capability]);

    const service = new CapabilityService(capabilityRepository);

    await expect(service.getCapabilities()).resolves.toEqual([capability]);
  });

  it("updates a capability", async () => {
    const updated = {
      ...capability,
      action: "read",
      key: "platform:tenant:read",
    };
    const capabilityRepository = emptyRepo();
    capabilityRepository.findByKey = vi.fn().mockResolvedValue(capability);
    capabilityRepository.existsByKey = vi.fn().mockResolvedValue(false);
    capabilityRepository.update = vi.fn().mockResolvedValue(updated);

    const service = new CapabilityService(capabilityRepository);

    await expect(
      service.updateCapability("platform:tenant:create", {
        action: "read",
      }),
    ).resolves.toEqual(updated);

    expect(capabilityRepository.update).toHaveBeenCalledWith("platform:tenant:create", {
      key: "platform:tenant:read",
      service: "platform",
      resource: "tenant",
      action: "read",
    });
  });

  it("deletes a capability by key", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.delete = vi.fn().mockResolvedValue(true);

    const service = new CapabilityService(capabilityRepository);

    await expect(service.deleteCapability("platform:tenant:create")).resolves.toBeUndefined();
    expect(capabilityRepository.delete).toHaveBeenCalledWith("platform:tenant:create");
  });

  it("throws when deleting a missing capability", async () => {
    const capabilityRepository = emptyRepo();
    capabilityRepository.delete = vi.fn().mockResolvedValue(false);

    const service = new CapabilityService(capabilityRepository);

    await expect(service.deleteCapability("missing")).rejects.toBeInstanceOf(
      CapabilityNotFoundError,
    );
  });
});
