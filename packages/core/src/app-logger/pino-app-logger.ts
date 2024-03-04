import pino from "pino";
import { AppLogger } from "./interfaces/app-logger";
// Important: make better separated dev and prod versions
export const logger = pino({
  level: "info",
  timestamp: false,
  transport: { target: "pino-pretty", options: { colorize: true } },
});

interface PinoLoggerOptions {
  level: "info";
  timestamp: boolean;
}

export class PinoAppLogger implements AppLogger {
  private readonly logger;
  constructor({ level, timestamp = false }: PinoLoggerOptions) {
    this.logger = pino({
      level,
      timestamp,
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
  }

  info = (message: string) => {
    this.logger.info(message);
  };
}
