import { PinoLogger } from "@pine/http-core";
import pino from "pino";

export const logger = new PinoLogger(pino({ transport: { target: "pino-pretty" } }));
