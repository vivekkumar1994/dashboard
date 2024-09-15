// src/dashboard/RadarChart.jsx
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Radar } from 'react-chartjs-2';

Chart.register(...registerables);

const RadarChart = ({ data }) => {
  const chartData = {
    labels: ['Intensity', 'Likelihood', 'Relevance'],
    datasets: [{
      label: 'Metrics',
      data: [
        data.reduce((sum, item) => sum + item.intensity, 0) / data.length,
        data.reduce((sum, item) => sum + item.likelihood, 0) / data.length,
        data.reduce((sum, item) => sum + item.relevance, 0) / data.length,
      ],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <Radar data={chartData} />
  );
};

export default RadarChart;
