export default class RepoResponse {
  data?: any;
  isSuccess?: boolean;
  errorMessage?: string;

  constructor(data?: any, isSuccess?: boolean, errorMessage?: string) {
    this.data = data;
    this.isSuccess = isSuccess;
    this.errorMessage = errorMessage;
  }

  public async create(data?: any, isSuccess?: boolean, errorMessage?: string) {
    return new RepoResponse(data, isSuccess, errorMessage);
  }

  public async success(data: any) {
    return new RepoResponse(data, true, '');
  }

  public async createFromError(errorMessage: string) {
    return new RepoResponse(null, false, errorMessage);
  }
}
