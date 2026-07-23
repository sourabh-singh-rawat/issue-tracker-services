import { CoreLogger } from "@pine/server-core";
import pino from "pino";

export const logger = new CoreLogger(pino({ transport: { target: "pino-pretty" } }));
