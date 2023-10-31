import { connect } from "nats";
import { NatsMessageService, logger } from "@sourabhrawatcc/core-utils";

export const messageService = new NatsMessageService(
  connect,
  { servers: ["nats"] },
  logger,
);
