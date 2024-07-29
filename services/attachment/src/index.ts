import "dotenv/config";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { DataSource } from "typeorm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { IssueAttachmentController } from "./controllers/interfaces/issue-attachment.controller";
import { IssueAttachmentService } from "./services/interfaces/issue-attachment.service";
import swagger from "@fastify/swagger";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { CoreIssueAttachmentController } from "./controllers/core-issue-attachment.controller";
import { CoreIssueAttachmentService } from "./services/core-issue-attachment.service";
import { issueAttachmentRoutes } from "./routes/issue-attachment.routes";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";
import { IssueAttachmentRepository } from "./data/repositories/interfaces/issue-attachment.repository";
import { PostgresIssueAttachmentRepository } from "./data/repositories/postgres-issue-attachment.repository";
import { writeFile } from "fs";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  eventBus: EventBus;
  orm: Typeorm;
  issueAttachmentController: IssueAttachmentController;
  issueAttachmentService: IssueAttachmentService;
  issueAttachmentRepository: IssueAttachmentRepository;
}

const firebaseApp = initializeApp({
  // credential: cert("../.env.json"),
  storageBucket: "issue-tracker-66803.appspot.com",
});

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp).bucket();

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      configuration: {
        host: "0.0.0.0",
        port: 4003,
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
      routes: [{ route: issueAttachmentRoutes(container) }],
    });
    const fastify = server.instance;
    fastify.register(swagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "Storage Service",
          version: "1.0.0",
          description: "Storage service",
          license: {
            name: "ISC",
            url: "https://github.com/sourabh-singh-rawat/issue-tracker/blob/master/LICENSE",
          },
        },
        servers: [
          { url: "https://localhost:443", description: "development server" },
        ],
        tags: [],
        components: {
          securitySchemes: {
            cookieAuth: { type: "apiKey", in: "cookie", name: "accessToken" },
          },
        },
        security: [],
      },
    });
    fastify.addSchema({
      $id: "errorSchema",
      type: "object",
      properties: {
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              message: { type: "string" },
              field: { type: "string" },
            },
            required: ["message"],
          },
        },
      },
    });

    server.init();
    await fastify.ready();
    const files = fastify.swagger();
    writeFile(
      "../../clients/issue-tracker/src/api/generated/storage.openapi.json",
      JSON.stringify(files),
      (err) => {
        err;
      },
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {};

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/data/entities/*.ts"],
    synchronize: true,
  });

  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const eventBus = new NatsEventBus({
    servers: [process.env.NATS_SERVER_URL || "nats"],
    logger,
  });
  await eventBus.init();

  const awilix = createContainer<RegisteredServices>({
    injectionMode: InjectionMode.CLASSIC,
  });
  const container = new AwilixDi<RegisteredServices>(awilix, logger);
  const { add } = container;
  add("logger", asValue(logger));
  add("dataSource", asValue(dataSource));
  add("orm", asValue(orm));
  add("eventBus", asValue(eventBus));
  add("issueAttachmentController", asClass(CoreIssueAttachmentController));
  add("issueAttachmentService", asClass(CoreIssueAttachmentService));
  add("issueAttachmentRepository", asClass(PostgresIssueAttachmentRepository));
  await container.init();

  await startServer(container);
  startSubscriptions();
};

main();
