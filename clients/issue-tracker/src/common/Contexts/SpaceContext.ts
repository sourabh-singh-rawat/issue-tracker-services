import { createContext } from "react";
import { Status } from "../../api/codegen/gql/graphql";

const initialValue: { statuses: Status[] } = {
  statuses: [],
};

export const SpaceContext = createContext(initialValue);
