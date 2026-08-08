import { PinoLogger } from "@pine/http";
import pino from "pino";

export const logger = new PinoLogger(pino({ transport: { target: "pino-pretty" } }));
