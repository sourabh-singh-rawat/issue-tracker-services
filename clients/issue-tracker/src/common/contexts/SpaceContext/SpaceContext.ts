import { createContext } from "react";
import type { Status } from "@generated/gql/graphql";

const initialValue: { statuses: Status[] } = {
  statuses: [],
};

export const SpaceContext = createContext(initialValue);
