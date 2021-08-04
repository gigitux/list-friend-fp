export enum ErrorType {
  AdapterError = "AdapterError",
  ApiError = "ApiError",
}

export type ApplicationError = {
  readonly type: ErrorType;
  readonly isError: true;
  readonly status: number;
};

export type AdapterError = ApplicationError & {
  readonly type: ErrorType.AdapterError;
  readonly message: string;
  readonly status: 200;
};

export type ApiError = ApplicationError & {
  readonly type: ErrorType.ApiError;
  readonly message: string;
  readonly status: number;
};
