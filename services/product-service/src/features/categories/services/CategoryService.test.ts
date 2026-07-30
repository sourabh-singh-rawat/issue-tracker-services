import { CategoryCreatedEvent, CategoryUpdatedEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { CategoryCodeConflictError, CategoryNotFoundError } from "@/features/categories/errors";
import { CategoryService } from "@/features/categories/services/CategoryService";

const category = {
  id: "category-1",
  code: "ELEC",
  name: "Electronics",
  description: "Electronic products",
  parentCategoryId: null as string | null,
  isActive: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null as Date | null,
};

const createService = (
  categoryRepository: unknown,
  outboxService: unknown = { schedule: vi.fn() },
  db: unknown = {
    transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn({})),
  },
) => new CategoryService(categoryRepository as never, outboxService as never, db as never);

describe("CategoryService", () => {
  it("creates a category and schedules CategoryCreated in the outbox", async () => {
    const categoryRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(category),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };
    const tx = { kind: "tx" };
    const db = {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(tx)),
    };

    const service = createService(categoryRepository, outboxService, db);

    await expect(
      service.createCategory({
        code: "ELEC",
        name: "Electronics",
        description: "Electronic products",
      }),
    ).resolves.toEqual(category);

    expect(categoryRepository.existsByCode).toHaveBeenCalledWith("ELEC", undefined);
    expect(categoryRepository.save).toHaveBeenCalledWith(
      {
        code: "ELEC",
        name: "Electronics",
        description: "Electronic products",
        parentCategoryId: undefined,
        isActive: undefined,
      },
      { tx },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: CategoryCreatedEvent.type,
        eventVersion: CategoryCreatedEvent.version,
        aggregateType: "category",
        aggregateId: "category-1",
        payload: expect.objectContaining({
          type: CategoryCreatedEvent.type,
          source: "pine/product-service",
          specversion: "1.0",
          subject: "category-1",
          dataschema: `urn:pine:events:${CategoryCreatedEvent.type}:v${CategoryCreatedEvent.version}`,
          datacontenttype: "application/json",
          data: {
            id: "category-1",
            code: "ELEC",
            name: "Electronics",
            isActive: true,
            createdAt: "2026-01-01T00:00:00.000Z",
            description: "Electronic products",
          },
        }),
      }),
      { tx },
    );
  });

  it("creates a category with a parent when parent exists", async () => {
    const created = {
      ...category,
      id: "category-2",
      code: "PHONES",
      parentCategoryId: "category-1",
    };
    const categoryRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      existsById: vi.fn().mockResolvedValue(true),
      save: vi.fn().mockResolvedValue(created),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };

    const service = createService(categoryRepository, outboxService);

    await expect(
      service.createCategory({
        code: "PHONES",
        name: "Phones",
        parentCategoryId: "category-1",
      }),
    ).resolves.toEqual(created);

    expect(categoryRepository.existsById).toHaveBeenCalledWith("category-1");
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: CategoryCreatedEvent.type,
        payload: expect.objectContaining({
          data: expect.objectContaining({
            parentCategoryId: "category-1",
          }),
        }),
      }),
      expect.anything(),
    );
  });

  it("throws CategoryCodeConflictError when creating with a duplicate code", async () => {
    const categoryRepository = {
      existsByCode: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = createService(categoryRepository, outboxService);

    await expect(
      service.createCategory({ code: "ELEC", name: "Electronics" }),
    ).rejects.toBeInstanceOf(CategoryCodeConflictError);
    expect(categoryRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("throws CategoryNotFoundError when parent category is missing", async () => {
    const categoryRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      existsById: vi.fn().mockResolvedValue(false),
      save: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = createService(categoryRepository, outboxService);

    await expect(
      service.createCategory({
        code: "PHONES",
        name: "Phones",
        parentCategoryId: "missing-parent",
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
    expect(categoryRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("returns a category by id", async () => {
    const categoryRepository = {
      findById: vi.fn().mockResolvedValue(category),
    };

    const service = createService(categoryRepository);

    await expect(service.getCategoryById("category-1")).resolves.toEqual(category);
    expect(categoryRepository.findById).toHaveBeenCalledWith("category-1");
  });

  it("throws CategoryNotFoundError when category is missing", async () => {
    const categoryRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };

    const service = createService(categoryRepository);

    await expect(service.getCategoryById("missing")).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it("lists categories", async () => {
    const categoryRepository = {
      findAll: vi.fn().mockResolvedValue([category]),
    };

    const service = createService(categoryRepository);

    await expect(service.listCategories()).resolves.toEqual([category]);
  });

  it("updates a category and schedules CategoryUpdated in the outbox", async () => {
    const updated = {
      ...category,
      name: "Electronics Updated",
      updatedAt: new Date("2026-01-02T00:00:00.000Z"),
    };
    const categoryRepository = {
      findById: vi.fn().mockResolvedValue(category),
      existsByCode: vi.fn(),
      update: vi.fn().mockResolvedValue(updated),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };
    const tx = { kind: "tx" };
    const db = {
      transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(tx)),
    };

    const service = createService(categoryRepository, outboxService, db);

    await expect(
      service.updateCategory("category-1", { name: "Electronics Updated" }),
    ).resolves.toEqual(updated);
    expect(categoryRepository.update).toHaveBeenCalledWith(
      "category-1",
      { name: "Electronics Updated" },
      { tx },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: CategoryUpdatedEvent.type,
        eventVersion: CategoryUpdatedEvent.version,
        aggregateType: "category",
        aggregateId: "category-1",
        payload: expect.objectContaining({
          type: CategoryUpdatedEvent.type,
          source: "pine/product-service",
          specversion: "1.0",
          subject: "category-1",
          dataschema: `urn:pine:events:${CategoryUpdatedEvent.type}:v${CategoryUpdatedEvent.version}`,
          datacontenttype: "application/json",
          data: {
            id: "category-1",
            code: "ELEC",
            name: "Electronics Updated",
            isActive: true,
            updatedAt: "2026-01-02T00:00:00.000Z",
            description: "Electronic products",
          },
        }),
      }),
      { tx },
    );
  });

  it("throws CategoryCodeConflictError when updating to a taken code", async () => {
    const categoryRepository = {
      findById: vi.fn().mockResolvedValue(category),
      existsByCode: vi.fn().mockResolvedValue(true),
      update: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = createService(categoryRepository, outboxService);

    await expect(service.updateCategory("category-1", { code: "OTHER" })).rejects.toBeInstanceOf(
      CategoryCodeConflictError,
    );
    expect(categoryRepository.existsByCode).toHaveBeenCalledWith("OTHER", "category-1");
    expect(categoryRepository.update).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("deletes a category", async () => {
    const categoryRepository = {
      delete: vi.fn().mockResolvedValue(true),
    };

    const service = createService(categoryRepository);

    await expect(service.deleteCategory("category-1")).resolves.toBeUndefined();
    expect(categoryRepository.delete).toHaveBeenCalledWith("category-1");
  });

  it("throws CategoryNotFoundError when deleting a missing category", async () => {
    const categoryRepository = {
      delete: vi.fn().mockResolvedValue(false),
    };

    const service = createService(categoryRepository);

    await expect(service.deleteCategory("missing")).rejects.toBeInstanceOf(CategoryNotFoundError);
  });
});
