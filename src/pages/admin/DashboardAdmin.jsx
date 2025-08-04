import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../contexts/authContext';

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, showWarning } = useAuth();

  return (
    <div className="block h-screen bg-gray-100 md:flex ">
      {/* Sidebar - Toujours visible en desktop */}
      <div >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Conteneur principal */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Navbar */}
        <div >
          <Navbar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            className="border-b border-gray-200 bg-white shadow-sm"
          />
        </div>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto  ">
          <div className="max-w-7xl mx-auto p-2">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Notification d'avertissement */}
      {showWarning && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-xl p-4 flex items-center justify-between animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-800 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-yellow-900 font-medium">
                Vous serez déconnecté dans 5 minutes pour inactivité
              </span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="ml-4 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Rester connecté
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;