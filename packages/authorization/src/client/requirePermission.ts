import { permissionKey, type Permission } from "../permissions";
import { parseResource, type ResourceKey } from "../resources";
import { IDENTITY } from "../identities";
import { InsufficientPermissionError } from "../errors";
import type { IAuthorizationClient } from "./IAuthorizationClient";

export const requirePermission = async (
  client: IAuthorizationClient,
  identityId: string,
  permission: Permission,
  resource: ResourceKey,
): Promise<void> => {
  const object = parseResource(resource);
  const allowed = await client.checkRelationship({
    namespace: object.namespace,
    object: object.id,
    relation: permission,
    subject: `${IDENTITY}:${identityId}`,
  });

  if (!allowed) {
    throw new InsufficientPermissionError(
      `Missing permission: ${permissionKey(object.namespace, permission)}`,
    );
  }
};
