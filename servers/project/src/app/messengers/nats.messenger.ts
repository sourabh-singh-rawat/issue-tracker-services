import { connect } from "nats";
import { NatsMessenger, logger } from "@sourabhrawatcc/core-utils";

const options = { servers: ["nats"] };

export const natsMessenger = new NatsMessenger(connect, options, logger);
