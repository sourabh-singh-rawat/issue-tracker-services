export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  IdentitySyncConsumer: Symbol.for("IdentitySyncConsumer"),
  MeService: Symbol.for("IMeService"),
  BrandRepository: Symbol.for("IBrandRepository"),
  BrandSyncConsumer: Symbol.for("BrandSyncConsumer"),
  ProductRepository: Symbol.for("IProductRepository"),
  ProductUnitRepository: Symbol.for("IProductUnitRepository"),
  ProductSyncConsumer: Symbol.for("ProductSyncConsumer"),
} as const;
