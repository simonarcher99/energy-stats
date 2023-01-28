import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { appTheme } from "../../App";
import { ConsumptionData } from "../../features/consumption/consumptionSlice";
import { useState } from "react";

const ConsumptionBarChart = (props: {
  consumption: ConsumptionData;
  unit: string;
}) => {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [period, setPeriod] = useState<
    "halfHourly" | "hourly" | "daily" | "monthly"
  >("monthly");

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleInputChange = (event: SelectChangeEvent) => {
    setPeriod(
      event.target.value as "halfHourly" | "hourly" | "daily" | "monthly"
    );
  };

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

  const fullConsumptionData = [...props.consumption].reverse();

  const totalReadings = fullConsumptionData.length;
  const stepSize = totalReadings / 100;

  const consumptionDataToSplice = [...fullConsumptionData];

  const consumptionData = consumptionDataToSplice.splice(
    value[0] * stepSize,
    ((value[1] - value[0]) / 100) * totalReadings
  );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      yAxis: {
        title: {
          display: true,
          text: props.unit,
        },
      },
      xAxis: {
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Consumption Data",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (item) => `${item.formattedValue} kWh`,
        },
      },
    },
  };

  const getBins = (
    data: ConsumptionData,
    period: "monthly" | "daily" | "hourly" | "halfHourly"
  ): Record<string, number> => {
    const dailyData = {} as Record<string, number>;
    for (var consumptionData of data) {
      const date = new Date(consumptionData.interval_start);
      let day: string;
      switch (period) {
        case "monthly":
          day = `${date.getMonth() + 1}-${date.getFullYear()}`;
          break;
        case "daily":
          day = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;
          break;
        case "hourly":
          day = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}-${date.getHours()}`;
          break;
        case "halfHourly":
          day = date.toLocaleString();
          break;
        default:
          day = "unknown";
      }
      if (day in dailyData) {
        dailyData[day] += consumptionData.consumption;
      } else {
        dailyData[day] = consumptionData.consumption;
      }
    }

    return dailyData;
  };

  const binsObject = getBins(consumptionData, period);

  const data = {
    labels: Object.keys(binsObject),
    datasets: [
      {
        data: Object.values(binsObject),
        backgroundColor: appTheme.palette.secondary.light,
      },
    ],
  };

  return (
    <>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Period</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={period}
              label="Period"
              onChange={handleInputChange}
            >
              <MenuItem value={"monthly"}>Monthly</MenuItem>
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"hourly"}>Hourly</MenuItem>
              <MenuItem value={"halfHourly"}>Half-Hourly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      <Bar options={options} data={data} />
    </>
  );
};

export default ConsumptionBarChart;
