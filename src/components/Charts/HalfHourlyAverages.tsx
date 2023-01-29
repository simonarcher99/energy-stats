import { ChartOptions } from "chart.js";
import { appTheme } from "../../App";
import { Line } from "react-chartjs-2";
import { ConsumptionData } from "../../features/consumption/consumptionSlice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

const HalfHourlyAverages = (props: {
  data: ConsumptionData;
  unit: string;
  gasOrElec: string;
}) => {
  const [period, setPeriod] = useState<"1" | "3" | "6" | "12" | "all">("all");

  const getHalfHourlyAverages = (
    halfHour: number,
    data: ConsumptionData
  ): number => {
    const dataForHour = data.filter(
      (data) =>
        new Date(data.interval_start).getHours() * 2 +
          new Date(data.interval_start).getMinutes() / 30 ===
        halfHour
    );
    const totalForHour = dataForHour
      .map((hourData) => hourData.consumption)
      .reduce((partialSum, a) => partialSum + a, 0);
    return totalForHour / dataForHour.length;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod((event.target as HTMLInputElement).value as "1" | "3" | "6" | "12" | "all");
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
          text: props.unit,
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
        text: `Average ${props.gasOrElec} usage by half hour`,
      },
    },
  };

  const labels = [
    "0000",
    "0030",
    "0100",
    "0130",
    "0200",
    "0230",
    "0300",
    "0330",
    "0400",
    "0430",
    "0500",
    "0530",
    "0600",
    "0630",
    "0700",
    "0730",
    "0800",
    "0830",
    "0900",
    "0930",
    "1000",
    "1030",
    "1100",
    "1130",
    "1200",
    "1230",
    "1300",
    "1330",
    "1400",
    "1430",
    "1500",
    "1530",
    "1600",
    "1630",
    "1700",
    "1730",
    "1800",
    "1830",
    "1900",
    "1930",
    "2000",
    "2030",
    "2100",
    "2130",
    "2200",
    "2230",
    "2300",
    "2330",
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
          getHalfHourlyAverages(index, filteredData).toFixed(3)
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
        <FormControlLabel value="3" control={<Radio />} label="Last 3 months" />
        <FormControlLabel value="6" control={<Radio />} label="Last 6 months" />
        <FormControlLabel value="12" control={<Radio />} label="Last 12 months" />
        <FormControlLabel value="all" control={<Radio />} label="All time" />
      </RadioGroup>
    </FormControl>
      <Line options={options} data={data} />
    </>
  );
};

export default HalfHourlyAverages;
