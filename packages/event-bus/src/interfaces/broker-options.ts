import { Logger } from "@pine/server-core";

export interface BrokerOptions {
  servers: string[];
  streams?: string[];
  logger?: Logger;
}
