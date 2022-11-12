import { createSlice } from "@reduxjs/toolkit";
import {
  getHourlyConsumption,
  getDailyConsumption,
  getWeeklyConsumption,
} from "./consumptionActions";

export type ConsumptionData = {
  interval_start: string;
  interval_end: string;
  consumption: number;
}[];

type ConsumptionState = {
  loading: boolean;
  error: any;
  success: boolean;
  consumption: {
    weekly: ConsumptionData;
    daily: ConsumptionData;

    hourly: ConsumptionData;
  };
};

const initialState: ConsumptionState = {
  loading: false,
  error: null,
  success: false,
  consumption: {
    weekly: [],
    daily: [],
    hourly: [],
  },
};

const consumptionSlice = createSlice({
  name: "consumption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeeklyConsumption.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWeeklyConsumption.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.consumption.weekly = payload;
      state.success = true;
    });
    builder.addCase(getWeeklyConsumption.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      state.consumption.weekly = [];
    });
    builder.addCase(getDailyConsumption.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDailyConsumption.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.consumption.daily = payload;
      state.success = true;
    });
    builder.addCase(getDailyConsumption.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      state.consumption.daily = [];
    });
    builder.addCase(getHourlyConsumption.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getHourlyConsumption.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.consumption.hourly = payload;
      state.success = true;
    });
    builder.addCase(getHourlyConsumption.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      state.consumption.hourly = [];
    });
  },
});

export default consumptionSlice.reducer;
