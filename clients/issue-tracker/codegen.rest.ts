import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../services/attachment/schema.yaml",
  apiFile: "./src/api/attachment.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./src/api/codegen/rest/attachment.api.ts": {
      filterEndpoints: ["createAttachment"],
    },
  },
  exportName: "attachmentApi",
  hooks: true,
  tag: true,
};

export default config;
