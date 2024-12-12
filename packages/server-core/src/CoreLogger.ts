import { BaseLogger } from "pino";
import { Logger } from "./interfaces";

export class CoreLogger implements Logger {
  constructor(private readonly pino: BaseLogger) {}

  info(message: string) {
    this.pino.info(message);
  }
}
