import {
  type BrandCreatedData,
  BrandCreatedEvent,
  type CloudEvent,
  CONSUMERS,
  type IBroker,
  Streams,
  Subscriber,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IBrandRepository } from "@/features/brands/repositories";

@injectable()
export class BrandCreatedSubscriber extends Subscriber<CloudEvent<BrandCreatedData>> {
  readonly stream = Streams.PRODUCT;
  readonly consumer = CONSUMERS.BRAND_CREATED_INVENTORY;
  readonly subject = BrandCreatedEvent.type;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.BrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<BrandCreatedData>) {
    const event = validateEvent(BrandCreatedEvent, payload);
    const data = event.data!;

    const exists = await this.brandRepository.existsById(data.id);
    if (!exists) {
      await this.brandRepository.save({
        id: data.id,
        code: data.code,
        name: data.name,
        isActive: data.isActive,
        description: data.description,
        createdAt: new Date(data.createdAt),
        version: data.version,
      });
    }

    message.ack();
  }
}
