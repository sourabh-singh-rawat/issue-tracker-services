import type { HttpHook, HttpRequest } from "@pine/server";
import { getIdentityFromAccessToken } from "./getIdentityFromAccessToken";
import { getSession } from "./getSession";

const BEARER_PREFIX = /^Bearer\s+/i;

const extractBearerToken = (request: HttpRequest): string | null => {
  const authorization = request.headers.authorization;
  if (authorization) {
    const token = authorization.replace(BEARER_PREFIX, "").trim();
    if (token.length > 0) {
      return token;
    }
  }

  const cookieToken = request.cookies.accessToken;
  if (typeof cookieToken === "string" && cookieToken.length > 0) {
    return cookieToken;
  }

  return null;
};

export const authenticateBearer: HttpHook = async (request) => {
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
    authMethod: "access_token",
  };
};

export const authenticateSession: HttpHook = async (request) => {
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) {
    return;
  }

  if (!request.cookies.session && !/(?:^|;\s*)session=/.test(cookieHeader)) {
    return;
  }

  const identity = await getSession(cookieHeader);
  if (!identity) {
    return;
  }

  request.user = {
    id: identity.id,
    authMethod: "session",
  };
};

export const authenticate: HttpHook = async (request) => {
  await authenticateBearer(request);
  if (request.user) {
    return;
  }

  await authenticateSession(request);
};
