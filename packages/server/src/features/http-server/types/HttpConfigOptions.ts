import type { Environment } from "@pine/common";

export type HttpConfigOptions = {
  port: number;
  host: string;
  environment: Environment;
  version: number;
};
