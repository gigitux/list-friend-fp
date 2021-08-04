import { css } from "@emotion/css";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { isNotEmpty } from "../../array";
import { useDialog } from "../../ui/dialog/dialog.hook";
import { SelectFriendsDialogComponent } from "../select-friends-dialog/select-friends-dialog.component";
import { User } from "../user.types";

type UserEditorComponentProps = {
  readonly user: User;
  readonly userList: readonly User[];
  readonly friendList: readonly User[];
  readonly isErrorRequest: boolean;
  readonly setName: (newName: string) => void;
  readonly onSelectCheckbox: (newFriendId: string) => void;
  readonly onDeselectCheckbox: (newFriendId: string) => void;
  readonly onClickAddNewFriendButton: (newUserId: string) => void;
};

export const UserEditorComponent: FC<UserEditorComponentProps> = ({
  user,
  userList,
  friendList,
  isErrorRequest,
  setName,
  onSelectCheckbox,
  onDeselectCheckbox,
  onClickAddNewFriendButton,
}) => {
  const listFriendDialog = useDialog();

  const isListFriendOpenDialog = listFriendDialog.isOpenState;
  const closeListFriendDialog = listFriendDialog.closeDialog;
  const openListFriendDialog = listFriendDialog.openDialog;

  return (
    <>
      <label>Name:</label>
      <input
        type="text"
        value={user.name}
        onChange={(event) => setName(event.currentTarget.value)}
      />

      <button onClick={openListFriendDialog}>Select Friends</button>

      {isErrorRequest && <span>There was an error. Please retry</span>}
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <h1>
          {isNotEmpty(friendList)
            ? "Friend List"
            : "Add a new Friend in the list"}
        </h1>
        <ul>
          {friendList?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      {isListFriendOpenDialog && (
        <SelectFriendsDialogComponent
          userList={userList.filter(({ id }) => user.id !== id)}
          friendList={friendList}
          onSelectCheckbox={onSelectCheckbox}
          onDeselectCheckbox={onDeselectCheckbox}
          onClickButton={closeListFriendDialog}
        />
      )}
      <button onClick={() => onClickAddNewFriendButton(uuidv4())}>
        Add a new user
      </button>
    </>
  );
};
