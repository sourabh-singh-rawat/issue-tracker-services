import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./generated/openapi.json",
  apiFile: "./issue-tracker.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
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
        "updateIssueStatus",
        "updateIssueResolution",
        "updateIssueTask",
        "deleteIssueComment",
        "createIssueAttachment",
        "getIssueAttachmentList",
      ],
    },
    "./generated/project.api.ts": {
      filterEndpoints: [
        "createProject",
        "createProjectInvite",
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
        "createWorkspaceInvite",
        "getAllWorkspaces",
        "getWorkspace",
        "getWorkspaceRoleList",
        "getProjectActivityList",
        "getWorkspaceMembers",
        "updateWorkspace",
      ],
    },
  },
  exportName: "issueTrackerApi",
  hooks: { queries: true, mutations: true, lazyQueries: true },
  tag: true,
};

export default config;
