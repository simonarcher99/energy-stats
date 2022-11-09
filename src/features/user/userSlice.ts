import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState: {
  loading: boolean;
  userInfo: any;
  userToken: string | null;
  error: any;
  success: boolean;
} = {
  loading: false,
  userInfo: {},
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
        localStorage.removeItem('userToken')
        state.loading = false
        state.userInfo = null
        state.userToken = null
        state.error = null
      },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token;
      state.success = true
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions
