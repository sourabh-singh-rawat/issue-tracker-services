import { ILogger } from "@pine/http-core";

export interface IBrokerOptions {
  servers: string[];
  streams?: string[];
  logger?: ILogger;
}
