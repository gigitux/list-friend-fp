import { FC } from "react";
import { isNotEmpty } from "../../array";
import { Nullable } from "../../types";
import { DialogStackComponent } from "../../ui/dialog-stack/dialog-stack.component";
import { DialogComponent } from "../../ui/dialog/dialog.component";
import { useDialog } from "../../ui/dialog/dialog.hook";
import { UserEditorSmartComponent } from "../user-editor-smart/user-editor-smart.component";
import { UserEditorMode } from "../user-editor-smart/user-editor-smart.types";
import { useUserEditorWithDialogs } from "./user-editor-with-dialogs.hook";

type UserEditorWithDialogsComponentProps = {
  readonly userId: Nullable<string>;
  readonly editorMode: UserEditorMode;
};

export const UserEditorWithDialogsComponent: FC<UserEditorWithDialogsComponentProps> =
  ({ userId, editorMode }) => {
    const { dialogListState, openNewDialog, closeDialog, focusedDialog } =
      useUserEditorWithDialogs();

    const alertDialog = useDialog();

    const isOpenAlertDialog = alertDialog.isOpenState;

    const closeAlertDialog = alertDialog.closeDialog;
    const openAlertDialog = alertDialog.openDialog;

    return (
      <>
        <UserEditorSmartComponent
          userId={userId}
          editorMode={editorMode}
          onClickAddNewFriendButton={openNewDialog}
        />
        {isNotEmpty(dialogListState) && (
          <>
            <DialogStackComponent focusedDialog={focusedDialog}>
              {dialogListState.map((id, i) => (
                <div
                  key={id}
                  data-id={id}
                  onClick={() => {
                    if (
                      i !== focusedDialog &&
                      i !== dialogListState.length - 1
                    ) {
                      return openAlertDialog();
                    }
                  }}
                >
                  <UserEditorSmartComponent
                    key={id}
                    userId={id}
                    editorMode={UserEditorMode.Create}
                    onClickAddNewFriendButton={openNewDialog}
                    onSaveOrUpdateUserSuccess={() => closeDialog(id)}
                  />
                  <button onClick={() => closeDialog(id)}>Close Dialog</button>
                </div>
              ))}
            </DialogStackComponent>

            {isOpenAlertDialog && (
              <DialogComponent>
                <>
                  <span> Save or close dialog</span>
                  <button onClick={closeAlertDialog}>Ok</button>
                </>
              </DialogComponent>
            )}
          </>
        )}
      </>
    );
  };
