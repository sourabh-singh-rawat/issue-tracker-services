import {
  type CloudEvent,
  type IBroker,
  type ProductCreatedData,
  CONSUMERS,
  ProductCreatedEvent,
  Streams,
  Subscriber,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IProductRepository } from "@/features/products/repositories";

@injectable()
export class ProductCreatedSubscriber extends Subscriber<CloudEvent<ProductCreatedData>> {
  readonly stream = Streams.PRODUCT;
  readonly consumer = CONSUMERS.PRODUCT_CREATED_INVENTORY;
  readonly subject = ProductCreatedEvent.type;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<ProductCreatedData>) {
    const event = validateEvent(ProductCreatedEvent, payload);
    const data = event.data!;

    const exists = await this.productRepository.existsById(data.id);
    if (!exists) {
      await this.productRepository.save({
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
      });
    }

    message.ack();
  }
}
