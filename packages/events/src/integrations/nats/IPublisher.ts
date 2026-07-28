import type { CloudEvent } from "../../cloud-events";

export interface IPublisher {
  send(event: CloudEvent): Promise<void>;
}
