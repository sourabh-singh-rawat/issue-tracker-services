import { Logger } from "@issue-tracker/server-core";

export interface BrokerOptions {
  servers: string[];
  streams?: string[];
  logger?: Logger;
}
