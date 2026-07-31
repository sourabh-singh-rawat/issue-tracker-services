import type { ResponseMeta } from "./ResponseMeta";

export interface CursorPaginationMeta extends ResponseMeta {
  nextCursor?: string;
  previousCursor?: string;
  hasNext: boolean;
}
