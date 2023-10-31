import { NatsMessageService, logger } from "@sourabhrawatcc/core-utils";
import { connect } from "nats";

export const messageService = new NatsMessageService(
  connect,
  { servers: ["nats"] },
  logger,
);
