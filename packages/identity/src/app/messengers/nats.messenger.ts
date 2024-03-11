import { NatsMessenger, logger } from "@sourabhrawatcc/core-utils";
import { connect } from "nats";

export const natsMessenger = new NatsMessenger(
  connect,
  { servers: ["nats"] },
  logger,
);
