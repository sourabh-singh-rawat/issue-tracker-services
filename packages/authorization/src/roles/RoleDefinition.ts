import type { CapabilityKey } from "../resources";

export type RoleDefinition = {
  id: string;
  key: string;
  name: string;
  description: string;
  capabilityKeys: readonly CapabilityKey[];
};
