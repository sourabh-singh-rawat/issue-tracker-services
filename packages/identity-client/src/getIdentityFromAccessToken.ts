import { getIdentityServiceUrl } from "./config";
import type { GetSessionResponse, SessionIdentity } from "./types";

export const getIdentityFromAccessToken = async (
  accessToken: string,
): Promise<SessionIdentity | null> => {
  const url = `${getIdentityServiceUrl()}/identity/getTokenSession`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
