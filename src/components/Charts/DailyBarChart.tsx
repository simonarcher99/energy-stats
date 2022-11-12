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

const DailyBarChart = (props: { consumption: ConsumptionData }) => {
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

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      yAxis: {
        title: {
          display: true,
          text: "kWh",
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

  const labels = props.consumption.map((data) =>
    new Date(data.interval_start).toDateString()
  );

  const data = {
    labels,
    datasets: [
      {
        data: props.consumption.map((data) => data.consumption),
        backgroundColor: appTheme.palette.secondary.light,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default DailyBarChart;
