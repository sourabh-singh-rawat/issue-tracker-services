import type { CreateClientConfig } from "../__generated__/api/client";
import { httpClient } from "./http-client";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  axios: httpClient,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
