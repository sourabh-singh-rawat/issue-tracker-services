export interface RepoResponse<T = null> {
  isSuccess: boolean;
  data: T[] | null;
  dataCount?: number;
}
