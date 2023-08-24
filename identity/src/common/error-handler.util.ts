import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const handleError = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  console.log(error);

  return reply.send(
    "Fastify's global error handler responds with something went wrong",
  );
};
