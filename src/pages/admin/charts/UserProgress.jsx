import { FiUser, FiTrendingUp, FiAward } from 'react-icons/fi';

const users = [
  {
    id: 1,
    name: "Jean Dupont",
    role: "Commercial",
    progress: 75,
    target: 80,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Marie Martin",
    role: "Marketing",
    progress: 90,
    target: 70,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Pierre Lambert",
    role: "Développeur",
    progress: 60,
    target: 85,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 4,
    name: "Sophie Bernard",
    role: "Designer",
    progress: 45,
    target: 60,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const UserProgress = () => {
  const getProgressColor = (progress, target) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (progress, target) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Progression des utilisateurs</h3>
        <div className="flex space-x-2">
          <span className="flex items-center text-sm text-gray-500">
            <FiTrendingUp className="mr-1" /> +12% ce mois-ci
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <img 
                className="h-10 w-10 rounded-full object-cover" 
                src={user.avatar} 
                alt={user.name} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <span className={`text-xs font-semibold ${getProgressTextColor(user.progress, user.target)}`}>
                  {user.progress}%
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {user.role}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  className={`h-1.5 rounded-full ${getProgressColor(user.progress, user.target)}`} 
                  style={{ width: `${Math.min(100, (user.progress / user.target) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          <FiAward className="mr-1" />
          <span>Voir tous les utilisateurs</span>
        </div>
      </div>
    </div>
  );
};

export default UserProgress;