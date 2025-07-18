import React, { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsData } from '../../hooks/api/analytics';
// import StatsCards from '../../components/admin/StatsCards';
import DataTableSkeleton from '../../components/skeletons/DataTableSkeleton';
import ErrorFallback from './error/ErrorFallback';
import MetricsDashboard from './charts/MetricsDashboard';

// Composants dynamiques
const ActivityChart = React.lazy(() => import('../../components/charts/ActivityChart'));
const CustomerSegmentation = React.lazy(() => import('./analyticsantity/CustomerSegmentation'));
const ExpertPerformance = React.lazy(() => import('./analyticsantity/ExpertPerformance'));
// const RevenueTrends = React.lazy(() => import('./analyticsantity/RevenueTrends'));

const DataAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const handleExport = (format) => {
    // Implémentation réelle de l'export
    console.log(`Exporting data as ${format}...`);
    // Ici vous pourriez appeler une API pour générer le rapport
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord analytique</h1>
        <p className="text-gray-600">
          {timeRange === '7d' ? 'Données des 7 derniers jours' : 'Données des 30 derniers jours'}
        </p>
      </header>

      {/* Navigation par onglets */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'customers', 'experts', 'transactions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab === 'overview' && 'Vue globale'}
              {tab === 'customers' && 'Clients'}
              {tab === 'experts' && 'Experts'}
              {tab === 'transactions' && 'Transactions'}
            </button>
          ))}
        </nav>
      </div>

      {/* Cartes de statistiques */}
      <section className="mb-8">
        {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
          <StatsCards 
            metrics={data?.metrics} 
            loading={isLoading} 
            activeTab={activeTab}
          />
        </ErrorBoundary> */}
      </section>

      {/* Contenu spécifique à chaque onglet */}
      {activeTab === 'overview' && (
        <OverviewTab data={data} isLoading={isLoading} timeRange={timeRange} setTimeRange={setTimeRange} />
      )}

      {activeTab === 'customers' && (
        <CustomersTab data={data} isLoading={isLoading} />
      )}

      {activeTab === 'experts' && (
        <ExpertsTab data={data} isLoading={isLoading} />
      )}

      {activeTab === 'transactions' && (
        <TransactionsTab data={data} isLoading={isLoading} />
      )}

      {/* Section d'export */}
      <ExportSection handleExport={handleExport} refetch={refetch} />
    </div>
  );
};

// Composants pour chaque onglet
const OverviewTab = ({ data, isLoading, timeRange, setTimeRange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DataTableSkeleton />}>
          <ActivityChart data={data?.activity || { labels: [], values: [] }} />
        </Suspense>
      </ErrorBoundary>
    </section>

    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistiques clés</h2>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DataTableSkeleton />}>
          <MetricsDashboard metrics={data?.metrics || {}} />
        </Suspense>
      </ErrorBoundary>
    </section>

    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendances de revenus</h2>
      {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DataTableSkeleton />}>
          <RevenueTrends data={data?.revenueTrends || []} />
        </Suspense>
      </ErrorBoundary> */}
    </section>
  </div>
);

const CustomersTab = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Segmentation des clients</h2>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DataTableSkeleton />}>
          <CustomerSegmentation data={data?.customerSegmentation || []} />
        </Suspense>
      </ErrorBoundary>
    </section>
    
    {/* Autres visualisations clients */}
  </div>
);

const ExpertsTab = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance des experts</h2>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DataTableSkeleton />}>
          <ExpertPerformance data={data?.expertPerformance || []} />
        </Suspense>
      </ErrorBoundary>
    </section>
    
    {/* Autres visualisations experts */}
  </div>
);

const TransactionsTab = ({ data }) => (
  <div className="grid grid-cols-1 gap-6">
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Détails des transactions</h2>
      {/* Tableau des transactions */}
    </section>
  </div>
);

const TimeRangeSelector = ({ timeRange, setTimeRange }) => (
  <div className="flex space-x-2">
    <button
      onClick={() => setTimeRange('7d')}
      className={`px-3 py-1 text-sm rounded-md ${
        timeRange === '7d' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      7 jours
    </button>
    <button
      onClick={() => setTimeRange('30d')}
      className={`px-3 py-1 text-sm rounded-md ${
        timeRange === '30d' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      30 jours
    </button>
  </div>
);

const ExportSection = ({ handleExport, refetch }) => (
  <section className="mt-8">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Export & Actions</h2>
      <div className="flex flex-wrap gap-4">
        <ExportButton icon="pdf" label="Exporter en PDF" onClick={() => handleExport('pdf')} />
        <ExportButton icon="csv" label="Télécharger CSV" onClick={() => handleExport('csv')} />
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <RefreshIcon />
          Actualiser les données
        </button>
      </div>
    </div>
  </section>
);

const ExportButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
  >
    {icon === 'pdf' && <PdfIcon />}
    {icon === 'csv' && <CsvIcon />}
    {label}
  </button>
);

// Icônes
const PdfIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const CsvIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default DataAnalytics;