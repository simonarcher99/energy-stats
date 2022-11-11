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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { ConsumptionData } from "../features/consumption/consumptionSlice";
import { ChartOptions } from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Consumption Data",
    },
    legend: {
      display: false,
    },
  },
};

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

  const labels = consumption.map((data) => data.interval_start);

  const data = {
    labels,
    datasets: [
      {
        data: consumption.map((data) => data.consumption),
        backgroundColor: theme.palette.secondary.light,
      },
    ],
  };

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
          <Typography>{meter.meterName}</Typography>
          <Typography>Gas/Electric: {meter.gasOrElectric}</Typography>
          {consumption.length > 0 && <Bar options={options} data={data} />}
          {consumption.length > 0 && <DailyAverages data={consumption} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Consumption;

const DailyAverages = (props: { data: ConsumptionData }) => {
  const getDailyAverage = (day: number, data: ConsumptionData): number => {
    const dataForDay = data.filter(
      (data) => new Date(data.interval_start).getDay() === day
    );
    const totalForDay = dataForDay
      .map((dayData) => dayData.consumption)
      .reduce((partialSum, a) => partialSum + a, 0);
    return totalForDay / dataForDay.length;
  };

  const options: ChartOptions<"line"> = {
    elements: {
      line: {
        tension: 0.3,
      },
    },
    scales: {
      yAxis: {
        title: {
          display: true,
          text: "kWh"
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Average Energy Usage By Day - 2022",
      },
    },
  };

  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((label, index) =>
          getDailyAverage(index, props.data).toFixed(2)
        ),
        backgroundColor: theme.palette.secondary.light,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
