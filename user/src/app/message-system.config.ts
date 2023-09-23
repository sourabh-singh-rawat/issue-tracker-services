import { NatsMessageServer, logger } from "@sourabhrawatcc/core-utils";

export const messageServer = new NatsMessageServer(
  { servers: ["nats"] },
  logger,
);
