import { ChartOptions } from "chart.js";
import { appTheme } from "../../App";
import { Line } from "react-chartjs-2";
import { ConsumptionData } from "../../features/consumption/consumptionSlice";

const HalfHourlyAverages = (props: { data: ConsumptionData, unit: string, gasOrElec: string }) => {
  const getHalfHourlyAverages = (halfHour: number, data: ConsumptionData): number => {
    const dataForHour = data.filter(
      (data) => new Date(data.interval_start).getHours() * 2 + new Date(data.interval_start).getMinutes() / 30 === halfHour
    );
    const totalForHour = dataForHour
      .map((hourData) => hourData.consumption)
      .reduce((partialSum, a) => partialSum + a, 0);
    return totalForHour / dataForHour.length;
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
    "2330"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Usage",
        data: labels.map((label, index) =>
          getHalfHourlyAverages(index, props.data).toFixed(3)
        ),
        backgroundColor: appTheme.palette.secondary.light,
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default HalfHourlyAverages;
