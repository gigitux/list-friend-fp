import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { identity, pipe } from "fp-ts/lib/function";
import { map as mapTE, match, tryCatch } from "fp-ts/lib/TaskEither";
import { ApiError } from "../error";
import { createApiError } from "../error/api-error.factory";
import { isNotNil } from "../types/nullable.guards";
import { decodeUsers, decodeUser } from "./user-api.utils";
import { User } from "./user.types";

const axiosBaseQuery =
  (
    { baseUrl }: { readonly baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      readonly url: string;
      readonly method: AxiosRequestConfig["method"];
      readonly data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    // eslint-disable-next-line functional/no-expression-statement
    axiosRetry(axios, {
      retries: 3,
      retryCondition: (error) => {
        return isNotNil(error.response) ? error.response?.status >= 500 : false;
      },
    });
    const result:
      | { readonly error: number; readonly data: ApiError }
      | { readonly data: unknown } = await pipe(
      tryCatch(
        async () => await axios({ url: baseUrl + url, method, data }),
        (reason) => {
          const err = reason as AxiosError;
          const errorCode = isNotNil(err.code) ? parseInt(err.code) : 500;
          return {
            error: errorCode,
            data: createApiError("Error API", errorCode),
          };
        }
      ),
      mapTE((resp) => ({ data: resp.data })),
      match(identity, identity)
    )();

    return result;
  };

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getUsers: builder.query<readonly User[], void>({
      queryFn: async (arg, _, __, baseQuery) => {
        const res = await baseQuery({ url: "/users", method: "GET" });

        return decodeUsers(res.data);
      },
      providesTags: ["User"],
    }),
    getUser: builder.query<User, string>({
      queryFn: async (arg, _, __, baseQuery) => {
        const res = await baseQuery({ url: `/users/${arg}`, method: "GET" });

        return decodeUser(res.data);
      },
    }),
    createUser: builder.mutation<User, User>({
      queryFn: async (body, _, __, baseQuery) => {
        const res = await baseQuery({
          url: "/users",
          method: "POST",
          data: body,
        });

        return decodeUser(res.data);
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, User>({
      queryFn: async (body, _, __, baseQuery) => {
        const res = await baseQuery({
          url: `/users/${body.id}`,
          method: "PATCH",
          data: body,
        });

        return decodeUser(res.data);
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const useGetUsersQueryStateResult =
  usersApi.endpoints.getUsers.useQueryState;

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;
