import {
  type AttachmentScannedData,
  type CloudEvent,
  type IBroker,
  AttachmentScannedEvent,
  Consumer,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAttachmentService } from "@/features/attachment/services";

@injectable()
export class AttachmentScannedConsumer extends Consumer<CloudEvent<AttachmentScannedData>> {
  readonly stream = Streams.ATTACHMENT;
  readonly consumer = "attachment-scanned";
  readonly subjects = [AttachmentScannedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.AttachmentService)
    private readonly attachmentService: IAttachmentService,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<AttachmentScannedData>): Promise<void> {
    const event = validateEvent(AttachmentScannedEvent, payload);
    const data = event.data;
    if (!data) {
      message.ack();
      return;
    }

    await this.attachmentService.updateSecurityStatus({
      id: data.attachmentId,
      status: data.status,
    });

    message.ack();
  }
}
