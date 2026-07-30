import { createCloudEvent, ProductCreatedEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Product } from "@/db";
import {
  ProductCodeConflictError,
  ProductNotFoundError,
  ProductSkuConflictError,
} from "@/features/products/errors";
import type { IProductRepository, IProductUnitRepository } from "@/features/products/repositories";
import type {
  CreateProductInput,
  IProductService,
} from "@/features/products/services/IProductService";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository,
    @inject(TYPES.ProductUnitRepository)
    private readonly productUnitRepository: IProductUnitRepository,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createProduct(input: CreateProductInput): Promise<Product> {
    const codeExists = await this.productRepository.existsByCode(input.code);
    if (codeExists) {
      throw new ProductCodeConflictError(`Product code already exists: ${input.code}`);
    }

    const skuExists = await this.productRepository.existsBySku(input.sku);
    if (skuExists) {
      throw new ProductSkuConflictError(`Product SKU already exists: ${input.sku}`);
    }

    return this.db.transaction(async (tx) => {
      const product = await this.productRepository.save(
        {
          code: input.code,
          sku: input.sku,
          name: input.name,
          productType: input.productType,
          description: input.description,
          categoryId: input.categoryId,
          brandId: input.brandId,
          defaultUnitId: input.defaultUnitId,
          isActive: input.isActive,
        },
        { tx },
      );

      const productUnit = await this.productUnitRepository.save(
        {
          productId: product.id,
          unitId: input.defaultUnitId,
          baseUnitMultiplier: "1",
          isBaseUnit: true,
          isActive: true,
        },
        { tx },
      );

      const event = createCloudEvent({
        type: ProductCreatedEvent.type,
        version: ProductCreatedEvent.version,
        schema: ProductCreatedEvent.schema,
        source: "pine/product-service",
        subject: product.id,
        data: {
          id: product.id,
          code: product.code,
          sku: product.sku,
          name: product.name,
          productType: product.productType,
          isActive: product.isActive,
          createdAt: product.createdAt.toISOString(),
          defaultUnitId: product.defaultUnitId,
          productUnits: [
            {
              id: productUnit.id,
              productId: productUnit.productId,
              unitId: productUnit.unitId,
              baseUnitMultiplier: productUnit.baseUnitMultiplier,
              isBaseUnit: productUnit.isBaseUnit,
              isActive: productUnit.isActive,
              createdAt: productUnit.createdAt.toISOString(),
            },
          ],
          ...(product.description != null ? { description: product.description } : {}),
          ...(product.categoryId != null ? { categoryId: product.categoryId } : {}),
          ...(product.brandId != null ? { brandId: product.brandId } : {}),
        },
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: ProductCreatedEvent.version,
          aggregateType: "product",
          aggregateId: product.id,
          payload: event,
        },
        { tx },
      );

      return product;
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundError(`Product not found: ${id}`);
    }

    return product;
  }
}
