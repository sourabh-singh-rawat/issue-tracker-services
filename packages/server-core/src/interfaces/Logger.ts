export interface LoggerConstructorOptions {
  level: "info";
  timestamp: boolean;
}

export interface Logger {
  info(message: string): void;
}
