import { describe, expect, it, vi } from "vitest";
import { UnitCodeConflictError, UnitNotFoundError } from "@/features/units/errors";
import { UnitService } from "@/features/units/services/UnitService";

const unit = {
  id: "unit-1",
  code: "KG",
  name: "Kilogram",
  symbol: "kg",
  isActive: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

describe("UnitService", () => {
  it("creates a unit", async () => {
    const unitRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(unit),
    };

    const service = new UnitService(unitRepository as never);

    await expect(
      service.createUnit({ code: "KG", name: "Kilogram", symbol: "kg" }),
    ).resolves.toEqual(unit);

    expect(unitRepository.existsByCode).toHaveBeenCalledWith("KG");
    expect(unitRepository.save).toHaveBeenCalledWith({
      code: "KG",
      name: "Kilogram",
      symbol: "kg",
      isActive: undefined,
    });
  });

  it("throws UnitCodeConflictError when creating with a duplicate code", async () => {
    const unitRepository = {
      existsByCode: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.createUnit({ code: "KG", name: "Kilogram" })).rejects.toBeInstanceOf(
      UnitCodeConflictError,
    );
    expect(unitRepository.save).not.toHaveBeenCalled();
  });

  it("returns a unit by id", async () => {
    const unitRepository = {
      findById: vi.fn().mockResolvedValue(unit),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.getUnitById("unit-1")).resolves.toEqual(unit);
    expect(unitRepository.findById).toHaveBeenCalledWith("unit-1");
  });

  it("throws UnitNotFoundError when unit is missing", async () => {
    const unitRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.getUnitById("missing")).rejects.toBeInstanceOf(UnitNotFoundError);
  });

  it("lists units", async () => {
    const unitRepository = {
      findAll: vi.fn().mockResolvedValue([unit]),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.listUnits()).resolves.toEqual([unit]);
  });

  it("updates a unit", async () => {
    const updated = { ...unit, name: "Kilogramme", updatedAt: new Date() };
    const unitRepository = {
      findById: vi.fn().mockResolvedValue(unit),
      existsByCode: vi.fn().mockResolvedValue(false),
      update: vi.fn().mockResolvedValue(updated),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.updateUnit("unit-1", { name: "Kilogramme" })).resolves.toEqual(updated);
    expect(unitRepository.update).toHaveBeenCalledWith("unit-1", { name: "Kilogramme" });
  });

  it("throws UnitCodeConflictError when updating to a duplicate code", async () => {
    const unitRepository = {
      findById: vi.fn().mockResolvedValue(unit),
      existsByCode: vi.fn().mockResolvedValue(true),
      update: vi.fn(),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.updateUnit("unit-1", { code: "G" })).rejects.toBeInstanceOf(
      UnitCodeConflictError,
    );
    expect(unitRepository.update).not.toHaveBeenCalled();
  });

  it("deletes a unit", async () => {
    const unitRepository = {
      delete: vi.fn().mockResolvedValue(true),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.deleteUnit("unit-1")).resolves.toBeUndefined();
    expect(unitRepository.delete).toHaveBeenCalledWith("unit-1");
  });

  it("throws UnitNotFoundError when deleting a missing unit", async () => {
    const unitRepository = {
      delete: vi.fn().mockResolvedValue(false),
    };

    const service = new UnitService(unitRepository as never);

    await expect(service.deleteUnit("missing")).rejects.toBeInstanceOf(UnitNotFoundError);
  });
});
