import type { CapabilityKey } from "../capabilities";

export type RoleDefinition = {
  id: string;
  key: string;
  name: string;
  description: string;
  capabilityKeys: readonly CapabilityKey[];
};
