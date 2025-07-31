import { HomeIcon, BellIcon, ChevronDownIcon, LogOutIcon, MenuIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import config from "../../config/config";
import axios from "axios";

const Navbar = ({ onMenuClick, className }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        // Appel API logout pour invalider le refresh token côté serveur
        await axios.post(
          `${config.API_BASE_URL}/logout`,
          { refresh_token: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Si on arrive ici, c’est que la déconnexion serveur a réussi
        localStorage.removeItem("authToken");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        // Rediriger vers la page de login
        navigate("/login");
      } else {
        // Pas de refresh token trouvé en local
        console.warn("Aucun refresh token trouvé, impossible de déconnecter côté serveur");
        // Tu peux gérer un fallback ici si tu veux
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      // Ici on ne fait pas le nettoyage ni la redirection
      // Tu peux afficher un message ou laisser comme ça
    }
  };


  return (
    <header className={`${className} z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Logo/Home link */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="hidden md:flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Accueil
            </NavLink>
          </div>


          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NavLink
              to="/admin/dashboard/notification"
              className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none relative"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </NavLink>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button
                className="flex items-center text-sm rounded-full focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.role || ''}</p>
                </div>
                <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>
                    <NavLink
                      to="/admin/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Mon profil
                    </NavLink>
                    <NavLink
                      to="/admin/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Paramètres
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;