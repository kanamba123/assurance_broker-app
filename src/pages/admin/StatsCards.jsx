import React from 'react';
import { TrendUpIcon, TrendDownIcon, NeutralIcon } from '../icons';

const MetricCard = ({ title, value, change, trend }) => {
  const trendColors = {
    up: 'text-green-500 bg-green-50',
    down: 'text-red-500 bg-red-50',
    neutral: 'text-gray-500 bg-gray-50'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex-1 min-w-[200px]">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex justify-between items-end">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${trendColors[trend]}`}>
          {trend === 'up' && <TrendUpIcon className="w-3 h-3" />}
          {trend === 'down' && <TrendDownIcon className="w-3 h-3" />}
          {trend === 'neutral' && <NeutralIcon className="w-3 h-3" />}
          {change}%
        </span>
      </div>
    </div>
  );
};

const StatsCards = ({ metrics, loading }) => {
  if (loading) return <StatsCardsSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Utilisateurs actifs"
        value={metrics?.activeUsers?.value || '0'}
        change={metrics?.activeUsers?.change || 0}
        trend={metrics?.activeUsers?.trend || 'neutral'}
      />
      <MetricCard
        title="Taux de conversion"
        value={metrics?.conversionRate?.value ? `${metrics.conversionRate.value}%` : '0%'}
        change={metrics?.conversionRate?.change || 0}
        trend={metrics?.conversionRate?.trend || 'neutral'}
      />
      <MetricCard
        title="Revenu total"
        value={metrics?.revenue?.value ? `$${metrics.revenue.value}` : '$0'}
        change={metrics?.revenue?.change || 0}
        trend={metrics?.revenue?.trend || 'neutral'}
      />
      <MetricCard
        title="Sessions"
        value={metrics?.sessions?.value || '0'}
        change={metrics?.sessions?.change || 0}
        trend={metrics?.sessions?.trend || 'neutral'}
      />
    </div>
  );
};

const StatsCardsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-end">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ))}
  </div>
);

export default StatsCards;