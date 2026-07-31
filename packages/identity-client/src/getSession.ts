import { getIdentityServiceUrl } from "./config";
import type { GetSessionResponse, SessionIdentity } from "./types";

export const getSession = async (cookieHeader: string): Promise<SessionIdentity | null> => {
  const url = `${getIdentityServiceUrl()}/identity/getSession`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as GetSessionResponse;
    if (!body?.identity?.id) {
      return null;
    }

    return body.identity;
  } catch {
    return null;
  }
};
