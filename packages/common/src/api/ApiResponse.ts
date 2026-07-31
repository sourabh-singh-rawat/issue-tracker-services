import type { ApiError } from "./ApiError";

export interface ApiResponse<TData, TMeta = never> {
  data: TData;
  meta?: TMeta;
  errors?: ApiError[];
}
