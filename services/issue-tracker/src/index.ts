import { config } from "dotenv";
config({ path: "../../.env" });

import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
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
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import fastify from "fastify";
import GraphQLJSON from "graphql-type-json";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import {
  CoreFieldResolver,
  CoreItemResolver,
  CoreListResolver,
  CoreSpaceResolver,
  CoreStatusResolver,
  CoreWorkspaceResolver,
} from "./api/resolvers";
import {
  CoreFieldService,
  CoreItemService,
  CoreListService,
  CoreSpaceService,
  CoreStatusService,
  CoreUserService,
  CoreWorkspaceService,
  FieldService,
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
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  broker: Broker;
  userService: UserService;
  itemService: ItemService;
  listService: ListService;
  fieldService: FieldService;
  statusService: StatusService;
  projectActivityService: ProjectActivityService;
  workspaceService: WorkspaceService;
  spaceService: SpaceService;
  userEmailVerifiedSubscriber: UserEmailVerifiedSubscriber;
  publisher: Publisher<Subjects>;
}

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

const startServer = async () => {
  try {
    const instance = fastify();
    const schema = await buildSchema({
      emitSchemaFile: true,
      scalarsMap: [
        {
          type: Object,
          scalar: GraphQLJSON,
        },
      ],
      resolvers: [
        CoreWorkspaceResolver,
        CoreSpaceResolver,
        CoreListResolver,
        CoreItemResolver,
        CoreStatusResolver,
        CoreFieldResolver,
      ],
    });
    const apollo = new ApolloServer({
      schema,
      plugins: [fastifyApolloDrainPlugin(instance)],
    });
    await apollo.start();

    const server = new FastifyServer({
      fastify: instance,
      configuration: {
        host: "0.0.0.0",
        port: 5001,
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
      routes: [
        // { route: issueRoutes(container) },
        // { route: issueCommentRoutes(container) },
        // { route: issueTaskRoutes(container) },
        // { route: projectRoutes(container) },
        // { route: projectActivityRoutes(container) },
        // { route: workspaceRoutes(container) },
      ],
    });
    instance.route({
      url: "/api/graphql",
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });
    server.init();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userEmailVerifiedSubscriber").fetchMessages();
};

export const dataSource = new DataSource({
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
  const orm = new PostgresTypeorm(dataSource, logger);
  await orm.init();

  const natsBroker = new NatsBroker({
    servers: [process.env.NATS_CLUSTER_URL!],
    streams: ["issue", "workspace", "project", "user"],
    logger,
  });
  await natsBroker.init();

  container.add("logger", asValue(logger));
  container.add("dataSource", asValue(dataSource));
  container.add("orm", asValue(orm));
  container.add("broker", asValue(natsBroker));
  container.add("userService", asClass(CoreUserService));
  container.add("itemService", asClass(CoreItemService));
  container.add("statusService", asClass(CoreStatusService));
  container.add("fieldService", asClass(CoreFieldService));
  container.add("spaceService", asClass(CoreSpaceService));
  container.add("listService", asClass(CoreListService));
  container.add("workspaceService", asClass(CoreWorkspaceService));
  container.add(
    "userEmailVerifiedSubscriber",
    asClass(UserEmailVerifiedSubscriber),
  );
  container.add("publisher", asClass(NatsPublisher));

  container.init();

  await startServer();
  startSubscriptions(container);
};

main();
