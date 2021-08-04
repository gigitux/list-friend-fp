import { map } from "fp-ts/lib/Array";
import {
  chainW,
  fromPredicate,
  map as mapE,
  mapLeft,
  matchW,
  sequenceArray,
} from "fp-ts/lib/Either";
import { identity, pipe } from "fp-ts/lib/function";
import { isArray } from "../array/is-array.guards";
import { createAdapterError } from "../error/adapter-error.factory";
import { decodeUserStruct } from "./user.adapter";

export const decodeUser = (value: unknown) =>
  pipe(
    value,
    decodeUserStruct,
    mapLeft(() => createAdapterError("User not valid")),
    mapLeft((error) => ({
      error: {
        status: 200,
        data: error,
      },
    })),
    mapE((user) => ({ data: user })),
    matchW(identity, identity)
  );

export const decodeUsers = (value: unknown) =>
  pipe(
    value,
    fromPredicate(isArray, () => createAdapterError("Users not valid")),
    mapE(map(decodeUserStruct)),
    chainW(sequenceArray),
    mapLeft((error) => ({
      error: {
        status: 200,
        data: error,
      },
    })),
    mapE((list) => ({ data: list })),
    matchW(identity, identity)
  );
