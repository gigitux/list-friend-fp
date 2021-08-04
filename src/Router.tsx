import { Route, Switch } from "react-router-dom";
import { UserEditorMode } from "./user/user-editor-smart/user-editor-smart.types";
import { UserEditorWithDialogsComponent } from "./user/user-editor-with-dialogs/user-editor-with-dialogs.component";
import { UserListSmartComponent } from "./user/user-list-smart/user-list-smart.component";

export enum RouterPath {
  users = "/users",
  createUser = "/users/new",
  editUser = "/users",
}

export const AppRouter = () => {
  return (
    <Switch>
      <Route path={"/"} exact component={UserListSmartComponent} />
      <Route
        path={RouterPath.createUser}
        exact
        render={() => {
          return (
            <UserEditorWithDialogsComponent
              userId={null}
              editorMode={UserEditorMode.Create}
            />
          );
        }}
      />

      <Route
        path={`${RouterPath.editUser}/:userId`}
        exact
        render={(params) => {
          const userId = params.match.params.userId;
          return (
            <UserEditorWithDialogsComponent
              userId={userId}
              editorMode={UserEditorMode.Edit}
            />
          );
        }}
      />
      {/* <Route component={WizardSmartComponent} /> */}
    </Switch>
  );
};
