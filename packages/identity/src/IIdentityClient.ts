import type { HttpRequest } from "@pine/server";
import type { Identity } from "./schemas";

export interface IIdentityClient {
  getIdentityViaSession: (cookieHeader: string) => Promise<Identity | null>;
  getIdentityViaAccessToken: (accessToken: string) => Promise<Identity | null>;
  resolveRequestUser: (request: HttpRequest) => Promise<void>;
}
