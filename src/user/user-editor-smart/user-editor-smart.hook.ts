import { flow, pipe } from "fp-ts/lib/function";
import { fold, fromNullable, map, none, Option } from "fp-ts/lib/Option";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { match } from "ts-pattern";
import { Nullable } from "../../types";
import { isNotNil } from "../../types/nullable.guards";
import { User } from "../user.types";
import { UserEditorMode } from "./user-editor-smart.types";
import { createDefaultUser } from "./user-editor-smart.utils";

export const useUserEditorSmart = ({
  userId,
  userEditorMode,
  isSuccessRequest,
  fetchedUser,
  sideEffectOnSaveOrUpdateUserSuccess,
  getUser,
  saveUser,
  updateUser,
}: {
  readonly userId: Nullable<string>;
  readonly userEditorMode: UserEditorMode;
  readonly isSuccessRequest: boolean;
  readonly fetchedUser: Nullable<User>;
  readonly sideEffectOnSaveOrUpdateUserSuccess: () => void;
  readonly getUser: (arg: string) => void;
  readonly saveUser: (arg: User) => void;
  readonly updateUser: (arg: User) => void;
}) => {
  const history = useHistory();

  const [userState, setUserState] = useState<Option<User>>(none);

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(() => setUserState(fromNullable(fetchedUser)), [fetchedUser]);

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(() => {
    if (isSuccessRequest) {
      return sideEffectOnSaveOrUpdateUserSuccess();
    }
  }, [isSuccessRequest, sideEffectOnSaveOrUpdateUserSuccess]);

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(
    () =>
      match(userEditorMode)
        .when(
          (mode) => mode === UserEditorMode.Create,
          () =>
            pipe(
              userId,
              fromNullable,
              map((id) => ({ ...createDefaultUser(), id })),
              fold(
                flow(createDefaultUser, fromNullable, setUserState),
                flow(fromNullable, setUserState)
              )
            )
        )
        .when(
          (mode) => mode === UserEditorMode.Edit,
          () => (isNotNil(userId) ? getUser(userId) : history.push("/"))
        )
        .otherwise(() => history.push("/")),

    [getUser, history, userEditorMode, userId]
  );

  const handlers = useMemo(
    () => ({
      setName: (newName: string) =>
        pipe(
          userState,
          map((userState) => ({ ...userState, name: newName })),
          setUserState
        ),
      addNewFriend: (newFriendId: string) =>
        pipe(
          userState,
          map((userState) => ({
            ...userState,
            friendIds: [...userState.friendIds, newFriendId],
          })),
          setUserState
        ),
      removeFriend: (newFriendId: string) =>
        pipe(
          userState,
          map((userState) => ({
            ...userState,
            friendIds: userState.friendIds.filter((id) => id !== newFriendId),
          })),
          setUserState
        ),
      resetUser: () => pipe(createDefaultUser(), fromNullable, setUserState),
      saveUser: async () =>
        pipe(
          userState,
          fold(() => void 0, saveUser)
        ),
    }),
    [saveUser, userState]
  );

  return {
    userState,
    setName: handlers.setName,
    addNewFriend: handlers.addNewFriend,
    removeFriend: handlers.removeFriend,
    resetUser: handlers.resetUser,
  };
};
