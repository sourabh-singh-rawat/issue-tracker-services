export interface PaginatedOutput<T> {
  rows: T[];
  rowCount: number;
}
