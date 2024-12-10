export const FIELD_TYPE = {
  CHECKBOX: "Checkbox",
  DATE: "Date",
  EMAIL: "Email",
  NUMBER: "Number",
  SINGLE_LINE: "Single Line",
  MULTI_LINE: "Multi Line",
  FILES: "Files",
  PICKLIST: "Picklist",
  MULTI_PICKLIST: "Multi Picklist",
  LOOKUP: "Lookup",
  MULTI_LOOKUP: "Multi lookup",
} as const;

export type FieldType = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE];
