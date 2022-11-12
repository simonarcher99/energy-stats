import {
  Container,
  CssBaseline,
  Toolbar,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useEffect } from "react";
import {
  getDailyConsumption,
  getHourlyConsumption,
  getWeeklyConsumption,
} from "../features/consumption/consumptionActions";
import DailyAverages from "../components/Charts/DailyAverages";
import DailyBarChart from "../components/Charts/DailyBarChart";

const Consumption = () => {
  const { meterSerialNumber } = useParams();
  const dispatch = useAppDispatch();
  const { meters } = useSelector((state: RootState) => state.meters);
  const { consumption } = useSelector((state: RootState) => state.consumption);
  const meter = meters.filter(
    (meter) => meter.meterSerialNumber === meterSerialNumber
  )[0];
  useEffect(() => {
    const apiData = {
      meterSerialNumber: meter.meterSerialNumber,
      apiKey: meter.apiKey,
      mpxn: meter.mpxn,
      gasOrElec: meter.gasOrElectric,
    };
    dispatch(getDailyConsumption(apiData));
    dispatch(getWeeklyConsumption(apiData));
    dispatch(getHourlyConsumption(apiData));
  }, [dispatch, meter]);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Toolbar />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "top",
              pb: "2rem",
            }}
          >
            <Typography variant="h2">{meter.meterName}</Typography>
            <Typography variant="h6" sx={{ opacity: "50%" }}>
              Fuel:{" "}
              {meter.gasOrElectric.charAt(0).toUpperCase() +
                meter.gasOrElectric.slice(1)}
            </Typography>
          </Container>

          {consumption.daily.length > 0 && (
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DailyBarChart consumption={consumption.daily} />
              </Grid>

              <Grid item xs={12}>
                <DailyAverages data={consumption.daily} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Consumption;
