import { ILogger } from "@pine/server";

export interface IBrokerOptions {
  servers: string[];
  streams?: string[];
  logger?: ILogger;
}
