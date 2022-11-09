import { createSlice } from "@reduxjs/toolkit";
import { addMeter, getMeters } from "./metersActions";

type MeterData = {
  apiKey: string;
  gasOrElectric: string;
  meterSerialNumber: string;
  userId: string;
  meterName: string;
  retailer: string;
  mpxn: string;
};

const initialState: {
  loading: boolean;
  meters: MeterData[];
  error: any;
  success: boolean;
} = {
  loading: false,
  meters: [],
  error: null,
  success: false,
};

const metersSlice = createSlice({
  name: "meters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMeter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addMeter.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.meters = [...state.meters, payload];
      state.success = true;
    });
    builder.addCase(addMeter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getMeters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMeters.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.meters = payload;
      state.success = true;
    });
    builder.addCase(getMeters.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default metersSlice.reducer;
