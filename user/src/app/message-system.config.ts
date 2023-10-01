import { NatsMessageService, logger } from "@sourabhrawatcc/core-utils";

export const messageService = new NatsMessageService(
  { servers: ["nats"] },
  logger,
);
