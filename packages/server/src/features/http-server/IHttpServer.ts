export type IHttpServer = {
  start(): Promise<void>;
  stop(): Promise<void>;
  writeOpenApi(filePath: string): void;
  getOpenApiDocument(): object;
};
