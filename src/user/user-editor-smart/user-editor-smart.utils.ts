import { pipe } from "fp-ts/lib/function";
import { fromNullable, map, getOrElse } from "fp-ts/lib/Option";
import { Nullable } from "../../types";
import { isNotNil } from "../../types/nullable.guards";
import { User } from "../user.types";
import { createUser } from "../user.utils";
import { UserEditorMode } from "./user-editor-smart.types";

export const getUserListByEditorMode = (
  userList: Nullable<readonly User[]>,
  editorMode: UserEditorMode,
  userId: Nullable<string>
) =>
  pipe(
    userList,
    fromNullable,
    map((users) =>
      editorMode === UserEditorMode.Create
        ? users
        : users?.filter((user) => user.id !== userId)
    ),
    getOrElse(() => [] as readonly User[])
  );

export const createDefaultUser = () => createUser("new user");

export const populateFriendIds = (
  friendIds: readonly string[],
  users: readonly User[]
) =>
  friendIds.reduce<readonly User[]>((acc, id) => {
    const user = users.find((user) => user.id === id);

    return isNotNil(user) ? [...acc, user] : acc;
  }, []);
