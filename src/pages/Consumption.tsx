import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Toolbar,
  Box,
  createTheme,
  ThemeOptions,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useEffect } from "react";
import { getConsumption } from "../features/consumption/consumptionActions";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#2e3954",
    },
    secondary: {
      main: "#a6003b",
    },
    error: {
      main: "#c3504a",
    },
  },
};

const theme = createTheme(themeOptions);

const Consumption = () => {
  const { meterSerialNumber } = useParams();
  const dispatch = useAppDispatch();
  const { meters } = useSelector((state: RootState) => state.meters);
  const { consumption } = useSelector((state: RootState) => state.consumption);
  const meter = meters.filter(
    (meter) => meter.meterSerialNumber === meterSerialNumber
  )[0];
  useEffect(() => {
    dispatch(
      getConsumption({
        meterSerialNumber: meter.meterSerialNumber,
        apiKey: meter.apiKey,
        mpan: meter.mpxn,
      })
    );
  }, [dispatch, meter]);

  return (
    <ThemeProvider theme={theme}>
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
          <Typography>
            Meter Serial Number: {meter.meterSerialNumber}
          </Typography>
          <Typography>Meter Name: {meter.meterName}</Typography>
          <Typography>Gas/Electric: {meter.gasOrElectric}</Typography>
          <Typography>API Key: {meter.apiKey}</Typography>
          {consumption.length > 0 && (
            <Graph
              chartData={consumption.map((dataPoint) => {
                return {
                  start: dataPoint.interval_start,
                  consumption: dataPoint.consumption,
                };
              })}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Consumption;

const Graph = (props: { chartData: any }) => {
  return (
    <Paper>
      <Chart data={props.chartData} width={800}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="consumption" argumentField="start" />
        <Title text="Daily Consumption" />
        <Animation />
      </Chart>
    </Paper>
  );
};
