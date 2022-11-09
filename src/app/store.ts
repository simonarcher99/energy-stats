import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "../features/user/userSlice";
import metersReducer from "../features/meters/metersSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    meters: metersReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
