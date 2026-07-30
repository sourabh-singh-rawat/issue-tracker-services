import {
  type BrandCreatedData,
  BrandCreatedEvent,
  type BrandUpdatedData,
  BrandUpdatedEvent,
  type CloudEvent,
  type IBroker,
  Streams,
  Consumer,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IBrandRepository } from "@/features/brands/repositories";

@injectable()
export class BrandSyncConsumer extends Consumer<CloudEvent<BrandCreatedData | BrandUpdatedData>> {
  readonly stream = Streams.PRODUCT;
  readonly consumer = "inventory-brand-sync";
  readonly subjects = [BrandCreatedEvent.type, BrandUpdatedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.BrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<BrandCreatedData | BrandUpdatedData>) {
    if (payload.type === BrandCreatedEvent.type) {
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
      return;
    }

    if (payload.type === BrandUpdatedEvent.type) {
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
      return;
    }

    message.ack();
  }
}
