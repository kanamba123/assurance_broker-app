import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg p-8 space-y-6">

        <div className="mx-auto w-48 h-48 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Oops ! Page introuvable</h1>
        
        <p className="text-gray-600">
          La page que vous cherchez semble ne pas exister ou est en cours de construction.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Retour à l'accueil
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Vous serez redirigé automatiquement dans 5 secondes...
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;