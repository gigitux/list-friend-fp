import { css } from "@emotion/css";
import { FC } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../array";
import { RouterPath } from "../../Router";
import { User } from "../user.types";

type UserListComponentProps = {
  readonly users: readonly User[];
};

export const UserListComponent: FC<UserListComponentProps> = ({ users }) => {
  const isEmptyList = isEmpty(users);

  return (
    <>
      {isEmptyList ? (
        <span>No user in the list</span>
      ) : (
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <h1>User List</h1>
          <ul>
            {users?.map((user) => (
              <li key={user.id}>
                <Link to={`${RouterPath.editUser}/${user.id}`}>
                  {user.name}{" "}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
