import * as D from "io-ts/Decoder";
import { User } from "./user.types";

const userStruct = D.struct<User>({
  id: D.string,
  name: D.string,
  friendIds: D.array(D.string),
});

export const decodeUserStruct = userStruct.decode;

export type DecodeUser = ReturnType<typeof decodeUserStruct>;
