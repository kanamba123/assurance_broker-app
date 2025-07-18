import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash, FaUserTie, FaGlobe, FaFilePdf, FaSearch, FaUserShield } from 'react-icons/fa';
import { useExperts, useUpdateExpert, useDeleteExpert, useAddExpert } from '../../hooks/api/useExpert';

const ExpertList = () => {
  // États et hooks
  const { data: experts = [], isLoading, error, refetch } = useExperts();
  const addExpertMutation = useAddExpert();
  const updateExpertMutation = useUpdateExpert();
  const deleteExpertMutation = useDeleteExpert();

  const [showModal, setShowModal] = useState(false);
  const [editingExpert, setEditingExpert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));

  // Form data initial state
  const [formData, setFormData] = useState({
    user_id: '',
    secteur: '',
    pays: '',
    langues_parlees: '',
    description: '',
    disponible: '1',
    role: 'expert' // Nouveau champ pour le rôle
  });

  // Vérification des droits
  const isAdmin = currentUser?.role === 'admin';
  const canEdit = (expert) => isAdmin || currentUser?.userId === expert.user_id;

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const expertData = {
        ...formData,
        disponible: formData.disponible
      };

      if (editingExpert) {
        await updateExpertMutation.mutateAsync({
          id: editingExpert.id,
          data: expertData
        });
      } else {
        await addExpertMutation.mutateAsync(expertData);
      }

      setShowModal(false);
      setFormData({
        user_id: '',
        secteur: '',
        pays: '',
        langues_parlees: '',
        description: '',
        disponible: '1',
        role: 'expert'
      });
      refetch();
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const handleEdit = (expert) => {
    if (!canEdit(expert)) {
      alert("Vous n'avez pas les droits pour modifier cet expert");
      return;
    }
    
    setEditingExpert(expert);
    setFormData({
      user_id: expert.user_id,
      secteur: expert.secteur,
      pays: expert.pays,
      langues_parlees: expert.langues_parlees,
      description: expert.description,
      disponible: expert.disponible,
      role: expert.role || 'expert'
    });
    setShowModal(true);
  };

  const handleDelete = async (expertId, expertData) => {
    if (!isAdmin) {
      alert("Seul un administrateur peut supprimer un expert");
      return;
    }

    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet expert ?')) {
      return;
    }

    try {
      await deleteExpertMutation.mutateAsync(expertId);
      refetch();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  // Helpers
  const getDisponibilityBadge = (disponible) => {
    return disponible === '1' ? (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Disponible</span>
    ) : (
      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Indisponible</span>
    );
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaUserShield /> Admin
          </span>
        );
      case 'superviseur':
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaUserTie /> Superviseur
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaUserTie /> Expert
          </span>
        );
    }
  };

  // Filtrage
  const filteredExperts = experts.filter(expert => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expert.secteur.toLowerCase().includes(searchLower) ||
      expert.pays.toLowerCase().includes(searchLower) ||
      expert.langues_parlees.toLowerCase().includes(searchLower) ||
      expert.description.toLowerCase().includes(searchLower) ||
      (expert.role && expert.role.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-6xl mx-auto">
        {/* Header avec titre et bouton d'ajout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-secondary">Gestion des Experts</h1>
          
          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un expert..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-primary dark:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => {
                  setEditingExpert(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg shadow transition whitespace-nowrap"
                disabled={isLoading}
              >
                <FaPlus /> Ajouter un expert
              </button>
            </div>
          )}
        </div>

        {/* Contenu principal */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger la liste des experts</p>
          </div>
        ) : (
          <div className=" rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y ">
                <thead className="bg-primary dark:bg-primary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Secteur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rôle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pays</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Disponibilité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredExperts.map((expert) => (
                    <tr key={expert.id} className="hover:bg-secondary dark:hover:bg-secondary">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {expert.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {expert.user_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {expert.secteur}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(expert.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        <div className="flex items-center gap-1">
                          <FaGlobe className="text-blue-500" />
                          {expert.pays}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getDisponibilityBadge(expert.disponible)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(expert)}
                            className={`p-1 ${canEdit(expert) 
                              ? "text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" 
                              : "text-gray-400 cursor-not-allowed"}`}
                            title={canEdit(expert) ? "Modifier" : "Modification non autorisée"}
                            disabled={!canEdit(expert)}
                          >
                            <FaEdit />
                          </button>
                          
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(expert.id, expert)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                              title="Supprimer"
                            >
                              <FaTrash />
                            </button>
                          )}

                          {expert.cv_path && expert.cv_path !== 'pas' && (
                            <a 
                              href={`${config.API_BASE_URL}/${expert.cv_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                              title="Voir CV"
                            >
                              <FaFilePdf />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal pour ajouter/modifier un expert */}
      {showModal && (
        <div className="fixed inset-0 bg-primary-dark/50 z-50 flex justify-center items-center">
          <div className="bg-white  rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-primary  hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingExpert(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUserTie />
              {editingExpert ? 'Modifier expert' : 'Ajouter un expert'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">ID Utilisateur *</label>
                <input
                  type="text"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                  disabled={!!editingExpert}
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">Secteur d'expertise *</label>
                <input
                  type="text"
                  name="secteur"
                  value={formData.secteur}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                />
              </div>
              
              {isAdmin && (
                <div>
                  <label className="block font-medium mb-1">Rôle *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                    disabled={!isAdmin}
                  >
                    <option value="expert">Expert</option>
                    <option value="superviseur">Superviseur</option>
                    {isAdmin && <option value="admin">Administrateur</option>}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block font-medium mb-1">Pays *</label>
                <input
                  type="text"
                  name="pays"
                  value={formData.pays}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">Langues parlées *</label>
                <input
                  type="text"
                  name="langues_parlees"
                  value={formData.langues_parlees}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                  placeholder="français, anglais, etc."
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">Disponibilité *</label>
                <select
                  name="disponible"
                  value={formData.disponible}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                >
                  <option value="1">Disponible</option>
                  <option value="0">Indisponible</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingExpert(null);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg  transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                  disabled={addExpertMutation.isLoading || updateExpertMutation.isLoading}
                >
                  {(addExpertMutation.isLoading || updateExpertMutation.isLoading) ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingExpert ? 'Mettre à jour' : 'Enregistrer'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertList;