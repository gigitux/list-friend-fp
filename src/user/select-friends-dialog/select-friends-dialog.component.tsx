import { css } from "@emotion/css";
import { FC } from "react";
import { DialogComponent } from "../../ui/dialog/dialog.component";
import { User } from "../user.types";

type SelectFriendsDialogComponentProps = {
  readonly friendList: readonly User[];
  readonly userList: readonly User[];
  readonly onSelectCheckbox: (newFriendId: string) => void;
  readonly onDeselectCheckbox: (newFriendId: string) => void;
  readonly onClickButton: () => void;
};

export const SelectFriendsDialogComponent: FC<SelectFriendsDialogComponentProps> =
  ({
    friendList,
    userList,
    onSelectCheckbox,
    onDeselectCheckbox,
    onClickButton,
  }) => {
    return (
      <DialogComponent>
        <div
          className={css`
            height: 400px;
            display: flex;
            flex-direction: column;
          `}
        >
          {userList.map((user) => {
            const isChecked = friendList.some(({ id }) => user.id === id);
            return (
              <div
                key={user.id}
                className={css`
                  display: flex;
                `}
              >
                <input
                  checked={isChecked}
                  onChange={() =>
                    !isChecked
                      ? onSelectCheckbox(user.id)
                      : onDeselectCheckbox(user.id)
                  }
                  type="checkbox"
                />

                <label>{user.name}</label>
              </div>
            );
          })}
          <button onClick={onClickButton}>Close Dialog</button>
        </div>
      </DialogComponent>
    );
  };
