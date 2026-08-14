export type RoleDefinition = {
  id: string;
  key: string;
  name: string;
  description: string;
  permissionKeys: readonly string[];
};
