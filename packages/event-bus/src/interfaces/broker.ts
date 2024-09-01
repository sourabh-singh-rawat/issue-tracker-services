import { NatsConnection } from "nats";
import { BrokerOptions } from "./broker-options";

export interface Broker {
  init(): Promise<void>;
  getConfig: () => BrokerOptions;
  client?: NatsConnection;
}
