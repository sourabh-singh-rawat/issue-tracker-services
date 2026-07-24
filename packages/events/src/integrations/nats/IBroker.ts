import { NatsConnection } from "nats";
import type { IBrokerOptions } from "./IBrokerOptions";

export interface IBroker {
  init(): Promise<void>;
  getConfig: () => IBrokerOptions;
  client?: NatsConnection;
}
