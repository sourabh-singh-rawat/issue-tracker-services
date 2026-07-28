import { describe, expect, it, vi } from "vitest";
import { BrandCodeConflictError, BrandNotFoundError } from "@/features/brands/errors";
import { BrandService } from "@/features/brands/services/BrandService";

const brand = {
  id: "brand-1",
  code: "ACME",
  name: "Acme Corp",
  description: "A brand",
  isActive: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

describe("BrandService", () => {
  it("creates a brand when the code is available", async () => {
    const brandRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(brand),
    };

    const service = new BrandService(brandRepository as never);

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
  });

  it("throws BrandCodeConflictError when creating with a duplicate code", async () => {
    const brandRepository = {
      existsByCode: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.createBrand({ code: "ACME", name: "Acme" })).rejects.toBeInstanceOf(
      BrandCodeConflictError,
    );
    expect(brandRepository.save).not.toHaveBeenCalled();
  });

  it("returns a brand by id", async () => {
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(brand),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.getBrandById("brand-1")).resolves.toEqual(brand);
  });

  it("throws BrandNotFoundError when brand is missing", async () => {
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.getBrandById("missing")).rejects.toBeInstanceOf(BrandNotFoundError);
  });

  it("lists brands", async () => {
    const brandRepository = {
      findAll: vi.fn().mockResolvedValue([brand]),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.listBrands()).resolves.toEqual([brand]);
  });

  it("updates a brand", async () => {
    const updated = { ...brand, name: "Acme Updated" };
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(brand),
      existsByCode: vi.fn(),
      update: vi.fn().mockResolvedValue(updated),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.updateBrand("brand-1", { name: "Acme Updated" })).resolves.toEqual(
      updated,
    );
    expect(brandRepository.update).toHaveBeenCalledWith("brand-1", { name: "Acme Updated" });
  });

  it("throws BrandCodeConflictError when updating to a taken code", async () => {
    const brandRepository = {
      findById: vi.fn().mockResolvedValue(brand),
      existsByCode: vi.fn().mockResolvedValue(true),
      update: vi.fn(),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.updateBrand("brand-1", { code: "OTHER" })).rejects.toBeInstanceOf(
      BrandCodeConflictError,
    );
    expect(brandRepository.existsByCode).toHaveBeenCalledWith("OTHER", "brand-1");
    expect(brandRepository.update).not.toHaveBeenCalled();
  });

  it("deletes a brand", async () => {
    const brandRepository = {
      delete: vi.fn().mockResolvedValue(true),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.deleteBrand("brand-1")).resolves.toBeUndefined();
    expect(brandRepository.delete).toHaveBeenCalledWith("brand-1");
  });

  it("throws BrandNotFoundError when deleting a missing brand", async () => {
    const brandRepository = {
      delete: vi.fn().mockResolvedValue(false),
    };

    const service = new BrandService(brandRepository as never);

    await expect(service.deleteBrand("missing")).rejects.toBeInstanceOf(BrandNotFoundError);
  });
});
