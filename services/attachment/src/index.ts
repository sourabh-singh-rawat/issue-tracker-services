import "dotenv/config";
import fastify from "fastify";
import Redis from "ioredis";
import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import multipart, { MultipartFile } from "@fastify/multipart";
import { Broker, NatsBroker } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { DataSource } from "typeorm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { writeFileSync } from "fs";
import { AttachmentService } from "./services/interfaces/AttachmentService";
import { Worker } from "bullmq";
import sharp from "sharp";
import { v4 } from "uuid";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { CoreAttachmentService } from "./services/CoreAttachmentService";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { cert, initializeApp } from "firebase-admin/app";
import { Queue } from "bullmq";
import { QUEUES } from "@issue-tracker/common";
import { Attachment } from "./data/entities";
import { buildSchema } from "type-graphql";
import { CoreAttachmentResolver } from "./resolvers";
import { Auth, JwtToken } from "@issue-tracker/security";
import swagger from "@fastify/swagger";
import { AttachmentController, CoreAttachmentController } from "./controllers";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  broker: Broker;
  orm: Typeorm;
  attachmentController: AttachmentController;
  attachmentService: AttachmentService;
  redisClient: Redis;
  imageProcessingQueue: Queue;
}

const firebaseApp = initializeApp({
  credential: cert("./firebase.service-account.json"),
  storageBucket: "issue-tracker-66803.appspot.com",
});

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp).bucket();

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

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

export const redisClient = new Redis({
  host: process.env.ATTACHMENT_REDIS_HOST,
  port: process.env.ATTACHMENT_REDIS_PORT
    ? parseInt(process.env.ATTACHMENT_REDIS_PORT)
    : 6379,
  maxRetriesPerRequest: null,
});

const imageProcessingQueue = new Queue(QUEUES.IMAGE_PROCESSING, {
  connection: redisClient,
});

export const startWorker = () => {
  interface ImageProcessingWorkerData {
    itemId: string;
    userId: string;
    file: Buffer;
    filename: string;
    mimetype: string;
  }

  const imageProcessingWorker = new Worker<ImageProcessingWorkerData>(
    QUEUES.IMAGE_PROCESSING,
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
      const thumbnailPath = `attachments/${itemId}/${filename}-small`;
      const blobPath = `attachments/${itemId}/${filename}-large`;

      await adminStorage.file(thumbnailPath).save(thumbnail, { contentType });
      await adminStorage.file(blobPath).save(image, { contentType });

      const AttachmentRepo = dataSource.manager.getRepository(Attachment);

      await AttachmentRepo.save({
        itemId,
        ownerId: userId,
        contentType,
        thumbnailLink: thumbnailPath,
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

const orm = new PostgresTypeorm(dataSource, logger);
const broker = new NatsBroker({
  servers: [process.env.NATS_SERVER_URL || "nats"],
  logger,
});

const awilix = createContainer({ injectionMode: InjectionMode.CLASSIC });
export const container = new AwilixDi<RegisteredServices>(awilix, logger);
container.add("logger", asValue(logger));
container.add("dataSource", asValue(dataSource));
container.add("redisClient", asValue(redisClient));
container.add("orm", asValue(orm));
container.add("eventBus", asValue(broker));
container.add("imageProcessingQueue", asValue(imageProcessingQueue));
container.add("attachmentController", asClass(CoreAttachmentController));
container.add("attachmentService", asClass(CoreAttachmentService));

const main = async () => {
  await orm.init();
  await broker.init();

  container.init();

  await startServer(container);
  startSubscriptions();

  startWorker();
};

main();
