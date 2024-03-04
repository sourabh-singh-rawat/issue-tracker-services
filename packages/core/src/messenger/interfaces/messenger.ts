import { NatsConnection } from "nats";

export interface Messenger {
  connect(): Promise<void>;
  client?: NatsConnection;
}
