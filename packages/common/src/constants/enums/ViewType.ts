export const VIEW_TYPE = {
  BOARD: "Board",
  LIST: "List",
} as const;

export type ViewType = (typeof VIEW_TYPE)[keyof typeof VIEW_TYPE];
