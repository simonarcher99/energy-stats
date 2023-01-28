import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseElecUrl = "https://api.octopus.energy/v1/electricity-meter-points";
const baseGasUrl = "https://api.octopus.energy/v1/gas-meter-points/";

export type GetMeterConsumption = {
  meterSerialNumber: string;
  apiKey: string;
  mpxn: string;
  gasOrElec: string;
  period: "day" | "week" | "month" | "hour",
  pageSize: number;
};

export const getConsumption = createAsyncThunk(
  "meters/consumption",
  async (getMeterConsumptionData: GetMeterConsumption, { rejectWithValue }) => {
    try {
      const { meterSerialNumber, apiKey, mpxn, gasOrElec } =
        getMeterConsumptionData;
      let url = `${
        gasOrElec === "electric" ? baseElecUrl : baseGasUrl
      }/${mpxn}/meters/${meterSerialNumber}/consumption/`
      let data = await axios.get(
        url,
        {
          params: {
            period_from: "2019-01-01T00:00:00",
            period_to: "2023-07-01T00:00:00",
            page_size: "20000"           
          },
          auth: { username: apiKey, password: "" },
        }
      );
      console.log(data.data)
      const aggregatedData = data.data.results
      while (data.data.next) {
        console.log(data.data.next)
        
        url = data.data.next
        data = await axios.get(
          url,
          {
            auth: { username: apiKey, password: "" },
          }
        );
        console.log(data.data)
        aggregatedData.push(data.data.results)
      }
      console.log(aggregatedData);
      return aggregatedData;
    } catch (error) {
      if ((error as any).respnose && (error as any).response.data.message) {
        return rejectWithValue((error as any).response.data.message);
      } else {
        return rejectWithValue((error as any).message);
      }
    }
  }
);
