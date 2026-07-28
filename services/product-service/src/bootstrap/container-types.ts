export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  MeService: Symbol.for("IMeService"),
  BrandRepository: Symbol.for("IBrandRepository"),
  BrandService: Symbol.for("IBrandService"),
} as const;
