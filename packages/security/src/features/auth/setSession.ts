import type { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/cookie";
import { JwtToken, isAccessToken } from "../crypto";
import "./types";

export const setSession = async (request: FastifyRequest, _reply: FastifyReply) => {
  const accessToken = request.cookies.accessToken;
  if (!accessToken) {
    return;
  }

  try {
    const payload = await JwtToken.verify(accessToken, process.env.JWT_SECRET!);
    if (isAccessToken(payload)) {
      request.user = payload;
    }
  } catch {
    // ignore invalid / expired tokens
  }
};

export const setCurrentUser = setSession;
