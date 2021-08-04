/* eslint-disable functional/no-expression-statement */
import { pipe } from "fp-ts/lib/function";
import { getOrElse, isSome, map } from "fp-ts/lib/Option";
import { FC } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { User } from "..";
import { Nullable } from "../../types";
import { isNotNil } from "../../types/nullable.guards";
import { HeaderComponent } from "../../ui/header/header.component";
import { UserEditorComponent } from "../user-editor/user-editor.component";
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} from "../user.reducer";
import { useUserEditorSmart } from "./user-editor-smart.hook";
import { UserEditorMode } from "./user-editor-smart.types";
import { populateFriendIds } from "./user-editor-smart.utils";

type UserEditorSmartComponentProps = {
  readonly userId: Nullable<string>;
  readonly editorMode: UserEditorMode;
  readonly onClickAddNewFriendButton: (newUserId: string) => void;
  readonly onSaveOrUpdateUserSuccess?: () => void;
};

export const UserEditorSmartComponent: FC<UserEditorSmartComponentProps> = ({
  userId,
  editorMode,
  onClickAddNewFriendButton,
  onSaveOrUpdateUserSuccess,
}) => {
  const history = useHistory();

  const [getUser, infoGetUserRequest] = useLazyGetUserQuery();
  const fetchedUser = infoGetUserRequest.data;
  const isErrorFetchUser = infoGetUserRequest.isError;
  const isFetching = infoGetUserRequest.isFetching;
  const [saveUser, infoSaveUserRequest] = useCreateUserMutation();
  const [updateUser, updateUserMutation] = useUpdateUserMutation();

  const isSuccessUserRequest =
    infoSaveUserRequest.isSuccess || updateUserMutation.isSuccess;

  const isErrorRequest =
    infoSaveUserRequest.isError || infoSaveUserRequest.isError;

  const sideEffectOnSaveOrUpdateUserSuccess = isNotNil(
    onSaveOrUpdateUserSuccess
  )
    ? onSaveOrUpdateUserSuccess
    : () => history.push("/");

  const { userState, setName, addNewFriend, removeFriend } = useUserEditorSmart(
    {
      userId,
      userEditorMode: editorMode,
      isSuccessRequest: isSuccessUserRequest,
      sideEffectOnSaveOrUpdateUserSuccess: sideEffectOnSaveOrUpdateUserSuccess,
      fetchedUser,
      getUser,
      saveUser,
      updateUser,
    }
  );
  const { data } = useGetUsersQuery();
  const userList = isNotNil(data) ? data : [];

  const friends = pipe(
    userState,
    map(({ friendIds }) => populateFriendIds(friendIds, userList)),
    getOrElse(() => [] as readonly User[])
  );

  return (
    <>
      {isSome(userState) && !isFetching && (
        <>
          <HeaderComponent
            headerText={
              editorMode === UserEditorMode.Create
                ? "new User"
                : `Edit User ${userState.value.name}`
            }
            buttonText={"Save"}
            isButtonDisabled={userList
              .filter(({ id }) => id !== userState.value.id)
              .some(({ name }) => userState.value.name.trim() === name)}
            onClickOnButton={async () => {
              console.log(editorMode);
              if (editorMode === UserEditorMode.Create) {
                return await saveUser(userState.value);
              } else {
                return await updateUser(userState.value);
              }
            }}
          />

          <UserEditorComponent
            user={userState.value}
            friendList={friends}
            userList={userList}
            setName={setName}
            onClickAddNewFriendButton={onClickAddNewFriendButton}
            onSelectCheckbox={addNewFriend}
            onDeselectCheckbox={removeFriend}
            isErrorRequest={isErrorRequest}
          />
        </>
      )}
      {isErrorFetchUser && <Redirect to={"/"} />}
    </>
  );
};
