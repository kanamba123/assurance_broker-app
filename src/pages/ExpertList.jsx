import React, { useState } from 'react';
import { useExperts } from '../hooks/api/useExpert';
import { FaTimes, FaSearch, FaGlobe, FaFilePdf, FaUserTie, FaFilter, FaChevronDown } from 'react-icons/fa';

const ExpertList = () => {
  const { data: experts = [], isLoading, error } = useExperts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    secteur: '',
    pays: '',
    langue: '',
    disponible: 'all'
  });

  // Extraire les options uniques pour les filtres
  const uniqueSecteurs = [...new Set(experts.map(expert => expert.secteur))];
  const uniquePays = [...new Set(experts.map(expert => expert.pays))];
  const uniqueLangues = [...new Set(experts.flatMap(expert => 
    expert.langues_parlees?.split(',').map(l => l.trim())
  ).filter(Boolean))];

  // Filtrer les experts selon la recherche et les filtres
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = 
      expert?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert?.secteur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert?.pays?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert?.langues_parlees?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.secteur === '' || expert.secteur === filters.secteur) &&
      (filters.pays === '' || expert.pays === filters.pays) &&
      (filters.langue === '' || expert.langues_parlees.includes(filters.langue)) &&
      (filters.disponible === 'all' || 
       (filters.disponible === 'disponible' && expert.disponible === "1") || 
       (filters.disponible === 'indisponible' && expert.disponible !== "1"));

    return matchesSearch && matchesFilters;
  });

  const handleContactClick = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
  };

  const isAvailable = (disponible) => disponible === "1";

  const resetFilters = () => {
    setFilters({
      secteur: '',
      pays: '',
      langue: '',
      disponible: 'all'
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  text-primary-dark mb-4">Nos Experts Qualifiés</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez l'expert parfait grâce à notre système de recherche avancé
          </p>
        </div>

        {/* Search Bar and Filters */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par mot-clé (secteur, pays, compétences...)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 text-secondary"
            >
              <FaFilter /> Filtres avancés <FaChevronDown className={`transition ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                  <select
                    value={filters.secteur}
                    onChange={(e) => setFilters({...filters, secteur: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Tous les secteurs</option>
                    {uniqueSecteurs.map(secteur => (
                      <option key={secteur} value={secteur}>{secteur}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <select
                    value={filters.pays}
                    onChange={(e) => setFilters({...filters, pays: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Tous les pays</option>
                    {uniquePays.map(pays => (
                      <option key={pays} value={pays}>{pays}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                  <select
                    value={filters.langue}
                    onChange={(e) => setFilters({...filters, langue: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Toutes les langues</option>
                    {uniqueLangues.map(langue => (
                      <option key={langue} value={langue}>{langue}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
                  <select
                    value={filters.disponible}
                    onChange={(e) => setFilters({...filters, disponible: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">Tous</option>
                    <option value="disponible">Disponible</option>
                    <option value="indisponible">Indisponible</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-gray-600">
            {filteredExperts.length} expert(s) trouvé(s)
          </div>
          {Object.values(filters).some(Boolean) && (
            <div className="flex flex-wrap gap-2">
              {filters.secteur && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Secteur: {filters.secteur}
                </span>
              )}
              {filters.pays && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Pays: {filters.pays}
                </span>
              )}
              {filters.langue && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Langue: {filters.langue}
                </span>
              )}
              {filters.disponible !== 'all' && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  {filters.disponible === 'disponible' ? 'Disponible' : 'Indisponible'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Experts Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Une erreur est survenue lors du chargement des experts.
          </div>
        ) : filteredExperts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun expert ne correspond à vos critères de recherche.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
                      <FaUserTie className="text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">Expert #{expert.id}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">{expert.secteur}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          isAvailable(expert.disponible) 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {isAvailable(expert.disponible) ? "Disponible" : "Indisponible"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaGlobe className="mr-2 text-blue-500" />
                      <span>{expert.pays}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Langues: </span>
                      {expert.langues_parlees}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {expert.description || "Aucune description fournie"}
                  </p>

                  <div className="flex justify-between items-center">
                    {expert.cv_path && expert.cv_path !== 'pas' && (
                      <a 
                        href={`${config.API_BASE_URL}/${expert.cv_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        <FaFilePdf /> Voir CV
                      </a>
                    )}
                    <button
                      onClick={() => handleContactClick(expert)}
                      disabled={!isAvailable(expert.disponible)}
                      className={`py-2 px-4 rounded-lg transition ${
                        isAvailable(expert.disponible)
                          ? "bg-secondary hover:bg-primary text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable(expert.disponible) ? "Contacter" : "Indisponible"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Modal */}
        {showModal && selectedExpert && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                <FaTimes size={20} />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Contacter l'expert #{selectedExpert.id}</h2>
              <div className="mb-6">
                <p className="text-blue-600 font-medium">{selectedExpert.secteur}</p>
                <p className="text-gray-600 flex items-center gap-1">
                  <FaGlobe /> {selectedExpert.pays}
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Votre nom</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Votre email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Votre message</label>
                  <textarea
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={`Je souhaite contacter cet expert en ${selectedExpert.secteur} pour...`}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-primary text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Envoyer la demande
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertList;