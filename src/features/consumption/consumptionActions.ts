import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseElecUrl = "https://api.octopus.energy/v1/electricity-meter-points";

type GetMeterConsumption = {
  meterSerialNumber: string;
  apiKey: string;
  mpan: string;
};

export const getConsumption = createAsyncThunk(
  "meters/consumption",
  async (getMeterConsumptionData: GetMeterConsumption, { rejectWithValue }) => {
    try {
      const { meterSerialNumber, apiKey, mpan } = getMeterConsumptionData;
      const data = await axios.get(
        `${baseElecUrl}/${mpan}/meters/${meterSerialNumber}/consumption/?group_by=day&order_by=period&page_size=300`,
        { auth: { username: apiKey, password: "" } }
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
