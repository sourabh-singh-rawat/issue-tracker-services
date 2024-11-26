import "dotenv/config";
import fastify from "fastify";
import Redis from "ioredis";
import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import { MultipartFile } from "@fastify/multipart";
import { Broker, NatsBroker } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { DataSource } from "typeorm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { IssueAttachmentController } from "./controllers/interfaces/issue-attachment.controller";
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
import { initializeApp } from "firebase-admin/app";
import { Queue } from "bullmq";
import { QUEUES } from "@issue-tracker/common";
import { Attachment } from "./data/entities";
import { buildSchema } from "type-graphql";
import { CoreAttachmentResolver } from "./resolvers";
import { JwtToken } from "@issue-tracker/security";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  broker: Broker;
  orm: Typeorm;
  issueAttachmentController: IssueAttachmentController;
  issueAttachmentService: AttachmentService;
  redisClient: Redis;
  imageProcessingQueue: Queue;
}

const firebaseApp = initializeApp({
  // credential: cert("../.env.json"),
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
      // routes: [{ route: issueAttachmentRoutes(container) }],
    });

    server.init();
    instance.route({
      url: "/graphql",
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });
  } catch (error) {
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
    file: MultipartFile;
    itemId: string;
    userId: string;
  }

  const imageProcessingWorker = new Worker<ImageProcessingWorkerData>(
    "process-and-upload-image",
    async ({ data }) => {
      const { itemId, userId, file } = data;
      const sharpedFile = sharp(await file.toBuffer());
      const contentType = file.mimetype;
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
        originalFilename: file.filename,
      });
    },
    { connection: redisClient },
  );

  imageProcessingWorker.on("ready", () => {
    logger.info("Image processing worker is ready");
  });
  imageProcessingWorker.on("completed", (job) => {
    console.log(`Image uploaded successfully`);
  });
  imageProcessingWorker.on("failed", () => {
    console.log("Failed to upload image");
  });
};

const main = async () => {
  const orm = new PostgresTypeorm(dataSource, logger);
  await orm.init();

  const broker = new NatsBroker({
    servers: [process.env.NATS_SERVER_URL || "nats"],
    logger,
  });
  await broker.init();

  const awilix = createContainer({ injectionMode: InjectionMode.CLASSIC });
  const container = new AwilixDi<RegisteredServices>(awilix, logger);
  container.add("logger", asValue(logger));
  container.add("dataSource", asValue(dataSource));
  container.add("redisClient", asValue(redisClient));
  container.add("orm", asValue(orm));
  container.add("eventBus", asValue(broker));
  container.add("imageProcessingQueue", asValue(imageProcessingQueue));
  container.add("issueAttachmentService", asClass(CoreAttachmentService));
  container.init();

  await startServer(container);
  startSubscriptions();

  startWorker();
};

main();
