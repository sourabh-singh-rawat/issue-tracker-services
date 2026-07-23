import "./env";
import "reflect-metadata";

import { ApolloServer, BaseContext } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import { QUEUE } from "@pine/common";
import { CoreHttpServer } from "@pine/server-core";
import { Worker } from "bullmq";
import fastify from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { lexicographicSortSchema, printSchema } from "graphql";
import sharp from "sharp";
import { v4 } from "uuid";
import { broker, dataSource, logger, redisClient } from "@/bootstrap";
import { Attachment } from "./features/attachment";
import { createContext } from "./graphql";
import { schema } from "./graphql/schema";
import { routes } from "./routes";

export { builder, createContext } from "./graphql";
export type { AttachmentContext } from "./graphql";
export { schema } from "./graphql/schema";
export { container, dataSource } from "@/bootstrap";

const startServer = async () => {
  const instance = fastify();
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  await instance.register(multipart, { limits: { fileSize: 32000000 } });

  const server = new CoreHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: process.env.ATTACHMENT_SERVICE_PORT
        ? Number.parseInt(process.env.ATTACHMENT_SERVICE_PORT)
        : 5002,
      environment: "development",
      version: 1,
    },
    cors: {
      credentials: true,
      origin: process.env.ISSUE_TRACKER_CLIENT_URL || "http://localhost:3000",
    },
    graphql: { apollo, createContext, path: "/graphql" },
    cookie: { secret: process.env.JWT_SECRET! },
    routes,
  });

  await instance.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Attachment Service",
        version: "0.0.1",
        license: {
          name: "ISC",
          url: "https://opensource.org/license/isc-license-txt",
        },
      },
      servers: [{ url: "http://localhost:4003" }],
      tags: [{ name: "attachment", description: "Attachment related end-points" }],
    },
  });

  await server.start();

  const openapi = instance.swagger({ yaml: false });
  const openapiPath = path.join(process.cwd(), "dist", "openapi.json");
  mkdirSync(path.dirname(openapiPath), { recursive: true });
  writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));
};

const startSubscriptions = () => {};

export const startWorker = () => {
  interface ImageProcessingWorkerData {
    issueId: string;
    userId: string;
    file: Buffer;
    filename: string;
    mimetype: string;
  }

  const imageProcessingWorker = new Worker<ImageProcessingWorkerData>(
    QUEUE.IMAGE_PROCESSING,
    async ({ data }) => {
      const { issueId, userId, file, filename: originalFilename, mimetype } = data;
      const sharpedFile = sharp(file);
      const contentType = mimetype;
      const sizes = { small: { width: 250 }, large: { width: 1200 } };
      await sharpedFile.resize(sizes.small.width).toBuffer();
      await sharpedFile.resize(sizes.large.width).toBuffer();
      const filename = v4();
      const thumbnailLink = `attachments/${issueId}/${filename}-small`;
      const imageLink = `attachments/${issueId}/${filename}-large`;

      const AttachmentRepo = dataSource.manager.getRepository(Attachment);

      await AttachmentRepo.save({
        issueId,
        ownerId: userId,
        contentType,
        thumbnailLink,
        imageLink,
        bucket: "",
        filename,
        originalFilename,
      });
    },
    { connection: redisClient },
  );

  imageProcessingWorker.on("ready", () => {
    logger.info("Image processing worker is ready");
  });
  imageProcessingWorker.on("completed", () => {
    console.log(`Image processed successfully`);
  });
  imageProcessingWorker.on("failed", (error) => {
    console.log(error);
    console.log("Failed to process image");
  });
};

const main = async () => {
  await dataSource.initialize();
  await broker.init();

  const schemaPath = path.join(process.cwd(), "dist", "schema.graphql");
  mkdirSync(path.dirname(schemaPath), { recursive: true });
  writeFileSync(schemaPath, printSchema(lexicographicSortSchema(schema)));

  await startServer();
  startSubscriptions();
  startWorker();
};

main().catch((error) => {
  console.log(error);
});
