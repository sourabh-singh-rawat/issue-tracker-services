export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  RedisClient: Symbol.for("RedisClient"),
  ImageProcessingQueue: Symbol.for("ImageProcessingQueue"),
  AttachmentService: Symbol.for("AttachmentService"),
  AttachmentRepository: Symbol.for("IAttachmentRepository"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  IdentitySyncConsumer: Symbol.for("IdentitySyncConsumer"),
} as const;
