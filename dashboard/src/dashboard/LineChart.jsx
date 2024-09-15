import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous instance if exists
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.label), // Adjust according to your data structure
        datasets: [{
          label: 'Intensity',
          data: data.map(item => item.intensity),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.raw;
              }
            }
          }
        }
      }
    });

    // Clean up chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
