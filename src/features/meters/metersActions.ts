import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://3qwfx5k0o4.execute-api.us-east-1.amazonaws.com/dev";

type GetMeters = {
  userToken: string;
  userId: string;
};

type AddMeter = {
  userId: string;
  retailer: string;
  gasOrElectric: string;
  meterName: string;
  meterSerialNumber: string;
  mpxn: string;
  apiKey: string;
};

export const getMeters = createAsyncThunk(
  "meters/get",
  async (getMetersData: GetMeters, { rejectWithValue }) => {
    try {
      const { userId } = getMetersData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
            userId
        }
      };
      // TODO: add userToken in authentication
      const { data } = await axios.get(`${baseUrl}/meters/get-meters`, config);

      return data.data;
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);

export const addMeter = createAsyncThunk(
  "meters/add",
  async (addMeterData: AddMeter, { rejectWithValue }) => {
    try {
      const {
        userId,
        retailer,
        gasOrElectric,
        meterName,
        meterSerialNumber,
        mpxn,
        apiKey,
      } = addMeterData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${baseUrl}/meters/add-meter`,
        {
          userId,
          retailer,
          gasOrElectric,
          meterName,
          meterSerialNumber,
          mpxn,
          apiKey,
        },
        config
      );

      return {
        userId,
        retailer,
        gasOrElectric,
        meterName,
        meterSerialNumber,
        mpxn,
        apiKey,
      };
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);
