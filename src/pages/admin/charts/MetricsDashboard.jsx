import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MetricsDashboard = ({ metrics, timeRange }) => {
  const metricKeys = metrics ? Object.keys(metrics) : [];
  
  const chartData = {
    labels: metricKeys.map(key => {
      const titles = {
        activeUsers: 'Utilisateurs',
        conversionRate: 'Conversion',
        revenue: 'Revenu',
        sessions: 'Sessions'
      };
      return titles[key] || key;
    }),
    datasets: [
      {
        label: `Valeurs (${timeRange})`,
        data: metricKeys.map(key => metrics[key].value),
        backgroundColor: 'rgba(59, 130, 246, 0.7)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
      <div className="mt-4 grid grid-cols-2 gap-2">
        {metricKeys.map(key => (
          <div key={key} className="bg-gray-50 p-2 rounded">
            <p className="text-sm font-medium">{key}</p>
            <p className="text-lg font-bold">{metrics[key].value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsDashboard;