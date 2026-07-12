import "./env";
import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import { QUEUE } from "@issue-tracker/common";
import { Auth } from "@issue-tracker/security";
import { AwilixDi, CoreHttpServer } from "@issue-tracker/server-core";
import { Worker } from "bullmq";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import sharp from "sharp";
import { v4 } from "uuid";
import {
  RegisteredServices,
  adminStorage,
  broker,
  container,
  dataSource,
  logger,
  redisClient,
} from "./container";
import { Attachment } from "./features/attachment";
import { createContext } from "./graphql";
import { schema } from "./graphql/schema";

export { builder, createContext } from "./graphql";
export type { AttachmentContext } from "./graphql";
export { schema } from "./graphql/schema";
export { container, dataSource } from "./container";

const startServer = async (di: AwilixDi<RegisteredServices>) => {
  const instance = fastify();
  const apollo = new ApolloServer<any>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  await instance.register(multipart, { limits: { fileSize: 32000000 } });

  const server = new CoreHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: process.env.ATTACHMENT_SERVICE_PORT
        ? parseInt(process.env.ATTACHMENT_SERVICE_PORT)
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
    routes: [
      {
        url: "/attachments/:issueId",
        method: "POST",
        schema: {
          tags: ["attachment"],
          summary: "Create a new issue attachment",
          description: "Create a new issue attachment",
          body: { type: "string" },
          consumes: ["multipart/form-data"],
          operationId: "createAttachment",
          response: {
            201: { type: "string", description: "Created successfully" },
            500: { type: "string", description: "Bad request" },
          },
        },
        preHandler: [Auth.setCurrentUser, Auth.requireAuth],
        handler: async (req: FastifyRequest, res: FastifyReply) => {
          const controller = di.get("attachmentController");
          await controller.createAttachment(req, res);
        },
      },
    ],
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
      tags: [
        { name: "attachment", description: "Attachment related end-points" },
      ],
    },
  });

  await server.start();

  const openapi = instance.swagger({ yaml: true });
  writeFileSync("./schema.yaml", openapi);
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
      const {
        issueId,
        userId,
        file,
        filename: originalFilename,
        mimetype,
      } = data;
      const sharpedFile = sharp(file);
      const contentType = mimetype;
      const sizes = { small: { width: 250 }, large: { width: 1200 } };
      const thumbnail = await sharpedFile.resize(sizes.small.width).toBuffer();
      const image = await sharpedFile.resize(sizes.large.width).toBuffer();
      const filename = v4();
      const thumbnailLink = `attachments/${issueId}/${filename}-small`;
      const imageLink = `attachments/${issueId}/${filename}-large`;

      await adminStorage.file(thumbnailLink).save(thumbnail, { contentType });
      await adminStorage.file(imageLink).save(image, { contentType });

      const AttachmentRepo = dataSource.manager.getRepository(Attachment);

      await AttachmentRepo.save({
        issueId,
        ownerId: userId,
        contentType,
        thumbnailLink,
        imageLink,
        bucket: "issue-tracker-66803.appspot.com",
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
    console.log(`Image uploaded successfully`);
  });
  imageProcessingWorker.on("failed", (error) => {
    console.log(error);
    console.log("Failed to upload image");
  });
};

const main = async () => {
  await dataSource.initialize();
  await broker.init();
  container.init();

  writeFileSync(
    "./schema.graphql",
    printSchema(lexicographicSortSchema(schema)),
  );

  await startServer(container);
  startSubscriptions();
  startWorker();
};

main().catch((error) => {
  console.log(error);
});
