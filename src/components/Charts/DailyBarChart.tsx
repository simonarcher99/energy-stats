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

  const labels = props.consumption.map((data) => data.interval_start);

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
