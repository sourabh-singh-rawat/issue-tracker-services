import { config } from "dotenv";
config({ path: "../../.env" });

import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import { JwtToken } from "@issue-tracker/security";
import {
  AppContext,
  AwilixDi,
  FastifyServer,
} from "@issue-tracker/server-core";
import fastify from "fastify";
import { buildSchema } from "type-graphql";
import { CoreUserAuthenticationResolver } from "./api";
import { RegisteredServices, broker, container, dataSource } from "./config";

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
