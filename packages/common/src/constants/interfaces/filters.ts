export interface Filters {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  status?: string;
}
