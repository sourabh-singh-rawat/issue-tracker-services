export type CorsOrigin = string | string[];

export type CorsOptions = {
  credentials?: boolean;
  origin?: CorsOrigin;
};
