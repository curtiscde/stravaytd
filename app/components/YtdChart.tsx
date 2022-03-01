/* eslint-disable no-lone-blocks */
import React from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Legend,
  Title,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Legend,
  Title,
  Tooltip,
);

dayjs.extend(advancedFormat);

interface YtdChartProps {
  data: any;
  formatTooltip?: (y: any) => string
}

export default function YtdChart({ data, formatTooltip }: YtdChartProps) {
  const options: ChartOptions = {
    normalized: true,
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY',
          },
        },
      },
      y: {
        type: 'linear',
        min: 0,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          // @ts-ignore
          title: (tooltipItems) => dayjs(tooltipItems[0].parsed.x).format('MMM Do, YYYY'),
          label(tooltipItem) {
            const { dataset: { label: dataSetLabel }, parsed: { y } } = tooltipItem;
            return `${dataSetLabel}: ${formatTooltip ? formatTooltip(y) : y}`;
          },
        },
      },
    },
  };

  { /* @ts-ignore */ }
  return <Line options={options} data={data} />;
}

YtdChart.defaultProps = {
  formatTooltip: null,
};
