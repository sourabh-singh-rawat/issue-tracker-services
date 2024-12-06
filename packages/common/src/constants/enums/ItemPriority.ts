export const ITEM_PRIORITY = {
  URGENT: "Urgent",
  HIGH: "High",
  NORMAL: "Normal",
  LOW: "Low",
} as const;

export type ItemPriority = (typeof ITEM_PRIORITY)[keyof typeof ITEM_PRIORITY];
