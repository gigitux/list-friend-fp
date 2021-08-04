import { User } from "../user.types";

export enum UserEditorMode {
  Edit = "Edit",
  Create = "Create",
}

export type UserEditorState = {
  readonly editableUser: User;
  readonly editorMode: UserEditorMode;
};
