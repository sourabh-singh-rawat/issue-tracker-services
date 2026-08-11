import type { ResourceDefinition } from "../resources/ResourceDefinition";

export const USER = {
  name: "user",
  description: "User identity",
  isSystem: true,
} as const satisfies ResourceDefinition;
