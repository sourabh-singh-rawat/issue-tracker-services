import { BrandCreatedEvent, BrandUpdatedEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { BrandCodeConflictError, BrandNotFoundError } from "@/features/brands/errors";
import { BrandService } from "@/features/brands/services/BrandService";

const brand = {
  id: "brand-1",
  code: "ACME",
  name: "Acme Corp",
  description: "A brand",
  isActive: true,
  version: 1,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

const createService = (
  brandRepository: unknown,
  publisher: unknown = { send: vi.fn() },
  outboxService: unknown = { schedule: vi.fn() },
  db: unknown = {
    transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn({})),
  },
) => new BrandService(brandRepository as never, publisher as never, outboxService as never, db as never);

describe("BrandService", () => {
  it("creates a brand and publishes BrandCreated", async () => {
    const brandRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(brand),
    };
    const publisher = {
      send: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService(brandRepository, publisher);

    await expect(
      service.createBrand({ code: "ACME", name: "Acme Corp", description: "A brand" }),
    ).resolves.toEqual(brand);

    expect(brandRepository.existsByCode).toHaveBeenCalledWith("ACME");
    expect(brandRepository.save).toHaveBeenCalledWith({
      code: "ACME",
      name: "Acme Corp",
      description: "A brand",
      isActive: undefined,
    });
    expect(publisher.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: BrandCreatedEvent.type,
        source: "pine/product-service",
        specversion: "1.0",
        subject: "brand-1",
        dataschema: `urn:pine:events:${BrandCreatedEvent.type}:v${BrandCreatedEvent.version}`,
        datacontenttype: "application/json",
        data: {
          id: "brand-1",
          code: "ACME",
          name: "Acme Corp",
          isActive: true,
          version: 1,
          createdAt: "2026-01-01T00:00:00.000Z",
          description: "A brand",
        },
      }),
    );
  });

  it("throws BrandCodeConflictError when creating with a duplicate code", async () => {
    const brandRepository = {
      existsByCode: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };
    const publisher = { send: vi.fn() };

    const service = createService(brandRepository, publisher);

    await expect(service.createBrand({ code: "ACME", name: "Acme" })).rejects.toBeInstanceOf(
      BrandCodeConflictError,
    );
    expect(brandRepository.save).not.toHaveBeenCalled();
    expect(publisher.send).not.toHaveBeenCalled();
  });

  it("returns a brand by id", async () => {
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(brand),
    };

    const service = createService(brandRepository);

    await expect(service.getBrandById("brand-1")).resolves.toEqual(brand);
  });

  it("throws BrandNotFoundError when brand is missing", async () => {
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = createService(brandRepository);

    await expect(service.getBrandById("missing")).rejects.toBeInstanceOf(BrandNotFoundError);
  });

  it("lists brands", async () => {
    const brandRepository = {
      findAll: vi.fn().mockResolvedValue([brand]),
    };

    const service = createService(brandRepository);

    await expect(service.listBrands()).resolves.toEqual([brand]);
  });

  it("updates a brand and schedules BrandUpdated in the outbox", async () => {
    const updated = {
      ...brand,
      name: "Acme Updated",
      version: 2,
      updatedAt: new Date("2026-01-02T00:00:00.000Z"),
    };
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(brand),
      existsByCode: vi.fn(),
      update: vi.fn().mockResolvedValue(updated),
    };
    const publisher = { send: vi.fn() };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };
    const tx = { kind: "tx" };
    const db = {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(tx)),
    };

    const service = createService(brandRepository, publisher, outboxService, db);

    await expect(service.updateBrand("brand-1", { name: "Acme Updated" })).resolves.toEqual(
      updated,
    );
    expect(brandRepository.update).toHaveBeenCalledWith(
      "brand-1",
      { name: "Acme Updated" },
      { tx },
    );
    expect(publisher.send).not.toHaveBeenCalled();
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: BrandUpdatedEvent.type,
        eventVersion: BrandUpdatedEvent.version,
        aggregateType: "brand",
        aggregateId: "brand-1",
        payload: expect.objectContaining({
          type: BrandUpdatedEvent.type,
          source: "pine/product-service",
          specversion: "1.0",
          subject: "brand-1",
          dataschema: `urn:pine:events:${BrandUpdatedEvent.type}:v${BrandUpdatedEvent.version}`,
          datacontenttype: "application/json",
          data: {
            id: "brand-1",
            code: "ACME",
            name: "Acme Updated",
            isActive: true,
            version: 2,
            updatedAt: "2026-01-02T00:00:00.000Z",
            description: "A brand",
          },
        }),
      }),
      { tx },
    );
  });

  it("throws BrandCodeConflictError when updating to a taken code", async () => {
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(brand),
      existsByCode: vi.fn().mockResolvedValue(true),
      update: vi.fn(),
    };
    const publisher = { send: vi.fn() };
    const outboxService = { schedule: vi.fn() };

    const service = createService(brandRepository, publisher, outboxService);

    await expect(service.updateBrand("brand-1", { code: "OTHER" })).rejects.toBeInstanceOf(
      BrandCodeConflictError,
    );
    expect(brandRepository.existsByCode).toHaveBeenCalledWith("OTHER", "brand-1");
    expect(brandRepository.update).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
    expect(publisher.send).not.toHaveBeenCalled();
  });

  it("deletes a brand", async () => {
    const brandRepository = {
      delete: vi.fn().mockResolvedValue(true),
    };

    const service = createService(brandRepository);

    await expect(service.deleteBrand("brand-1")).resolves.toBeUndefined();
    expect(brandRepository.delete).toHaveBeenCalledWith("brand-1");
  });

  it("throws BrandNotFoundError when deleting a missing brand", async () => {
    const brandRepository = {
      delete: vi.fn().mockResolvedValue(false),
    };

    const service = createService(brandRepository);

    await expect(service.deleteBrand("missing")).rejects.toBeInstanceOf(BrandNotFoundError);
  });
});
