import React, { useState } from 'react';
import { 
  FaPlus, FaTimes, FaEdit, FaTrash, FaHome, 
  FaMapMarkerAlt, FaEuroSign, FaImages, FaImage 
} from 'react-icons/fa';
import { 
  useBiens, useAddBien, useUpdateBien, useDeleteBien
} from '../../hooks/api/useBiens';
import { useAddBienImage, useBienImages, useDeleteBienImage } from '../../hooks/api/useBienImages';

const BienList = () => {
  const { data: biens = [], isLoading, error } = useBiens();
  const addBienMutation = useAddBien();
  const updateBienMutation = useUpdateBien();
  const deleteBienMutation = useDeleteBien();
  const addBienImageMutation = useAddBienImage();
  const deleteBienImageMutation = useDeleteBienImage();
  
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentBienId, setCurrentBienId] = useState(null);
  const [editingBien, setEditingBien] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix: '',
    categorie_id: '',
    localisation: '',
    surface: '',
    statut: 'disponible'
  });

  const { data: images = [] } = useBienImages(currentBienId, {
    enabled: !!currentBienId && showImageModal
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && currentBienId) {
      addBienImageMutation.mutate({ 
        bienId: currentBienId, 
        imageFile: file 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mutation = editingBien ? updateBienMutation : addBienMutation;
    const data = editingBien ? { id: editingBien.id, ...formData } : formData;
    
    mutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setEditingBien(null);
        setFormData({
          titre: '',
          description: '',
          prix: '',
          categorie_id: '',
          localisation: '',
          surface: '',
          statut: 'disponible'
        });
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  const handleEdit = (bien) => {
    setEditingBien(bien);
    setFormData({
      titre: bien.titre,
      description: bien.description,
      prix: bien.prix,
      categorie_id: bien.categorie_id,
      localisation: bien.localisation,
      surface: bien.surface,
      statut: bien.statut
    });
    setShowModal(true);
  };

  const handleDelete = (bienId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      deleteBienMutation.mutate(bienId);
    }
  };

  const handleOpenImageModal = (bienId) => {
    setCurrentBienId(bienId);
    setShowImageModal(true);
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm('Supprimer cette image ?')) {
      deleteBienImageMutation.mutate(imageId);
    }
  };

  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'disponible':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Disponible</span>;
      case 'réservé':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Réservé</span>;
      case 'vendu':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Vendu</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Inconnu</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Gestion des biens immobiliers</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus /> Ajouter un bien
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les biens</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Localisation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {biens.map((bien) => (
                    <tr key={bien.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bien.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          <FaHome className="inline mr-2" />
                          {bien.titre}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {bien.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <FaEuroSign className="mr-1" />
                          {new Intl.NumberFormat('fr-FR').format(bien.prix)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <FaMapMarkerAlt className="inline mr-1" />
                        {bien.localisation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(bien.statut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(bien)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleOpenImageModal(bien.id)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Gérer les images"
                          >
                            <FaImages />
                          </button>
                          <button
                            onClick={() => handleDelete(bien.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
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

      {/* Modal pour ajouter/modifier un bien */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingBien(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingBien ? 'Modifier le bien' : 'Ajouter un bien'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Titre*</label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Prix (€)*</label>
                  <input
                    type="number"
                    name="prix"
                    value={formData.prix}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Surface*</label>
                  <input
                    type="text"
                    name="surface"
                    value={formData.surface}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-medium mb-1">Localisation*</label>
                <input
                  type="text"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Catégorie*</label>
                  <select
                    name="categorie_id"
                    value={formData.categorie_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="1">Maison</option>
                    <option value="2">Appartement</option>
                    <option value="3">Terrain</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Statut*</label>
                  <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="disponible">Disponible</option>
                    <option value="réservé">Réservé</option>
                    <option value="vendu">Vendu</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingBien(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
                  disabled={addBienMutation.isLoading || updateBienMutation.isLoading}
                >
                  {(addBienMutation.isLoading || updateBienMutation.isLoading) ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingBien ? 'Mettre à jour' : 'Enregistrer'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour gérer les images */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowImageModal(false);
                setCurrentBienId(null);
                setSelectedImage(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">Gestion des images du bien</h2>
            
            <div className="mb-6">
              <label className="block font-medium mb-2">Ajouter une image</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer flex items-center gap-2"
                >
                  <FaPlus /> Sélectionner une image
                </label>
                {addBienImageMutation.isLoading && (
                  <span className="text-gray-500">Téléchargement en cours...</span>
                )}
              </div>
            </div>
            
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_path}
                      alt={`Bien ${currentBienId}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Supprimer"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaImage className="mx-auto text-4xl mb-2" />
                <p>Aucune image pour ce bien</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal pour afficher une image en grand */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes size={24} />
          </button>
          <div className="max-w-4xl max-h-screen p-4">
            <img
              src={selectedImage.image_path}
              alt="Détail du bien"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BienList;