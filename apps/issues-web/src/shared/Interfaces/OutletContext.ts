import type { StatusObject } from "@generated/gql/graphql";

export interface OutletContext {
  projectId?: string;
  issueId?: string;
  selectedTab?: number;
  status?: StatusObject[];
}
