// src/dashboard/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.topic),
    datasets: [
      {
        label: 'Impact by Topic',
        data: data.map(item => item.intensity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
