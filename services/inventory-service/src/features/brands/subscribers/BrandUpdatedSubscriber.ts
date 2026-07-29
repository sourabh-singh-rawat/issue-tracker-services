import {
  type BrandUpdatedData,
  BrandUpdatedEvent,
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
export class BrandUpdatedSubscriber extends Subscriber<CloudEvent<BrandUpdatedData>> {
  readonly stream = Streams.PRODUCT;
  readonly consumer = CONSUMERS.BRAND_UPDATED_INVENTORY;
  readonly subject = BrandUpdatedEvent.type;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.BrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<BrandUpdatedData>) {
    const event = validateEvent(BrandUpdatedEvent, payload);
    const data = event.data!;

    const existing = await this.brandRepository.findById(data.id);

    if (!existing || data.version <= existing.version) {
      message.ack();
      return;
    }

    await this.brandRepository.update(data.id, {
      code: data.code,
      name: data.name,
      isActive: data.isActive,
      description: data.description,
      updatedAt: new Date(data.updatedAt),
      version: data.version,
    });

    message.ack();
  }
}
