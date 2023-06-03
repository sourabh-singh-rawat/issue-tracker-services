export default class ServiceResponse {
  data: any;
  isSuccess?: boolean;
  errorMessage?: string;

  constructor(data?: any, isSuccess?: boolean, errorMessage?: string) {
    this.data = data;
    this.isSuccess = isSuccess;
    this.errorMessage = errorMessage;
  }

  public async create(data: any, isSuccess: boolean, errorMessage?: string) {
    return new ServiceResponse(data, isSuccess, errorMessage);
  }

  public async success(data: any) {
    return new ServiceResponse(data, true, '');
  }

  public async createFromError(errorMessage?: string) {
    return new ServiceResponse(null, false, errorMessage);
  }
}
