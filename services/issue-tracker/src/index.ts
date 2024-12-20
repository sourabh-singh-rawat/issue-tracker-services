import { config } from "dotenv";
config({ path: "../../.env" });

import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import { Environment } from "@issue-tracker/common";
import {
  Broker,
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { JwtToken } from "@issue-tracker/security";
import {
  AwilixDi,
  CoreHttpServer,
  CoreLogger,
  Logger,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import fastify from "fastify";
import GraphQLJSON from "graphql-type-json";
import pino from "pino";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import {
  CoreCustomFieldResolver,
  CoreItemResolver,
  CoreListResolver,
  CoreSpaceResolver,
  CoreStatusResolver,
  CoreWorkspaceResolver,
} from "./api/resolvers";
import {
  CoreCustomFieldService,
  CoreItemService,
  CoreListService,
  CoreSpaceService,
  CoreStatusService,
  CoreUserService,
  CoreWorkspaceService,
  CustomFieldService,
  ItemService,
  ListService,
  SpaceService,
  StatusService,
  UserService,
  WorkspaceService,
} from "./app";
import { ProjectActivityService } from "./app/services/interfaces/project-activity.service";
import { UserEmailVerifiedSubscriber } from "./subscribers";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  orm: Typeorm;
  broker: Broker;
  userService: UserService;
  itemService: ItemService;
  listService: ListService;
  fieldService: CustomFieldService;
  statusService: StatusService;
  projectActivityService: ProjectActivityService;
  workspaceService: WorkspaceService;
  spaceService: SpaceService;
  userEmailVerifiedSubscriber: UserEmailVerifiedSubscriber;
  publisher: Publisher<Subjects>;
}

const logger = new CoreLogger(pino({ transport: { target: "pino-pretty" } }));

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

  if (token) {
    return { req, rep, user: { email: token.email, userId: token.userId } };
  }

  return { req, rep };
};

export const postgres = new DataSource({
  type: "postgres",
  url: process.env.ISSUE_TRACKER_POSTGRES_CLUSTER_URL,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixDi<RegisteredServices>(awilix, logger);

const main = async () => {
  const orm = new PostgresTypeorm(postgres, logger);
  await orm.init();

  const natsBroker = new NatsBroker({
    servers: [process.env.NATS_CLUSTER_URL!],
    streams: ["issue", "workspace", "project", "user"],
    logger,
  });
  await natsBroker.init();

  container.add("logger", asValue(logger));
  container.add("dataSource", asValue(postgres));
  container.add("orm", asValue(orm));
  container.add("broker", asValue(natsBroker));
  container.add("userService", asClass(CoreUserService));
  container.add("itemService", asClass(CoreItemService));
  container.add("statusService", asClass(CoreStatusService));
  container.add("fieldService", asClass(CoreCustomFieldService));
  container.add("spaceService", asClass(CoreSpaceService));
  container.add("listService", asClass(CoreListService));
  container.add("workspaceService", asClass(CoreWorkspaceService));
  container.add(
    "userEmailVerifiedSubscriber",
    asClass(UserEmailVerifiedSubscriber),
  );
  container.add("publisher", asClass(NatsPublisher));
  container.init();

  const instance = fastify();
  const schema = await buildSchema({
    emitSchemaFile: true,
    scalarsMap: [{ type: Object, scalar: GraphQLJSON }],
    resolvers: [
      CoreWorkspaceResolver,
      CoreSpaceResolver,
      CoreListResolver,
      CoreItemResolver,
      CoreStatusResolver,
      CoreCustomFieldResolver,
    ],
  });
  const plugins = [fastifyApolloDrainPlugin(instance)];
  const apollo = new ApolloServer({ schema, plugins });

  const httpServer = new CoreHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: parseInt(process.env.ISSUE_TRACKER_SERVICE_PORT!),
      environment: process.env.NODE_ENV as Environment,
      version: 1,
    },
    cors: { credentials: true, origin: process.env.ISSUE_TRACKER_CLIENT_URL },
    cookie: { secret: process.env.JWT_SECRET! },
    graphql: { apollo, path: "/graphql", createContext },
    logger,
  });
  await httpServer.start();

  container.get("userEmailVerifiedSubscriber").fetchMessages();
};

main();
