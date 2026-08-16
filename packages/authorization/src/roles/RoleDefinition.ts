export type RoleDefinition = {
  id: string;
  key: string;
  name: string;
  description: string;
  relation: string;
  permissionKeys: readonly string[];
};
