import type { Status } from "@generated/gql/graphql";

export interface OutletContext {
  spaceId?: string;
  listId?: string;
  itemId?: string;
  selectedTab?: number;
  status?: Status[];
}
