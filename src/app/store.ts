import {
  AnyAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer, { logout } from "../features/user/userSlice";
import metersReducer from "../features/meters/metersSlice";

const appReducer = combineReducers({
  user: userReducer,
  meters: metersReducer,
});

const rootReducer = (
  state:
    | ReturnType<typeof appReducer>
    | undefined,
  action: AnyAction
) => {
  if (action.type === logout.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
