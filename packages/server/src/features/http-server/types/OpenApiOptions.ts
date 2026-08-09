export type OpenApiInfo = {
  title: string;
  version: string;
  description?: string;
  license?: { name: string; url?: string };
};

export type OpenApiServer = {
  url: string;
  description?: string;
};

export type OpenApiTag = {
  name: string;
  description?: string;
};

export type OpenApiSecurityScheme =
  | {
      type: "http";
      scheme: string;
      bearerFormat?: string;
      description?: string;
    }
  | {
      type: "apiKey";
      name: string;
      in: "query" | "header" | "cookie";
      description?: string;
    };

export type OpenApiOptions = {
  info: OpenApiInfo;
  servers?: OpenApiServer[];
  tags?: OpenApiTag[];
  securitySchemes?: Record<string, OpenApiSecurityScheme>;
};
