import {
  type CloudEvent,
  type IBroker,
  type ProductCreatedData,
  ProductCreatedEvent,
  Streams,
  Consumer,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { Database } from "@/db";
import type { IProductRepository, IProductUnitRepository } from "@/features/products/repositories";

@injectable()
export class ProductSyncConsumer extends Consumer<CloudEvent<ProductCreatedData>> {
  readonly stream = Streams.PRODUCT;
  readonly consumer = "inventory-product-sync";
  readonly subjects = [ProductCreatedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository,
    @inject(TYPES.ProductUnitRepository)
    private readonly productUnitRepository: IProductUnitRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<ProductCreatedData>) {
    const event = validateEvent(ProductCreatedEvent, payload);
    const data = event.data!;

    await this.db.transaction(async (tx) => {
      const productExists = await this.productRepository.existsById(data.id);
      if (!productExists) {
        await this.productRepository.save(
          {
            id: data.id,
            code: data.code,
            sku: data.sku,
            name: data.name,
            productType: data.productType,
            isActive: data.isActive,
            defaultUnitId: data.defaultUnitId,
            description: data.description,
            categoryId: data.categoryId,
            brandId: data.brandId,
            createdAt: new Date(data.createdAt),
          },
          { tx },
        );
      }

      for (const productUnit of data.productUnits) {
        const productUnitExists = await this.productUnitRepository.existsById(productUnit.id);
        if (!productUnitExists) {
          await this.productUnitRepository.save(
            {
              id: productUnit.id,
              productId: productUnit.productId,
              unitId: productUnit.unitId,
              baseUnitMultiplier: productUnit.baseUnitMultiplier,
              isBaseUnit: productUnit.isBaseUnit,
              isActive: productUnit.isActive,
              createdAt: new Date(productUnit.createdAt),
            },
            { tx },
          );
        }
      }
    });

    message.ack();
  }
}
