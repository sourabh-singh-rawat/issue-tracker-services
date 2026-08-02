import { ALL_CAPABILITIES, type CapabilityKey } from "../resources";

export const capabilityKeys = (
  ...groups: readonly (readonly CapabilityKey[])[]
): CapabilityKey[] => {
  const keys: CapabilityKey[] = [];
  const seen = new Set<CapabilityKey>();
  for (const group of groups) {
    for (const key of group) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
  }
  return keys;
};

export const allCapabilityKeys = (): readonly CapabilityKey[] =>
  ALL_CAPABILITIES.map((capability) => capability.key);

export const readCapabilityKeys = (): readonly CapabilityKey[] =>
  ALL_CAPABILITIES.filter((capability) => capability.key.endsWith(".read")).map(
    (capability) => capability.key,
  );
