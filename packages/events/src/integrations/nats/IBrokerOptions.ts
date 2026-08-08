import { ILogger } from "@pine/http";

export interface IBrokerOptions {
  servers: string[];
  streams?: string[];
  logger?: ILogger;
}
