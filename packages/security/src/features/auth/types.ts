export {};

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string; authMethod: "access_token" | "session" };
  }
}
