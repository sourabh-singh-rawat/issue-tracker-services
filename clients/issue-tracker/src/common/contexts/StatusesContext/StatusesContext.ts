import { createContext } from "react";

export type StatusesContextValue = {
  statuses: Array<{ id: string; name: string }>;
};

const initialValue: StatusesContextValue = {
  statuses: [],
};

/** Holds status options for the active project view. */
export const StatusesContext = createContext<StatusesContextValue>(initialValue);
