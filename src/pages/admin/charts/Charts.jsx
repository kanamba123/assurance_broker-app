import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Enregistrer les composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: '#e5e7eb',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export const PieChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      },
    },
    cutout: '70%',
  };

  return <Pie options={options} data={data} />;
};

// Composant pour les petites statistiques
export const MiniStatsChart = ({ value, label, color }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}` }}
      >
        <div style={{ backgroundColor: color }} className="w-3 h-3 rounded-full"></div>
      </div>
      <div className="ml-4">
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
};