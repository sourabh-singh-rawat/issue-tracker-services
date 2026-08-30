import type { HttpRequest } from "@pine/server";

export const resolveIdentityFromHeaders = (request: HttpRequest): void => {
  const headerIdentityId = request.headers["x-identity-id"];
  if (typeof headerIdentityId === "string" && headerIdentityId.length > 0) {
    const authMethod = request.headers["x-identity-auth-method"];

    request.identity = {
      id: headerIdentityId,
      authMethod: authMethod === "access_token" ? "access_token" : "session",
    };
  }
};
