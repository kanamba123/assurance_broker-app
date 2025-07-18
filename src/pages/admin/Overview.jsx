import StatsCards from '../../components/admin/StatsCards';
import { FiActivity, FiUsers, FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { BarChart, PieChart } from './charts/Charts';
import RecentActivity from './charts/RecentActivity';
import UserProgress from './charts/UserProgress';

const Overview = () => {
  // Données factices pour les graphiques
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventes 2023',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const trafficData = {
    labels: ['Mobile', 'Desktop', 'Tablette'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
            <FiCalendar className="text-gray-500 mr-2" />
            <span className="text-gray-600">12-18 Juin 2023</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Exporter
          </button>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Performance des ventes</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">Mensuel</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded">Annuel</button>
            </div>
          </div>
          <BarChart data={salesData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sources de trafic</h2>
          <PieChart data={trafficData} />
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Mobile (60%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Desktop (30%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Tablette (10%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>
          <RecentActivity />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Progression des utilisateurs</h2>
          <UserProgress />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Objectifs</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Chiffre d'affaires</span>
                <span className="text-sm font-medium text-gray-700">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Nouveaux clients</span>
                <span className="text-sm font-medium text-gray-700">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Satisfaction client</span>
                <span className="text-sm font-medium text-gray-700">90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center">
            <FiTrendingUp className="text-blue-600 text-xl mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-800">12% d'augmentation</p>
              <p className="text-xs text-blue-600">par rapport au mois dernier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;