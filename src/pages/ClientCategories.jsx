
import { FaTrash } from 'react-icons/fa';
import { useClientsCategoris, useDeleteClientsCategories } from '../hooks/api/useCientCategories';
import { motion } from 'framer-motion';
import defaultImage from '../assets/Logo';

const ClientCategories = () => {
  const { data: categories = [], isLoading, error, refetch } = useClientsCategoris();
  const deleteCategoryMut = useDeleteClientsCategories();

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      deleteCategoryMut.mutate(id, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Catégories de clients</h1>
          </div>

        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
            Erreur lors du chargement des catégories. Veuillez réessayer.
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Aucune clients</h3>

            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <motion.div
                key={cat.Id_Categorie_Client}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className=" rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={cat.image_uri || "https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"}
                    alt={cat.nom}
                    className="w-full h-full object-cover"
                   
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary mb-1">{cat.nom}</h3>
                  <p className="text-primary-dark text-sm line-clamp-2">{cat.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {cat.clients_count || 0} clients
                    </span>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                      Voir détails →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default ClientCategories;