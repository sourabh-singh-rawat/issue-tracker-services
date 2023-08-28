import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../../openapi/openapi.yaml",
  apiFile: "./api.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./generated/identity.api.ts": {
      filterEndpoints: ["register", "updateUserEmail"],
    },
  },
  exportName: "issueTrackerApi",
  hooks: true,
  tag: true,
};

export default config;
