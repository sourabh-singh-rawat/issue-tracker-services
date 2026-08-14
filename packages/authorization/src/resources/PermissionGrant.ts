import type { ResourceDefinition } from "./ResourceDefinition";

export const PERMISSION_GRANT = {
  name: "permission-grant",
  description: "Permission grant assignments",
  isSystem: true,
} as const satisfies ResourceDefinition;
