import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  HookHandlerDoneFunction,
  HTTPMethods,
  RouteHandler,
} from "fastify";

export type Prehandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => void;

export abstract class Router {
  constructor(
    private readonly instance: FastifyInstance,
    private readonly preHandler: Prehandler[],
  ) {}

  public createRoute = async (
    method: HTTPMethods,
    url: string,
    handler: RouteHandler,
    schema?: FastifySchema,
  ) => {
    this.instance.route({
      method,
      url,
      preHandler: this.preHandler,
      handler,
      schema,
    });
  };
}
