import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../../openapi/openapi.yaml",
  apiFile: "./api.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./generated/identity.api.ts": {
      filterEndpoints: ["generateTokens", "getCurrentUser", "revokeTokens"],
    },
    "./generated/issue.api.ts": {
      filterEndpoints: [
        "createIssue",
        "createIssueComment",
        "createIssueTask",
        "getIssue",
        "getIssueList",
        "getIssueStatusList",
        "getIssuePriorityList",
        "getIssueCommentList",
        "getIssueTaskList",
        "updateIssue",
        "updateIssueTask",
        "deleteIssueComment",
      ],
    },
    "./generated/project.api.ts": {
      filterEndpoints: [
        "createProject",
        "createProjectMember",
        "getProjectStatusList",
        "getProjectRoleList",
        "getProjectList",
        "getProject",
        "getProjectMembers",
        "updateProject",
      ],
    },
    "./generated/user.api.ts": {
      filterEndpoints: ["registerUser", "setDefaultWorkspace"],
    },
    "./generated/workspace.api.ts": {
      filterEndpoints: [
        "createWorkspace",
        "getAllWorkspaces",
        "getWorkspace",
        "getWorkspaceRoleList",
        "createWorkspaceInvite",
        "getProjectActivityList",
        "getWorkspaceMemberList",
      ],
    },
  },
  exportName: "issueTrackerApi",
  hooks: true,
  tag: true,
};

export default config;
