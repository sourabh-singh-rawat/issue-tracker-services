export interface ServiceResponseInputs<T> {
  rows: T;
  rowCount?: number;
  filteredRowCount?: number;
}

export class ServiceResponse<T> {
  rows: T;
  rowCount?: number;
  filteredRowCount?: number;

  constructor({ rows, rowCount, filteredRowCount }: ServiceResponseInputs<T>) {
    this.rows = rows;
    this.rowCount = rowCount;
    this.filteredRowCount = filteredRowCount;
  }
}
