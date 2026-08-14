import { InvalidPermissionKeyError } from "../errors";

const isPermissionKey = (key: string): boolean => {
  const separator = key.indexOf(":");
  return separator > 0 && separator === key.lastIndexOf(":") && separator < key.length - 1;
};

export const parsePermission = (
  key: string,
): {
  namespace: string;
  permission: string;
} => {
  if (!isPermissionKey(key)) {
    throw new InvalidPermissionKeyError(`Invalid permission key: ${key}`);
  }

  const separator = key.indexOf(":");
  return {
    namespace: key.slice(0, separator),
    permission: key.slice(separator + 1),
  };
};
