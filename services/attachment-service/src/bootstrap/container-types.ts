export const TYPES = {
  DataSource: Symbol.for("DataSource"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  RedisClient: Symbol.for("RedisClient"),
  ImageProcessingQueue: Symbol.for("ImageProcessingQueue"),
  AttachmentService: Symbol.for("AttachmentService"),
  IdentitySyncConsumer: Symbol.for("IdentitySyncConsumer"),
} as const;
