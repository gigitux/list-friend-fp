import {
  AdapterError,
  ApiError,
  ApplicationError,
  ErrorType,
} from "./error.types";

export const isError = (value: unknown): value is ApplicationError =>
  typeof value === "object" && value !== null && "isError" in value;

export const isAdapterError = (
  error: ApplicationError
): error is AdapterError =>
  error.isError && error.type === ErrorType.AdapterError;

export const isApiError = (error: ApplicationError): error is ApiError =>
  error.isError && error.type === ErrorType.ApiError;
