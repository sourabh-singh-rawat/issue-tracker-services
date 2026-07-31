import type { ApiResponse } from "./ApiResponse";

export type ApiStream<TData, TMeta = never> = AsyncIterable<
  ApiResponse<TData, TMeta>
>;
