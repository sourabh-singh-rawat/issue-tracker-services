import "reflect-metadata";

import { config } from "dotenv";
config({ path: "../../.env" });

import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import {
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import { JwtToken } from "@issue-tracker/security";
import {
  AppContext,
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import fastify from "fastify";
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
      throw error;
    }
  }

  if (token) {
    return { req, rep, user: { email: token.email, userId: token.userId } };
  }

  return { req, rep };
};

const startServer = async () => {
  try {
    const schema = await buildSchema({
      emitSchemaFile: true,
      resolvers: [CoreUserAuthenticationResolver],
    });
    const instance = fastify();
    const apollo = new ApolloServer<any>({
      schema,
      plugins: [fastifyApolloDrainPlugin(instance)],
    });
    await apollo.start();

    const server = new FastifyServer({
      fastify: instance,
      configuration: {
        host: "0.0.0.0",
        port: parseInt(process.env.AUTH_SERVICE_PORT!),
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
    });
    instance.route({
      url: "/api/graphql",
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });

    await server.init();
  } catch (error) {
    process.exit(1);
  }
};

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["user"],
  logger,
});

export interface RegisteredServices {
  dataSource: DataSource;
  logger: AppLogger;
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

  await startServer();
  startSubscriptions(container);
};

main().catch((error) => {
  console.log(error);
});
