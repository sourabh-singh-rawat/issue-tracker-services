import { ILogger } from "./ILogger";

/** Minimal pino-compatible surface used by {@link PinoLogger}. */
export interface PinoLikeLogger {
  info(message: string): void;
}

export class PinoLogger implements ILogger {
  constructor(private readonly pino: PinoLikeLogger) {}

  info(message: string) {
    this.pino.info(message);
  }
}
