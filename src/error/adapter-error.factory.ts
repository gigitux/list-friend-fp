import { AdapterError, ErrorType } from "./error.types";

export const createAdapterError = (message: string): AdapterError => ({
  type: ErrorType.AdapterError,
  message,
  isError: true,
  status: 200,
});
