export const CUSTOM_FIELD_TYPE = {
  CHECKBOX: "Checkbox",
  DATE: "Date",
  EMAIL: "Email",
  NUMBER: "Number",
  TEXT: "Text",
  TEXT_AREA: "Text Area",
  FILES: "Files",
} as const;

export type CustomFieldType =
  (typeof CUSTOM_FIELD_TYPE)[keyof typeof CUSTOM_FIELD_TYPE];
