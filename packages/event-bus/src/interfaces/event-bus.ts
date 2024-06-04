import { NatsConnection } from "nats";

export interface EventBus {
  init(): Promise<void>;
  client?: NatsConnection;
}
