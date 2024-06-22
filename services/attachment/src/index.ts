import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { DataSource } from "typeorm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { IssueAttachmentController } from "./controllers/interfaces/issue-attachment.controller";
import { IssueAttachmentService } from "./services/interfaces/issue-attachment.service";
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
import { initializeApp, cert } from "firebase-admin/app";
import { IssueAttachmentRepository } from "./data/repositories/interfaces/issue-attachment.repository";
import { PostgresIssueAttachmentRepository } from "./data/repositories/postgres-issue-attachment.repository";

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
  credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
  storageBucket: "issue-tracker-66803.appspot.com",
});

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp).bucket();

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/attachments",
          route: issueAttachmentRoutes(container),
        },
      ],
    });

    server.init();
  } catch (error) {
    process.exit(1);
  }
};

const startSubscriptions = () => {};

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.host,
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    entities: ["src/data/entities/*.ts"],
    synchronize: true,
  });

  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const eventBus = new NatsEventBus({ servers: ["nats"] }, [], logger);
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
