import { AppLogger } from "@issue-tracker/server-core";

export interface BrokerOptions {
  servers: string[];
  streams?: string[];
  logger?: AppLogger;
}
