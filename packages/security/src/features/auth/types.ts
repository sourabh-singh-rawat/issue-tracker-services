export {};

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string; email?: string; authMethod: "access_token" | "session" };
  }
}
