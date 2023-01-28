import { createSlice } from "@reduxjs/toolkit";
import {
  getConsumption
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
  consumption: ConsumptionData;
};

const initialState: ConsumptionState = {
  loading: false,
  error: null,
  success: false,
  consumption: [],
};

const consumptionSlice = createSlice({
  name: "consumption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConsumption.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getConsumption.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.consumption = payload;
      state.success = true;
    });
    builder.addCase(getConsumption.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      state.consumption = [];
    });
  },
});

export default consumptionSlice.reducer;
