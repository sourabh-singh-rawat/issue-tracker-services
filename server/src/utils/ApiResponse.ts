import { StatusCodes } from 'http-status-codes';

export default class ApiResponse {
  data: any;
  statusCode?: number;
  errorMessage?: string;

  constructor(data?: any, statusCode?: number, errorMessage?: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }

  public async create(data: any, statusCode: number) {
    return new ApiResponse(data, statusCode);
  }

  public async success(data: any) {
    return new ApiResponse(data, StatusCodes.OK);
  }

  public async createFromError(statusCode: number, errorMessage?: string) {
    return new ApiResponse(null, statusCode, errorMessage);
  }
}
