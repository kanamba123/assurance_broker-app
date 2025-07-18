import { FiShoppingCart, FiUser, FiDollarSign, FiMail, FiSettings } from 'react-icons/fi';

const activities = [
  {
    id: 1,
    icon: <FiShoppingCart className="text-blue-500" />,
    title: "Nouvelle commande",
    description: "Commande #1234 de John Doe",
    time: "10 min ago",
    status: "completed"
  },
  {
    id: 2,
    icon: <FiUser className="text-green-500" />,
    title: "Nouvel utilisateur",
    description: "Jane Smith s'est inscrite",
    time: "1 heure ago",
    status: "pending"
  },
  {
    id: 3,
    icon: <FiDollarSign className="text-purple-500" />,
    title: "Paiement reçu",
    description: "Paiement de $250 pour la commande #1234",
    time: "2 heures ago",
    status: "completed"
  },
  {
    id: 4,
    icon: <FiMail className="text-yellow-500" />,
    title: "Nouveau message",
    description: "Message de support de Robert Johnson",
    time: "5 heures ago",
    status: "pending"
  },
  {
    id: 5,
    icon: <FiSettings className="text-red-500" />,
    title: "Mise à jour système",
    description: "Nouvelle version 2.3.1 installée",
    time: "1 jour ago",
    status: "system"
  }
];

const RecentActivity = () => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      case 'system': return 'Système';
      default: return 'Autre';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Activité récente</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">Voir tout</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0 mt-1 mr-3 p-2 rounded-lg bg-gray-50">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                  {getStatusText(activity.status)}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;