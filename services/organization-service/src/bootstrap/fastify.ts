import fastify, { type FastifyInstance } from "fastify";

export const createFastify = (): FastifyInstance => {
  return fastify();
};

export const fastifyServer = createFastify();
