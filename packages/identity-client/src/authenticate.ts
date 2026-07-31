import type { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/cookie";
import { getIdentityFromAccessToken } from "./getIdentityFromAccessToken";
import { getSession } from "./getSession";
import "./types";

const BEARER_PREFIX = /^Bearer\s+/i;

const extractBearerToken = (request: FastifyRequest): string | null => {
  const authorization = request.headers.authorization;
  if (authorization) {
    const token = authorization.replace(BEARER_PREFIX, "").trim();
    if (token.length > 0) {
      return token;
    }
  }

  const cookieToken = request.cookies?.accessToken;
  if (typeof cookieToken === "string" && cookieToken.length > 0) {
    return cookieToken;
  }

  return null;
};

export const authenticateBearer = async (
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> => {
  const accessToken = extractBearerToken(request);
  if (!accessToken) {
    return;
  }

  const identity = await getIdentityFromAccessToken(accessToken);
  if (!identity) {
    return;
  }

  request.user = {
    id: identity.id,
    email: identity.email,
    authMethod: "access_token",
  };
};

export const authenticateSession = async (
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> => {
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) {
    return;
  }

  if (!request.cookies?.session && !/(?:^|;\s*)session=/.test(cookieHeader)) {
    return;
  }

  const identity = await getSession(cookieHeader);
  if (!identity) {
    return;
  }

  request.user = {
    id: identity.id,
    email: identity.email,
    authMethod: "session",
  };
};

export const authenticate = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  await authenticateBearer(request, reply);
  if (request.user) {
    return;
  }

  await authenticateSession(request, reply);
};
