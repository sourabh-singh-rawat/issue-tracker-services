export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
}
