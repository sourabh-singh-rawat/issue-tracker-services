import type { HttpRequest } from "@pine/server";
import type { GraphQLContext } from "@pine/server";
import { HttpIdentityClient } from "@pine/identity";
import { env } from "@/bootstrap/env";

const identityClient = new HttpIdentityClient({ baseUrl: env.IDENTITY_SERVICE_URL });

const BEARER_PREFIX = /^Bearer\s+/i;

const resolveUser = async (request: HttpRequest): Promise<GraphQLContext["user"]> => {
  const authorization = request.headers.authorization;
  const headerToken = authorization ? authorization.replace(BEARER_PREFIX, "").trim() : "";
  const cookieToken = request.cookies.accessToken;
  const accessToken =
    headerToken.length > 0
      ? headerToken
      : typeof cookieToken === "string" && cookieToken.length > 0
        ? cookieToken
        : null;

  if (accessToken) {
    const identity = await identityClient.getIdentityViaAccessToken(accessToken);
    if (identity) {
      return { id: identity.id, authMethod: "access_token" };
    }
  }

  const cookieHeader = request.headers.cookie;
  if (cookieHeader && (request.cookies.session || /(?:^|;\s*)session=/.test(cookieHeader))) {
    const identity = await identityClient.getIdentityViaSession(cookieHeader);
    if (identity) {
      return { id: identity.id, authMethod: "session" };
    }
  }

  return undefined;
};

export type IssuesContext = GraphQLContext;

export const createContext = async (request: HttpRequest): Promise<IssuesContext> => {
  const user = await resolveUser(request);

  return {
    cookies: request.cookies,
    headers: request.headers,
    ...(user ? { user } : {}),
  };
};
