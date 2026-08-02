import type { Resource } from "./Resource";

export interface Relationship {
  object: Resource;
  relation: string;
  subject: Resource;
}
