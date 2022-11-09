import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://3qwfx5k0o4.execute-api.us-east-1.amazonaws.com/dev";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/user/login`,
        { email, password },
        config
      );

      console.log(data)

      localStorage.setItem("userToken", data.token);

      return data;
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (registerData: RegisterData, { rejectWithValue }) => {
    console.log("In async thunk!");
    try {
      const { email, password, givenName, familyName } = registerData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${baseUrl}/user/signup`,
        { givenName, familyName, email, password },
        config
      );
    } catch (error) {
      if ((error as any).repsonse && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState() as any;

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(`/api/user/profile`, config);
      return data;
    } catch (error) {
      if ((error as any).response && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);
