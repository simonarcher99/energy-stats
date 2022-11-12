import { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { appTheme } from "../../App";
import { ConsumptionData } from "../../features/consumption/consumptionSlice";

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
          text: "kWh",
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
        backgroundColor: appTheme.palette.secondary.light,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default DailyAverages;
