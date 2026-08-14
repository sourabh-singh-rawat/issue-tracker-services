import { permissionKey, type Permission } from "../permissions";
import { IDENTITY } from "../identities";
import { InsufficientPermissionError } from "../errors";
import type { IAuthorizationClient } from "./IAuthorizationClient";
import type { ResourceReference } from "./types";

export const requirePermission = async (
  client: IAuthorizationClient,
  userId: string,
  permission: Permission,
  resource: ResourceReference,
): Promise<void> => {
  const allowed = await client.checkRelationship({
    namespace: resource.namespace,
    object: resource.id,
    relation: permission,
    subject: `${IDENTITY.name}:${userId}`,
  });

  if (!allowed) {
    throw new InsufficientPermissionError(
      `Missing permission: ${permissionKey(resource.namespace, permission)}`,
    );
  }
};
