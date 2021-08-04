import { isEmpty } from "./is-empty";

export const isNotEmpty = <T>(array: readonly T[]) => !isEmpty(array);
