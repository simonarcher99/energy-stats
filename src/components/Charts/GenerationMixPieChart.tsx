import { GenerationMix } from "../CarbonIntensity";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenerationMixPieChart = (props: { generationMix: GenerationMix[] }) => {
  let randomBackgroundColor = [];
  let usedColors = new Set();

  let dynamicColors = function (): string {
    let r = Math.floor(Math.random() * 100);
    let g = Math.floor(Math.random() * 200);
    let b = Math.floor(Math.random() * 255);
    let color = "rgb(" + r + "," + g + "," + b + ")";

    if (!usedColors.has(color)) {
      usedColors.add(color);
      return color;
    } else {
      return dynamicColors();
    }
  };

  const sortedGenerationMix = props.generationMix.filter(data => data.perc !== 0).sort((a, b) => {
    if (a.perc < b.perc) {
      return 1;
    }
    if (a.perc > b.perc) {
      return -1;
    }
    return 0;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (let i in sortedGenerationMix) {
    randomBackgroundColor.push(dynamicColors());
  }

  const data = {
    labels: sortedGenerationMix.map((entry) => entry.fuel),
    datasets: [
      {
        label: "Fuel type",
        data: sortedGenerationMix.map((entry) => entry.perc),
        borderWidth: 1,
        backgroundColor: randomBackgroundColor
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
          display: true,
          position: "right" as "right"
      }
    },
  };
  return <Pie data={data} options={options}/>;
};

export default GenerationMixPieChart;
