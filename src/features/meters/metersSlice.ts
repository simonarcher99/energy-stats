import { createSlice } from "@reduxjs/toolkit";
import { addMeter, getMeters, deleteMeter } from "./metersActions";

type MeterData = {
  apiKey: string;
  gasOrElectric: string;
  meterSerialNumber: string;
  userId: string;
  meterName: string;
  retailer: string;
  mpxn: string;
};

type MetersState = {
  loading: boolean;
  fetched: boolean;
  meters: MeterData[];
  error: any;
  success: boolean;
};

const initialState: MetersState = {
  loading: false,
  meters: [],
  error: null,
  fetched: false,
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
      state.fetched = true;
    });
    builder.addCase(getMeters.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.fetched = true;
      state.success = false
    });
    builder.addCase(deleteMeter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMeter.fulfilled, (state, { payload }) => {
      state.meters = state.meters.filter(
        (meter) => meter.meterSerialNumber !== payload.meterSerialNumber
      );
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteMeter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default metersSlice.reducer;
