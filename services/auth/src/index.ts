import "reflect-metadata";

import { config } from "dotenv";
config({ path: "../../.env" });

import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import {
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import { JwtToken } from "@issue-tracker/security";
import {
  AwilixDi,
  CoreHttpServer,
  CoreLogger,
  Logger,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import fastify from "fastify";
import pino from "pino";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { CoreUserAuthenticationResolver } from "./api";
import {
  CoreUserAuthenticationService,
  CoreUserProfileService,
  UserAuthenticationService,
  UserEmailConfirmationSentSubscriber,
  UserProfileService,
} from "./app";

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userEmailConfirmationSentSubscriber").fetchMessages();
};

const logger = new CoreLogger(pino({ transport: { target: "pino-pretty" } }));

const createContext: ApolloFastifyContextFunction<any> = async (req, rep) => {
  const { accessToken } = req.cookies;

  let token: any;
  if (accessToken) {
    try {
      token = JwtToken.verify(accessToken, process.env.JWT_SECRET!);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  if (token) {
    return { req, rep, user: { email: token.email, userId: token.userId } };
  }

  return { req, rep };
};

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["user"],
  logger,
});

export interface RegisteredServices {
  dataSource: DataSource;
  logger: Logger;
  publisher: Publisher<Subjects>;
  userEmailConfirmationSentSubscriber: UserEmailConfirmationSentSubscriber;
  userAuthenticationService: UserAuthenticationService;
  userProfileService: UserProfileService;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const container = new AwilixDi<RegisteredServices>(awilix, logger);
export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.AUTH_POSTGRES_CLUSTER_URL,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

container.add("dataSource", asValue(dataSource));
container.add("logger", asValue(logger));
container.add("broker", asValue(broker));
container.add("publisher", asClass(NatsPublisher));
container.add(
  "userAuthenticationService",
  asClass(CoreUserAuthenticationService),
);
container.add("userProfileService", asClass(CoreUserProfileService));
container.add(
  "userEmailConfirmationSentSubscriber",
  asClass(UserEmailConfirmationSentSubscriber),
);

const main = async () => {
  await dataSource.initialize();
  await broker.init();
  container.init();

  const schema = await buildSchema({
    emitSchemaFile: true,
    resolvers: [CoreUserAuthenticationResolver],
  });
  const instance = fastify();
  const apollo = new ApolloServer<any>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  const server = new CoreHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: parseInt(process.env.AUTH_SERVICE_PORT!),
      environment: "development",
      version: 1,
    },
    cors: { credentials: true, origin: process.env.ISSUE_TRACKER_CLIENT_URL },
    cookie: { secret: process.env.JWT_SECRET! },
    graphql: { apollo, path: "/graphql", createContext },
    logger,
  });

  await server.start();
  startSubscriptions(container);
};

main().catch((error) => {
  console.log(error);
});
