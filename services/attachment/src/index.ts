import { config } from "dotenv";
config({ path: "../../.env" });

import { ApolloServer } from "@apollo/server";
import { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import { QUEUE } from "@issue-tracker/common";
import { Broker } from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { Auth, JwtToken } from "@issue-tracker/security";
import {
  AwilixDi,
  CoreHttpServer,
  CoreLogger,
  Logger,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { Queue, Worker } from "bullmq";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { writeFileSync } from "fs";
import Redis from "ioredis";
import pino from "pino";
import sharp from "sharp";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { v4 } from "uuid";
import {
  AttachmentController,
  CoreAttachmentController,
  CoreAttachmentResolver,
} from "./api";
import { AttachmentService, CoreAttachmentService } from "./app";
import {
  adminStorage,
  broker,
  dataSource,
  imageProcessingQueue,
  redisClient,
} from "./config";
import { Attachment } from "./data";

export const logger = new CoreLogger(
  pino({ transport: { target: "pino-pretty" } }),
);

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  broker: Broker;
  orm: Typeorm;
  attachmentController: AttachmentController;
  attachmentService: AttachmentService;
  redisClient: Redis;
  imageProcessingQueue: Queue;
}

const awilix = createContainer({ injectionMode: InjectionMode.CLASSIC });
export const container = new AwilixDi<RegisteredServices>(awilix, logger);
container.add("logger", asValue(logger));
container.add("dataSource", asValue(dataSource));
container.add("redisClient", asValue(redisClient));
container.add("eventBus", asValue(broker));
container.add("imageProcessingQueue", asValue(imageProcessingQueue));
container.add("attachmentController", asClass(CoreAttachmentController));
container.add("attachmentService", asClass(CoreAttachmentService));

const createContext: ApolloFastifyContextFunction<any> = async (req, rep) => {
  const { accessToken } = req.cookies;

  let token: any;
  if (accessToken) {
    try {
      token = JwtToken.verify(accessToken, process.env.JWT_SECRET!);
    } catch (error) {
      console.log(error);
    }
  }

  token;

  if (token) {
    return { req, rep, user: { email: token.email, userId: token.userId } };
  }

  return { req, rep };
};

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const instance = fastify();
    const schema = await buildSchema({
      emitSchemaFile: true,
      resolvers: [CoreAttachmentResolver],
    });
    const apollo = new ApolloServer({ schema });

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
      cors: { credentials: true, origin: "http://localhost:3000" },
      graphql: { apollo, createContext, path: "/graphql" },
      cookie: { secret: process.env.JWT_SECRET! },
      routes: [
        {
          url: "/attachments/:itemId",
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
            const controller = container.get("attachmentController");

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
        servers: [{ url: "http://localhost:5000" }],
        tags: [
          { name: "attachment", description: "Attachment related end-points" },
        ],
      },
    });
    await server.start();
    const openapi = instance.swagger({ yaml: true });
    writeFileSync("./schema.yaml", openapi);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {};

export const startWorker = () => {
  interface ImageProcessingWorkerData {
    itemId: string;
    userId: string;
    file: Buffer;
    filename: string;
    mimetype: string;
  }

  const imageProcessingWorker = new Worker<ImageProcessingWorkerData>(
    QUEUE.IMAGE_PROCESSING,
    async ({ data }) => {
      const {
        itemId,
        userId,
        file,
        filename: originalFilename,
        mimetype,
      } = data;
      const sharpedFile = sharp(Buffer.from(file));
      const contentType = mimetype;
      const sizes = { small: { width: 250 }, large: { width: 1200 } };
      const thumbnail = await sharpedFile.resize(sizes.small.width).toBuffer();
      const image = await sharpedFile.resize(sizes.large.width).toBuffer();
      const filename = v4();
      const thumbnailLink = `attachments/${itemId}/${filename}-small`;
      const imageLink = `attachments/${itemId}/${filename}-large`;

      await adminStorage.file(thumbnailLink).save(thumbnail, { contentType });
      await adminStorage.file(imageLink).save(image, { contentType });

      const AttachmentRepo = dataSource.manager.getRepository(Attachment);

      await AttachmentRepo.save({
        itemId,
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

  await startServer(container);
  startSubscriptions();

  startWorker();
};

main();
