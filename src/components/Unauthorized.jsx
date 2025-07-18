import { Lock, ArrowLeft, LogIn, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="absolute -inset-2 bg-red-100 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-red-500 p-4 rounded-full text-white">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Accès non autorisé
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <ShieldAlert className="w-4 h-4 mr-1" />
            Permission refusée
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
          <p className="text-red-700 font-medium">
            {user?.name 
              ? `Bonjour ${user.name}, vous n'avez pas les droits nécessaires.`
              : "Vous devez être connecté pour accéder à cette page."}
          </p>
          {user?.role && (
            <p className="text-red-600 text-sm mt-1">
              Votre rôle ({user.role}) ne permet pas cet accès.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la page précédente
          </button>
          
          {!user?.name && (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <LogIn className="w-5 h-5" />
              Se connecter
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Besoin d'accès ? Contactez l'administrateur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;