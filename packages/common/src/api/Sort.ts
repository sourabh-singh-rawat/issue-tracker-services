import type { SortDirection } from "./SortDirection";

export interface Sort {
  field: string;
  direction: SortDirection;
}
