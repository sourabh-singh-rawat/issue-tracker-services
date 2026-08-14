import type { ResourceDefinition } from "../resources/ResourceDefinition";

export const IDENTITY = {
  name: "identity",
  description: "User identity",
  isSystem: true,
} as const satisfies ResourceDefinition;
