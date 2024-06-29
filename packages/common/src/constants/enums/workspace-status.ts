export const WORKSPACE_STATUS = {
  PENDING: "Pending",
  ACTIVE: "Active",
  DEFAULT: "Default",
  ARCHIVED: "Archived",
  TEMPLATE: "Template",
} as const;

export type WorkspaceStatus =
  (typeof WORKSPACE_STATUS)[keyof typeof WORKSPACE_STATUS];
