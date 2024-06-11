import { Auth } from "@issue-tracker/security";
import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { RegisteredServices } from "..";
import { AwilixDi } from "@issue-tracker/server-core";

export const identityRoutes =
  (container: AwilixDi<RegisteredServices>) =>
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    const controller = container.get("identityController");
    const { requireTokens, requireNoAuth } = Auth;
    const noAuth: RouteShorthandOptions = { preHandler: [requireNoAuth] };
    const auth: RouteShorthandOptions = { preHandler: [requireTokens] };

    fastify.post("/generate-tokens", noAuth, controller.generateTokens);
    fastify.post("/refresh-tokens", auth, controller.refreshTokens);
    fastify.post("/revoke-tokens", auth, controller.revokeTokens);

    done();
  };
