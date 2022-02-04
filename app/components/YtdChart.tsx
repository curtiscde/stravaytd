import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Legend,
  Title,
  Tooltip,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Legend,
  Title,
  Tooltip
);

export default function YtdChart({ data }: { data: any }) {
  const options: ChartOptions = {
    normalized: true,
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY'
          },
        },
      },
      y: {
        type: 'linear',
        min: 0,
      }
    },
  };

  {/*
          // @ts-ignore */}
  return <Line options={options} data={data} />
}
