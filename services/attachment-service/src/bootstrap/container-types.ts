export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  HttpServer: Symbol.for("IHttpServer"),
  RedisClient: Symbol.for("RedisClient"),
  ImageProcessingQueue: Symbol.for("ImageProcessingQueue"),
  AttachmentService: Symbol.for("AttachmentService"),
  AttachmentRepository: Symbol.for("IAttachmentRepository"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  AttachmentIdentitySyncConsumer: Symbol.for("AttachmentIdentitySyncConsumer"),
} as const;
