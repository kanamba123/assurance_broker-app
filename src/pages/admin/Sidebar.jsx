import { useState } from 'react';
import { GitPullRequestIcon, UserIcon, ChevronDownIcon, ChevronUpIcon, Building, FileCheck2, UsersRound, ReceiptText, Banknote, TriangleAlert, ChartBar, Mail, MessageSquareMore, Settings, Circle, } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [expandedMenus, setExpandedMenus] = useState({});

  // Fonction pour basculer l'état d'expansion d'un menu
  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  // Icônes SVG inline
  const HomeIcon = () => (
    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const UsersIcon = () => (
    <svg className="h-5 w-5 mr-3 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );


  const CloseIcon = () => (
    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  // Structure des menus avec sous-items
  const menuItems = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/admin',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Compagnies',
      icon: Building,
      path: '/admin/dashboard/compagnies',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Assurances',
      icon: FileCheck2,
      roles: ['admin'],
      subItems: [
        { name: 'Catégories assurance', icon: Circle, path: '/admin/dashboard/categoriesassurance' },
        { name: 'Branches', path: '/admin/dashboard/branches' },
        { name: 'Polices assurances', path: '/admin/dashboard/polices_assurances' },
        { name: 'Primes Ratio', path: '/admin/dashboard/primesratio' },
        { name: 'Nos produits', path: '/admin/dashboard/camponyProducts' },
        { name: 'Catégories ', path: '/admin/dashboard/service_category' },
      ]
    },
    {
      name: 'Clients',
      icon: UsersRound,
      path: '/admin/dashboard/clients',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Contract & Devis',
      icon: ReceiptText,
      roles: ['admin'],
      subItems: [
        { name: 'Simulations', path: '/admin/dashboard/simulations' },
        { name: 'Contracts', path: '/admin/dashboard/contracts' },
        { name: 'Devis', path: '/admin/dashboard/devis' },
      ]
    },
    {
      name: 'Commitions',
      icon: ReceiptText,
      roles: ['admin'],
      subItems: [
        { name: 'Taux commissions', path: '/admin/dashboard/tauxcommissions' },
        { name: 'Commission', path: '/admin/dashboard/commission' }
      ]
    },
    {
      name: 'Paiements',
      icon: Banknote,
      path: '/admin/dashboard/paiements',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Sinistres',
      icon: TriangleAlert,
      path: '/admin/dashboard/sinistres',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Statistiques/Rapports',
      icon: ChartBar,
      roles: ['admin'],
      subItems: [
        { name: 'Sinistres/primes', path: '/admin/dashboard/service' },
        { name: 'Données analytics ', path: '/admin/dashboard/donneesanalytic' },
        { name: 'Données analytics2', path: '/admin/dashboard/donneesanalytic2' },
        { name: 'Publications', path: '/admin/dashboard/publications' },
      ]
    },
    {
      name: 'Messages',
      icon: Mail,
      path: '/admin/dashboard/message',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Temoignages',
      icon: MessageSquareMore,
      path: '/admin/dashboard/temoignage',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Paramettres',
      icon: Settings,
      path: '/admin/dashboard/settings',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Utilisateurs',
      icon: UsersIcon,
      path: '/admin/dashboard/users',
      roles: ['admin']
    },
  ];

  // Filtrer les éléments en fonction du rôle
  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role || '')
  );

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sticky inset-y-0 left-0 z-30 bg-bg-dark-m w-64  shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out h-full flex flex-col`}
        aria-label="Sidebar"
      >

        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-semibold text-white dark:text-">Admin Panel</h1>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
              <li key={item.name} className="relative">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${expandedMenus[item.name] ? ' text-white' : 'text-gray-300  hover:text-white'}`}
                    >
                      <div className="flex items-center">
                        <item.icon className=' tex-xs' />
                        <span className="ml-3">{item.name}</span>
                      </div>
                      {expandedMenus[item.name] ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                    </button>

                    {/* Sous-menu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${expandedMenus[item.name] ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <ul className="pl-8 pt-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg transition-colors ${isActive ? ' text-white' : 'text-gray-300 hover:text-white'}`
                              }
                              onClick={onClose} // Fermer le sidebar sur mobile lors du clic
                            >
                              {subItem.name}
                              {location.pathname === subItem.path && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-secondary"></span>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${isActive ? ' text-white' : 'text-gray-300  hover:text-white'}`
                    }
                    onClick={onClose} // Fermer le sidebar sur mobile lors du clic
                    end
                  >
                    <item.icon />
                    <span className="ml-3">{item.name}</span>
                    {location.pathname === item.path && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-secondary"></span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-700 bg-bg-dark-m">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'Utilisateur'}
              </p>
              <p className="text-xs font-medium text-gray-400 truncate">
                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Role'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;