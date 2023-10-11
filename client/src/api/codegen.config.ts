import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../../openapi/openapi.yaml",
  apiFile: "./api.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./generated/identity.api.ts": {
      filterEndpoints: ["generateTokens", "getCurrentUser"],
    },
    "./generated/user.api.ts": {
      filterEndpoints: ["registerUser", "setDefaultWorkspace"],
    },
    "./generated/workspace.api.ts": {
      filterEndpoints: ["getAllWorkspaces", "getWorkspace", "createWorkspace"],
    },
    "./generated/project.api.ts": {
      filterEndpoints: [
        "createProject",
        "getProjectStatusList",
        "getProjectList",
      ],
    },
  },
  exportName: "issueTrackerApi",
  hooks: true,
  tag: true,
};

export default config;
