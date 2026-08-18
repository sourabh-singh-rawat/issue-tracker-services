import type { HttpRequest } from "@pine/server";
import { JwtToken, hasUserIdentity } from "@pine/security";
import type { GraphQLContext } from "@pine/server";
import { env } from "@/bootstrap/env";
import type { ISessionService } from "@/features/session/services";
import { InvalidCredentialError } from "@/integrations/identity";

export type AuthContext = GraphQLContext;

const toContext = (
  request: HttpRequest,
  user?: GraphQLContext["user"],
): AuthContext => ({
  cookies: request.cookies,
  headers: request.headers,
  ...(user ? { user } : {}),
});

export const createContext = async (request: HttpRequest): Promise<AuthContext> => {
  const accessToken = request.cookies.accessToken;

  if (accessToken) {
    const token = await JwtToken.verify(accessToken, env.JWT_SECRET);
    if (hasUserIdentity(token)) {
      return toContext(request, { id: token.userId, authMethod: "access_token" });
    }
  }

  const sessionToken = request.cookies.session;
  if (sessionToken) {
    const { container, TYPES } = await import("@/bootstrap");
    const sessionService = container.get<ISessionService>(TYPES.SessionService);
    const identity = await sessionService.getIdentityFromSessionToken(sessionToken);
    return toContext(request, { id: identity.id, authMethod: "session" });
  }

  return toContext(request);
};

export const requireUserId = (ctx: AuthContext): string => {
  if (!ctx.user) {
    throw new InvalidCredentialError("No active session");
  }

  return ctx.user.id;
};
