export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  MeService: Symbol.for("IMeService"),
  BrandRepository: Symbol.for("IBrandRepository"),
  BrandCreatedSubscriber: Symbol.for("BrandCreatedSubscriber"),
  BrandUpdatedSubscriber: Symbol.for("BrandUpdatedSubscriber"),
  ProductRepository: Symbol.for("IProductRepository"),
  ProductCreatedSubscriber: Symbol.for("ProductCreatedSubscriber"),
} as const;
