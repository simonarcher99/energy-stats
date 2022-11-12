import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseElecUrl = "https://api.octopus.energy/v1/electricity-meter-points";
const baseGasUrl = "https://api.octopus.energy/v1/gas-meter-points/";

type GetMeterConsumption = {
  meterSerialNumber: string;
  apiKey: string;
  mpxn: string;
  gasOrElec: string;
};

export const getWeeklyConsumption = createAsyncThunk(
  "meters/consumption/weekly",
  async (getMeterConsumptionData: GetMeterConsumption, { rejectWithValue }) => {
    try {
      const { meterSerialNumber, apiKey, mpxn, gasOrElec } =
        getMeterConsumptionData;
      const data = await axios.get(
        `${
          gasOrElec === "electric" ? baseElecUrl : baseGasUrl
        }/${mpxn}/meters/${meterSerialNumber}/consumption/`,
        {
          params: {
            group_by: "week",
            order_by: "period",
            page_size: 100,
          },
          auth: { username: apiKey, password: "" },
        }
      );
      console.log(data.data.results);
      return data.data.results;
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);

export const getDailyConsumption = createAsyncThunk(
  "meters/consumption/daily",
  async (getMeterConsumptionData: GetMeterConsumption, { rejectWithValue }) => {
    try {
      const { meterSerialNumber, apiKey, mpxn, gasOrElec } =
        getMeterConsumptionData;
      const data = await axios.get(
        `${
          gasOrElec === "electric" ? baseElecUrl : baseGasUrl
        }/${mpxn}/meters/${meterSerialNumber}/consumption/`,
        {
          params: {
            group_by: "day",
            order_by: "period",
            page_size: 300,
          },
          auth: { username: apiKey, password: "" },
        }
      );
      console.log(data.data.results);
      return data.data.results;
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);

export const getHourlyConsumption = createAsyncThunk(
  "meters/consumption/hourly",
  async (getMeterConsumptionData: GetMeterConsumption, { rejectWithValue }) => {
    try {
      const { meterSerialNumber, apiKey, mpxn, gasOrElec } =
        getMeterConsumptionData;
      const data = await axios.get(
        `${
          gasOrElec === "electric" ? baseElecUrl : baseGasUrl
        }/${mpxn}/meters/${meterSerialNumber}/consumption/`,
        {
          params: { group_by: "hour", order_by: "period", page_size: 1000 },
          auth: { username: apiKey, password: "" },
        }
      );
      console.log(data.data.results);
      return data.data.results;
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);
