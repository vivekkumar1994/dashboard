// src/dashboard/BubbleChart.jsx
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

Chart.register(...registerables);

const BubbleChart = ({ data }) => {
  const chartData = {
    datasets: [{
      label: 'Bubble Chart',
      data: data.map(item => ({
        x: item.intensity,
        y: item.likelihood,
        r: item.relevance,
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <Bubble data={chartData} />
  );
};

export default BubbleChart;
