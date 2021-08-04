/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usersApi } from "../user";
import { rootReducer } from "./redux.reducer";

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // eslint-disable-next-line functional/no-conditional-statement
    if (isRejectedWithValue(action)) {
      // sideEffectToast({
      //   title: "Ops, there is an error",
      //   status: "error",
      //   duration: 9000,
      //   isClosable: true,
      // });
    }

    return next(action);
  };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([rtkQueryErrorLogger, usersApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// eslint-disable-next-line functional/prefer-tacit
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
