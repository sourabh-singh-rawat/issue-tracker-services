import {
  createCloudEvent,
  type IPublisher,
  ProductCreatedEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Product } from "@/db";
import {
  ProductCodeConflictError,
  ProductNotFoundError,
  ProductSkuConflictError,
} from "@/features/products/errors";
import type {
  IProductRepository,
  IProductUnitRepository,
} from "@/features/products/repositories";
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
    @inject(TYPES.Publisher)
    private readonly publisher: IPublisher,
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

    const product = await this.db.transaction(async (tx) => {
      const created = await this.productRepository.save(
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

      await this.productUnitRepository.save(
        {
          productId: created.id,
          unitId: input.defaultUnitId,
          baseUnitMultiplier: "1",
          isBaseUnit: true,
          isActive: true,
        },
        { tx },
      );

      return created;
    });

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
        ...(product.description != null ? { description: product.description } : {}),
        ...(product.categoryId != null ? { categoryId: product.categoryId } : {}),
        ...(product.brandId != null ? { brandId: product.brandId } : {}),
      },
    });

    await this.publisher.send(event);

    return product;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundError(`Product not found: ${id}`);
    }

    return product;
  }
}
