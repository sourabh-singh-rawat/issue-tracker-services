import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./generated/storage.openapi.json",
  apiFile: "./storage.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./generated/storage.api.ts": {
      filterEndpoints: ["createIssueAttachment", "getIssueAttachmentList"],
    },
  },
  exportName: "storageApi",
  hooks: true,
  tag: true,
};

export default config;
