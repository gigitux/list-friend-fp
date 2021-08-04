import { useHistory } from "react-router-dom";
import { RouterPath } from "../../Router";
import { HeaderComponent } from "../../ui/header/header.component";
import { UserListComponent } from "../user-list/user-list.component";
import { useGetUsersQuery } from "../user.reducer";

export const UserListSmartComponent = () => {
  const { data, isFetching } = useGetUsersQuery();

  const history = useHistory();

  const users = data ?? [];

  return (
    <>
      <HeaderComponent
        headerText={"Users"}
        buttonText={"New User"}
        isButtonDisabled={false}
        onClickOnButton={() => history.push(RouterPath.createUser)}
      />
      {!isFetching && <UserListComponent users={users} />}
    </>
  );
};
