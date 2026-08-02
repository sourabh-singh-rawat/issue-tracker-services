export type ResourceDefinition = {
  key: string;
  type: string;
  name: string;
  description: string;
  relations: Record<string, string>;
};
