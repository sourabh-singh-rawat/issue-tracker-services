import { connect } from "nats";
import { NatsMessenger, logger } from "@sourabhrawatcc/core-utils";

export const messenger = new NatsMessenger(
  connect,
  { servers: ["nats"] },
  logger,
);
