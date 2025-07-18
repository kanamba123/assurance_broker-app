import React, { useState } from 'react';
import {
  FaTimes,
  FaSearch,
  FaFilePdf,
  FaCheck,
  FaTimesCircle,
  FaClock,
  FaUserTie,
  FaPaperclip,
  FaDownload,
  FaRegFileAlt
} from 'react-icons/fa';
import { useAddResponse, useRequestExpert } from '../../hooks/api/useRequest';

const ExpertResponsePage = () => {
  // États et hooks
  const { data: demandes = [], isLoading, error, refetch } = useRequestExpert();
  const submitResponseMutation = useAddResponse();
  const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));

  // États pour les modals et la recherche
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showLivrableModal, setShowLivrableModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [selectedLivrable, setSelectedLivrable] = useState(null);

  // Form data initial state
  const [formData, setFormData] = useState({
    demande_id: '',
    description: '',
    fichier: null
  });

  // Filtrage des demandes
  const filteredDemandes = demandes.filter(demande => {
    const searchLower = searchTerm.toLowerCase();
    return (
      demande.titre.toLowerCase().includes(searchLower) ||
      demande.description.toLowerCase().includes(searchLower) ||
      (demande.customer?.name && demande.customer.name.toLowerCase().includes(searchLower))
    );
  });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, fichier: e.target.files[0] }));
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    submitResponseMutation.mutateAsync({
      demande_id: formData.demande_id,
      description: formData.description,
      fichier: formData.fichier
    }, {
      onSuccess: () => {
        setShowResponseModal(false);
        setFormData({
          demande_id: '',
          description: '',
          fichier: null
        });
        refetch();
      },
      onError: (err) => {
        console.error("Erreur:", err);
      }
    });
  };

  const handleViewResponse = (demande) => {
    if (demande.has_livrable) {
      setSelectedLivrable({
        titre: demande.titre,
        description: demande.livrable?.description || 'Pas de description disponible',
        date: demande.livrable?.date_creation,
        fichier: demande.livrable?.chemin,
        customer: demande.customer
      });
      setShowLivrableModal(true);
    }
  };

  const handleOpenResponseForm = (demande) => {
    setSelectedDemande(demande);
    setFormData({
      ...formData,
      demande_id: demande.id
    });
    setShowResponseModal(true);
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

  return (
    <div className="p-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Demandes à répondre</h1>

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Statut</th>
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
                        {demande.customer?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(demande.statut)}
                          {demande.has_livrable ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <FaCheck /> Répondu
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(demande.date_demande).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
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

                          {!demande.has_livrable ? (
                            <button
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Répondre à la demande"
                              onClick={() => handleOpenResponseForm(demande)}
                            >
                              <FaCheck /> Répondre
                            </button>
                          ) : (
                            <button
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Voir la réponse"
                              onClick={() => handleViewResponse(demande)}
                            >
                              <FaCheck /> Voir réponse
                            </button>
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

      {/* Modal pour répondre à une demande */}
      {showResponseModal && selectedDemande && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowResponseModal(false);
                setSelectedDemande(null);
              }}
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-bold mb-4">Répondre à la demande</h2>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg">{selectedDemande.titre}</h3>
              <p className="text-gray-600 mt-2">{selectedDemande.description}</p>
            </div>

            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Votre réponse *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  required
                  placeholder="Décrivez votre réponse en détail..."
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Fichier joint (optionnel)</label>
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
                  onClick={() => setShowResponseModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                  disabled={submitResponseMutation.isLoading}
                >
                  {submitResponseMutation.isLoading ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <>
                      <FaCheck /> Envoyer la réponse
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour afficher la réponse */}
      {showLivrableModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <FaCheck className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-white">Votre réponse</h2>
              </div>
              <button
                onClick={() => setShowLivrableModal(false)}
                className="text-white hover:text-red-600 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100/50 p-3 rounded-lg flex-shrink-0">
                    <FaUserTie className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Pour: {selectedLivrable?.customer?.name || 'Client'}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <FaClock className="mr-1" />
                        {new Date(selectedLivrable?.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200/70" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/70 rounded-xl p-5 border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Contenu de votre réponse
                </h4>
                <div className="prose prose-sm max-w-none text-gray-700">
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

              {selectedLivrable?.fichier && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <FaPaperclip className="text-gray-500 mr-2" />
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

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowLivrableModal(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertResponsePage;