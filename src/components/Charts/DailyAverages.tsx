import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChartOptions } from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { appTheme } from "../../App";
import { ConsumptionData } from "../../features/consumption/consumptionSlice";

const DailyAverages = (props: {
  data: ConsumptionData;
  unit: string;
  gasOrElec: string;
}) => {
  const [period, setPeriod] = useState<"1" | "3" | "6" | "12" | "all">("all");

  const getDailyAverage = (day: number, data: ConsumptionData): number => {
    const dataForDay = data.filter(
      (data) => new Date(data.interval_start).getDay() === day
    );
    const totalForDay = dataForDay
      .map((dayData) => dayData.consumption)
      .reduce((partialSum, a) => partialSum + a, 0);
    console.log(`totalForDay: ${totalForDay}`);
    console.log(`Number of days: ${dataForDay.length}`);
    return totalForDay / (dataForDay.length / 48);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(
      (event.target as HTMLInputElement).value as "1" | "3" | "6" | "12" | "all"
    );
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
          text: props.unit === "m" ? "m\u00B3" : props.unit,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Average ${props.gasOrElec} usage by day`,
      },
      tooltip: {
        callbacks: {
          label: (item) =>
            `${item.formattedValue}${
              props.unit === "m" ? "m\u00B3" : props.unit
            }`,
        },
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

  const filteredData = props.data.filter((data) => {
    switch (period) {
      case "1":
      case "3":
      case "6":
      case "12":
        const monthAgo = new Date();
        monthAgo.setMonth(new Date().getMonth() - +period);
        return new Date(data.interval_start) > monthAgo;
      default:
        return true;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Usage",
        data: labels.map((label, index) =>
          getDailyAverage(index, filteredData).toFixed(3)
        ),
        backgroundColor: appTheme.palette.secondary.light,
      },
    ],
  };

  return (
    <>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Period</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={period}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="1" control={<Radio />} label="Last month" />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Last 3 months"
          />
          <FormControlLabel
            value="6"
            control={<Radio />}
            label="Last 6 months"
          />
          <FormControlLabel
            value="12"
            control={<Radio />}
            label="Last 12 months"
          />
          <FormControlLabel value="all" control={<Radio />} label="All time" />
        </RadioGroup>
      </FormControl>
      <Line options={options} data={data} />
    </>
  );
};

export default DailyAverages;
