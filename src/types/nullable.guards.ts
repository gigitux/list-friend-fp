import { Null, Nullable } from "./nullable.types";

export const isNil = <T>(value: Nullable<T>): value is Null =>
  value === null || value === undefined;

export const isNotNil = <T>(value: Nullable<T>): value is T =>
  value !== null && value !== undefined;
