import { createContext } from "react";
import { Status } from "../../../api";

const initialValue: { statuses: Status[] } = {
  statuses: [],
};

export const SpaceContext = createContext(initialValue);
