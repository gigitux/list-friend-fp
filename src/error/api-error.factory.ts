import { ApiError, ErrorType } from "./error.types";

export const createApiError = (
  message: string,
  errorStatus: number
): ApiError => ({
  status: errorStatus,
  type: ErrorType.ApiError,
  message,
  isError: true,
});
