const DEFAULT_IDENTITY_SERVICE_URL = "http://127.0.0.1:5000";

export const getIdentityServiceUrl = (): string => {
  return process.env.IDENTITY_SERVICE_URL?.replace(/\/$/, "") || DEFAULT_IDENTITY_SERVICE_URL;
};
