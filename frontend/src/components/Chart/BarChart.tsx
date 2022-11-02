import { BarChartProps } from '../../types/barChart';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale } from 'chart.js';
import 'chart.js/auto';
import './barChart.scss';

ChartJS.register(CategoryScale, LinearScale);

const BarChart = ({ chartData }: { chartData: BarChartProps }) => {
  return (
    <Bar
      className="bar-chart"
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'Rent Data',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      }}
    />
  );
};

export default BarChart;
