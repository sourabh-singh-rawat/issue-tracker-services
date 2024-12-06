import { config } from "dotenv";
config({ path: "../../.env" });

import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import { QUEUE } from "@issue-tracker/common";
import { Auth, JwtToken } from "@issue-tracker/security";
import {
  AppContext,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { Worker } from "bullmq";
import fastify from "fastify";
import { writeFileSync } from "fs";
import sharp from "sharp";
import { buildSchema } from "type-graphql";
import { v4 } from "uuid";
import { CoreAttachmentResolver } from "./api";
import {
  RegisteredServices,
  adminStorage,
  broker,
  container,
  dataSource,
  redisClient,
} from "./config";
import { Attachment } from "./data";

const createContext: ApolloFastifyContextFunction<AppContext> = async (
  req,
  rep,
) => {
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
    await apollo.start();

    await instance.register(multipart, { limits: { fileSize: 32000000 } });

    const server = new FastifyServer({
      fastify: instance,
      configuration: {
        host: "0.0.0.0",
        port: process.env.ATTACHMENT_SERVICE_PORT
          ? parseInt(process.env.ATTACHMENT_SERVICE_PORT)
          : 5002,
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
      routes: [
        {
          route: (fastify, _options, done) => {
            fastify.route({
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
              handler: async (req, res) => {
                const controller = container.get("attachmentController");

                await controller.createAttachment(req, res);
              },
            });
            done();
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
    instance.route({
      url: "/api/graphql",
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });
    await server.init();
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
