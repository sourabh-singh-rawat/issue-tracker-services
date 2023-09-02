import { FastifyReply, FastifyRequest } from "fastify";
import { UserDetailDto } from "../../dtos/user/user-detail.dto";

export interface UserController {
  create(req: FastifyRequest, res: FastifyReply): Promise<void>;
  getCurrentUser(
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<UserDetailDto | null>;
  login(req: FastifyRequest, res: FastifyReply): Promise<void>;
  updateEmail(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  // updatePassword(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  // delete(): void;
  // list(): void;
}
