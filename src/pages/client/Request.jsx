import React, { useState } from 'react';
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilePdf,
  FaCheck,
  FaTimesCircle,
  FaClock,
  FaUserTie,
  FaGlobe
} from 'react-icons/fa';
import { useRequest, useAddRequest } from '../../hooks/api/useRequest';
import { useExperts } from '../../hooks/api/useExpert';

const RequestPage = () => {
  // États et hooks
  const { data: demandes = [], isLoading, error, refetch } = useRequest();
  const { data: experts = [] } = useExperts();
  const addRequestMutation = useAddRequest();
  const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));

  // États pour les modals et la recherche
  const [showModal, setShowModal] = useState(false);
  const [showLivrableModal, setShowLivrableModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedLivrable, setSelectedLivrable] = useState(null);

  // Form data initial state
  const [formData, setFormData] = useState({
    expert_id: '',
    titre: '',
    description: '',
    document_joint: null,
    statut: 'envoyée'
  });

  // Filtrage des demandes
  const filteredDemandes = demandes.filter(demande => {
    const searchLower = searchTerm.toLowerCase();
    return (
      demande.titre.toLowerCase().includes(searchLower) ||
      demande.description.toLowerCase().includes(searchLower) ||
      (demande.customer?.name && demande.customer.name.toLowerCase().includes(searchLower)) ||
      (demande.expert?.secteur && demande.expert.secteur.toLowerCase().includes(searchLower))
    );
  });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, document_joint: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addRequestMutation.mutateAsync({
      expert_id: formData.expert_id,
      titre: formData.titre,
      description: formData.description,
      expert_id: formData.expert_id,
      statut: formData.statut,
      document_joint: formData.document_joint
    }, {
      onSuccess: () => {
        setShowModal(false);
        setFormData({
          expert_id: '',
          titre: '',
          description: '',
          document_joint: null,
          statut: 'envoyée'
        });
        refetch();
      },
      onError: (err) => {
        console.error("Erreur:", err);
      }
    });
  };

  const handleViewLivrable = (demande) => {
    if (demande.has_livrable) {
      setSelectedLivrable({
        titre: demande.titre,
        description: demande?.livrable?.description || 'Pas de description disponible',
        date: demande?.livrable?.date_creation,
        fichier: demande.livrable_path,
        expert: demande.expert
      });
      setShowLivrableModal(true);
    }
  };

  // Helpers pour affichage
  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'envoyée':
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaClock /> Envoyée
          </span>
        );
      case 'en traitement':
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaClock /> En traitement
          </span>
        );
      case 'terminée':
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaCheck /> Terminée
          </span>
        );
      case 'refusée':
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaTimesCircle /> Refusée
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {statut}
          </span>
        );
    }
  };

  const getValidationBadge = (validation) => {
    switch (validation) {
      case 'validée':
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            Validée
          </span>
        );
      case 'refusée':
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
            Refusée
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            En attente
          </span>
        );
    }
  };

  return (
    <div className=" p-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Demandes</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une demande..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg shadow transition whitespace-nowrap"
              disabled={isLoading}
            >
              <FaPlus /> Nouvelle demande
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger la liste des demandes</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className='bg-primary text-secondary'>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Expert</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Validation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDemandes.map((demande) => (
                    <tr key={demande.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {demande.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {demande.titre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {demande.expert ? (
                          <div className="flex items-center gap-1">
                            <FaUserTie className="text-blue-500" />
                            {demande.expert.secteur}
                            <FaGlobe className="ml-2 text-green-500" />
                            {demande.expert.pays}
                          </div>
                        ) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(demande.statut)}
                          {demande.has_livrable ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <FaCheck /> Réponse
                            </span>
                          ) : (
                            <span className='items-center'>-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getValidationBadge(demande.validation_admin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(demande.date_demande).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Voir détails"
                            onClick={() => handleViewLivrable(demande)}
                          >
                            <FaEdit />
                          </button>

                          {demande.document_joint && (
                            <a
                              href={`/uploads/${demande.document_joint}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Voir document joint"
                            >
                              <FaFilePdf />
                            </a>
                          )}

                          {demande.has_livrable ? (
                            <button
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Voir la réponse"
                              onClick={() => handleViewLivrable(demande)}
                            >
                              <FaCheck />
                            </button>
                          ) : (
                            <span className="text-gray-400 p-1">-</span>
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

      {/* Modal pour créer une nouvelle demande */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setSelectedExpert(null);
              }}
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-bold mb-4">Nouvelle Demande</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Titre *</label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Expert *</label>
                  <select
                    name="expert_id"
                    value={formData.expert_id}
                    onChange={(e) => {
                      handleInputChange(e);
                      const expert = experts.find(ex => ex.id === parseInt(e.target.value));
                      setSelectedExpert(expert);
                    }}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner un expert</option>
                    {experts.map(expert => (
                      <option key={expert.id} value={expert.id}>
                        {expert.secteur} ({expert.pays})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedExpert && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaUserTie className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedExpert.secteur}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaGlobe /> {selectedExpert.pays} | {selectedExpert.langues_parlees}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Document joint (PDF, Word, Excel)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                  disabled={addRequestMutation.isLoading}
                >
                  {addRequestMutation.isLoading ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <>
                      <FaPlus /> Envoyer la demande
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour afficher le livrable */}
      {showLivrableModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-all duration-300">
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100"
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            {/* Header avec dégradé de couleur */}
            <div className="bg-gradient-to-r from-primary to-secondary  p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <FaCheck className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-white">Réponse Expert</h2>
              </div>
              <button
                onClick={() => setShowLivrableModal(false)}
                className="text-white hover:text-red-600 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Contenu principal */}
            <div className="p-6 space-y-6">
              {/* Section Informations */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100/50 p-3 rounded-lg flex-shrink-0">
                    <FaUserTie className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{selectedLivrable?.titre}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <FaClock className="mr-1" />
                        {new Date(selectedLivrable?.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      {selectedLivrable?.expert && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <FaUserTie className="mr-1" />
                          {selectedLivrable.expert.secteur}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Séparateur stylisé */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200/70" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-sm text-gray-500">Détails</span>
                  </div>
                </div>
              </div>

              {/* Section Contenu */}
              <div className="bg-gray-50/70 rounded-xl p-5 border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Contenu de la réponse
                </h4>
                <div className="prose prose-sm max-w-none border border-secondary text-primary">
                  {selectedLivrable?.description ? (
                    <p className="whitespace-pre-line">{selectedLivrable.description}</p>
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <FaRegFileAlt className="mx-auto text-2xl mb-2" />
                      <p>Aucune description fournie</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section Fichier joint */}
              {selectedLivrable?.fichier && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h4 className="font-medium text-primary flex items-center">
                      <FaPaperclip className="text-primary mr-2" />
                      Fichier joint
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedLivrable.fichier.split('.').pop().toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100/50 p-3 rounded-lg">
                          <FaFilePdf className="text-red-500 text-xl" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 truncate max-w-xs">
                            {selectedLivrable.fichier.split('/').pop()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {/* Vous pourriez ajouter la taille du fichier ici si disponible */}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`/uploads/${selectedLivrable.fichier}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <FaDownload className="mr-1" />
                        Télécharger
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowLivrableModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Fermer
                </button>
                {selectedLivrable?.fichier && (
                  <a
                    href={`/uploads/${selectedLivrable.fichier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Ouvrir le fichier
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestPage;