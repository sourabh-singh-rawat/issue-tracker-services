import { NatsMessageServer } from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";

export const messageServer = new NatsMessageServer(
  { servers: ["nats"] },
  logger,
);
