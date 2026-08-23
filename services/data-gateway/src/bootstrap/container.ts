import type { IHttpServer } from "@pine/server";
import { Container } from "inversify";
import { TYPES } from "./container-types";
import { createHttpServer } from "./http-server";

export const container = new Container({ defaultScope: "Singleton" });

export const bindHttpServer = async (): Promise<void> => {
  const httpServer = await createHttpServer();
  container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(httpServer);
};
