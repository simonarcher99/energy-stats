import {
  AnyAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer, { logout } from "../features/user/userSlice";
import metersReducer from "../features/meters/metersSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store)