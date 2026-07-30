import { ProductCreatedEvent } from "@pine/events";
import { describe, expect, it, vi } from "vitest";
import { PRODUCT_TYPE } from "@/constants";
import {
  ProductCodeConflictError,
  ProductNotFoundError,
  ProductSkuConflictError,
} from "@/features/products/errors";
import { ProductService } from "@/features/products/services/ProductService";

const product = {
  id: "product-1",
  code: "WIDGET",
  sku: "WDG-001",
  name: "Widget",
  description: "A widget",
  productType: PRODUCT_TYPE.STOCK_ITEM,
  categoryId: "category-1",
  brandId: "brand-1",
  defaultUnitId: "unit-1",
  isActive: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
  deletedAt: null,
  version: 1,
};

const productUnit = {
  id: "product-unit-1",
  productId: "product-1",
  unitId: "unit-1",
  baseUnitMultiplier: "1",
  isBaseUnit: true,
  isActive: true,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: null,
};

function createDbMock(tx: unknown = { tx: true }) {
  return {
    transaction: vi.fn(async (cb: (tx: unknown) => Promise<unknown>) => cb(tx)),
  };
}

describe("ProductService", () => {
  it("creates a product, product unit mapping, and schedules ProductCreated in the outbox", async () => {
    const tx = { tx: true };
    const db = createDbMock(tx);
    const productRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      existsBySku: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(product),
    };
    const productUnitRepository = {
      save: vi.fn().mockResolvedValue(productUnit),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };

    const service = new ProductService(
      productRepository as never,
      productUnitRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.createProduct({
        code: "WIDGET",
        sku: "WDG-001",
        name: "Widget",
        productType: PRODUCT_TYPE.STOCK_ITEM,
        description: "A widget",
        categoryId: "category-1",
        brandId: "brand-1",
        defaultUnitId: "unit-1",
      }),
    ).resolves.toEqual(product);

    expect(productRepository.existsByCode).toHaveBeenCalledWith("WIDGET");
    expect(productRepository.existsBySku).toHaveBeenCalledWith("WDG-001");
    expect(db.transaction).toHaveBeenCalledOnce();
    expect(productRepository.save).toHaveBeenCalledWith(
      {
        code: "WIDGET",
        sku: "WDG-001",
        name: "Widget",
        productType: PRODUCT_TYPE.STOCK_ITEM,
        description: "A widget",
        categoryId: "category-1",
        brandId: "brand-1",
        defaultUnitId: "unit-1",
        isActive: undefined,
      },
      { tx },
    );
    expect(productUnitRepository.save).toHaveBeenCalledWith(
      {
        productId: "product-1",
        unitId: "unit-1",
        baseUnitMultiplier: "1",
        isBaseUnit: true,
        isActive: true,
      },
      { tx },
    );
    expect(outboxService.schedule).toHaveBeenCalledWith(
      {
        eventId: expect.any(String),
        eventType: ProductCreatedEvent.type,
        eventVersion: ProductCreatedEvent.version,
        aggregateType: "product",
        aggregateId: "product-1",
        payload: expect.objectContaining({
          type: ProductCreatedEvent.type,
          source: "pine/product-service",
          specversion: "1.0",
          subject: "product-1",
          dataschema: `urn:pine:events:${ProductCreatedEvent.type}:v${ProductCreatedEvent.version}`,
          datacontenttype: "application/json",
          data: {
            id: "product-1",
            code: "WIDGET",
            sku: "WDG-001",
            name: "Widget",
            productType: PRODUCT_TYPE.STOCK_ITEM,
            isActive: true,
            createdAt: "2026-01-01T00:00:00.000Z",
            defaultUnitId: "unit-1",
            productUnits: [
              {
                id: "product-unit-1",
                productId: "product-1",
                unitId: "unit-1",
                baseUnitMultiplier: "1",
                isBaseUnit: true,
                isActive: true,
                createdAt: "2026-01-01T00:00:00.000Z",
              },
            ],
            description: "A widget",
            categoryId: "category-1",
            brandId: "brand-1",
          },
        }),
      },
      { tx },
    );
  });

  it("always creates a product unit mapping for the required default unit", async () => {
    const tx = { tx: true };
    const db = createDbMock(tx);
    const productRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      existsBySku: vi.fn().mockResolvedValue(false),
      save: vi.fn().mockResolvedValue(product),
    };
    const productUnitRepository = {
      save: vi.fn().mockResolvedValue(productUnit),
    };
    const outboxService = {
      schedule: vi.fn().mockResolvedValue({ id: "outbox-1" }),
    };

    const service = new ProductService(
      productRepository as never,
      productUnitRepository as never,
      outboxService as never,
      db as never,
    );

    await service.createProduct({
      code: "WIDGET",
      sku: "WDG-001",
      name: "Widget",
      productType: PRODUCT_TYPE.STOCK_ITEM,
      defaultUnitId: "unit-1",
    });

    expect(productUnitRepository.save).toHaveBeenCalledWith(
      {
        productId: "product-1",
        unitId: "unit-1",
        baseUnitMultiplier: "1",
        isBaseUnit: true,
        isActive: true,
      },
      { tx },
    );
  });

  it("throws ProductCodeConflictError when code is taken", async () => {
    const db = createDbMock();
    const productRepository = {
      existsByCode: vi.fn().mockResolvedValue(true),
      existsBySku: vi.fn(),
      save: vi.fn(),
    };
    const productUnitRepository = {
      save: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = new ProductService(
      productRepository as never,
      productUnitRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.createProduct({
        code: "WIDGET",
        sku: "WDG-001",
        name: "Widget",
        productType: PRODUCT_TYPE.STOCK_ITEM,
        defaultUnitId: "unit-1",
      }),
    ).rejects.toBeInstanceOf(ProductCodeConflictError);

    expect(productRepository.existsBySku).not.toHaveBeenCalled();
    expect(productRepository.save).not.toHaveBeenCalled();
    expect(productUnitRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("throws ProductSkuConflictError when SKU is taken", async () => {
    const db = createDbMock();
    const productRepository = {
      existsByCode: vi.fn().mockResolvedValue(false),
      existsBySku: vi.fn().mockResolvedValue(true),
      save: vi.fn(),
    };
    const productUnitRepository = {
      save: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = new ProductService(
      productRepository as never,
      productUnitRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(
      service.createProduct({
        code: "WIDGET",
        sku: "WDG-001",
        name: "Widget",
        productType: PRODUCT_TYPE.STOCK_ITEM,
        defaultUnitId: "unit-1",
      }),
    ).rejects.toBeInstanceOf(ProductSkuConflictError);

    expect(productRepository.save).not.toHaveBeenCalled();
    expect(productUnitRepository.save).not.toHaveBeenCalled();
    expect(outboxService.schedule).not.toHaveBeenCalled();
  });

  it("returns a product by id", async () => {
    const db = createDbMock();
    const productRepository = {
      findById: vi.fn().mockResolvedValue(product),
    };
    const productUnitRepository = {
      save: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = new ProductService(
      productRepository as never,
      productUnitRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(service.getProductById("product-1")).resolves.toEqual(product);
  });

  it("throws ProductNotFoundError when product is missing", async () => {
    const db = createDbMock();
    const productRepository = {
      findById: vi.fn().mockResolvedValue(null),
    };
    const productUnitRepository = {
      save: vi.fn(),
    };
    const outboxService = { schedule: vi.fn() };

    const service = new ProductService(
      productRepository as never,
      productUnitRepository as never,
      outboxService as never,
      db as never,
    );

    await expect(service.getProductById("missing")).rejects.toBeInstanceOf(ProductNotFoundError);
  });
});
