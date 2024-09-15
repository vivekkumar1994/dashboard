// src/dashboard/HeatmapChart.jsx
import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

Chart.register(...registerables, MatrixController, MatrixElement);

const HeatmapChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Destroy previous chart instance if it exists
    if (ctx.chartInstance) {
      ctx.chartInstance.destroy();
    }

    const chart = new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'Heatmap',
          data: data.map(item => ({
            x: item.year, // X-axis data
            y: item.intensity, // Y-axis data
            v: item.likelihood, // Value
          })),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        indexAxis: 'y',
        elements: {
          rectangle: {
            borderWidth: 1,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Year: ${context.raw.x}, Intensity: ${context.raw.y}, Likelihood: ${context.raw.v}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });

    // Save the chart instance for future reference
    ctx.chartInstance = chart;
    
    return () => {
      if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default HeatmapChart;
