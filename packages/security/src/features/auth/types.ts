import type { AccessToken } from "../crypto";

declare module "fastify" {
  interface FastifyRequest {
    user: AccessToken;
  }
}
