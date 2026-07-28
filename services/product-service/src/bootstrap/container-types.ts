export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  MeService: Symbol.for("IMeService"),
  BrandRepository: Symbol.for("IBrandRepository"),
  BrandService: Symbol.for("IBrandService"),
  ProductRepository: Symbol.for("IProductRepository"),
  ProductUnitRepository: Symbol.for("IProductUnitRepository"),
  ProductService: Symbol.for("IProductService"),
} as const;
