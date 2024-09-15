// src/dashboard/Card.js
import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './card.css';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const Card = ({ title, apiEndpoint, chartType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(data,"data");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:6002/get-products');
        const result = await response.data
        setData(result.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const chartData = {
    labels: data.map(product => product.Barcode),
    datasets: [
      {
        label: title,
        data: data.map(product => parseFloat(product.Cost)),
        fill: chartType === 'line' ? true : false,
        backgroundColor: chartType === 'bar' ? 'rgba(75, 192, 192, 0.2)' : undefined,
        borderColor: chartType === 'line' || chartType === 'bar' ? 'rgba(75, 192, 192, 1)' : undefined,
        borderWidth: chartType === 'bar' ? 1 : undefined,
        tension: chartType === 'line' ? 0.1 : undefined,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: $${tooltipItem.raw}`,
        },
      },
    },
    scales: chartType !== 'pie' ? {
      x: {
        title: {
          display: true,
          text: 'Product Barcode',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cost',
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    } : undefined,
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          renderChart()
        )}
      </div>
    </div>
  );
};

export default Card;
