import { CAPABILITY } from "../resources";
import { CAPABILITY_HAS } from "../relations";
import { USER } from "../identities";
import { InsufficientPermissionError } from "../errors";
import type { IAuthorizationClient } from "./IAuthorizationClient";

export const requireCapability = async (
  client: IAuthorizationClient,
  userId: string,
  capabilityKey: string,
): Promise<void> => {
  const allowed = await client.checkRelationship({
    object: { type: CAPABILITY.name, id: capabilityKey },
    relation: CAPABILITY_HAS,
    subject: { type: USER.name, id: userId },
  });

  if (!allowed) {
    throw new InsufficientPermissionError(`Missing capability: ${capabilityKey}`);
  }
};
