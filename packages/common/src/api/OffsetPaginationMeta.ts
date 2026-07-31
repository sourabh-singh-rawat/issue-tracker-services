import type { ResponseMeta } from "./ResponseMeta";

export interface OffsetPaginationMeta extends ResponseMeta {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}
