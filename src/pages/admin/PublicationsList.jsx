import React, { useState } from 'react';
import {
  FaPlus, FaTimes, FaEdit, FaTrash, FaFileAlt,
  FaUser, FaCalendarAlt, FaImage, FaImages,
  FaEuroSign,
  FaEye
} from 'react-icons/fa';
import {
  usePublications,
  useCreatePublication,
  useUpdatePublication,
  useDeletePublication,
  useUploadPublicationImage
} from '../../hooks/api/usePublications';

const PublicationsList = () => {
  const { data: publications = [], isLoading, error } = usePublications();
  const createPublicationMutation = useCreatePublication();
  const updatePublicationMutation = useUpdatePublication();
  const deletePublicationMutation = useDeletePublication();
  const uploadImageMutation = useUploadPublicationImage();

  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    resume: '',
    contenu: '',
    prix: 0,
    auteur: '',
    image_path: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { image_path ,image_url} = await uploadImageMutation.mutateAsync(file);
        setFormData(prev => ({ ...prev,image_path: image_url }));
      } catch (err) {
        console.error("Erreur lors de l'upload de l'image", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mutation = editingPublication ? updatePublicationMutation : createPublicationMutation;
    const data = editingPublication ? {
      id: editingPublication.id,
      ...formData
    } : formData;

    mutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setEditingPublication(null);
        setFormData({
          titre: '',
          auteur: '',
          resume: '',
          contenu: '',
          prix: 0,
          image_path: ''
        });
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  const handleEdit = (publication) => {
    setEditingPublication(publication);
    setFormData({
      titre: publication.titre,
      auteur: publication.auteur,
      resume: publication.resume,
      contenu: publication.contenu,
      prix: publication.prix,
      image_path: publication.image_path || ''
    });
    setShowModal(true);
  };

  const handleDelete = (publicationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      deletePublicationMutation.mutate(publicationId);
    }
  };

  const handleOpenImageModal = (publication) => {
    setEditingPublication(publication);
    setShowImageModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Gestion des publications</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus /> Ajouter une publication
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les publications</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">Resume</th>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">Auteur</th>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3  text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publications.map((publication) => (
                    <tr key={publication.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {publication.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm left-0 font-medium text-gray-900">
                          {publication.titre}
                        </div>
                      </td>
                      <td className="px-6 py-4">

                        <div className="text-sm text-gray-500 line-clamp-2">
                          {publication.resume}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <FaUser className="inline mr-1" />
                        {publication.auteur?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <FaEuroSign className="mr-1" />
                          {new Intl.NumberFormat('fr-FR').format(publication.prix)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <FaCalendarAlt className="inline mr-1" />
                        {new Date(publication.date_publication).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(publication)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleEdit(publication)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Modifier"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleOpenImageModal(publication)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Voir l'image"
                          >
                            <FaImages />
                          </button>
                          <button
                            onClick={() => handleDelete(publication.id)}
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

      {/* Modal pour ajouter/modifier une publication */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-auto max-h-[90vh] custom-scrollbar">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingPublication(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingPublication ? 'Modifier la publication' : 'Ajouter une publication'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block font-medium mb-1">Prix</label>
                  <input
                    type="number"
                    name="prix"
                    value={formData.prix}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Résumé*</label>
                <textarea
                  name="resume"
                  value={formData.resume}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Contenu*</label>
                <textarea
                  name="contenu"
                  value={formData.contenu}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Auteur*</label>
                <input
                  type="text"
                  name="auteur"
                  value={formData.auteur}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image</label>
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
                    <FaPlus /> {formData.image_path ? 'Changer l\'image' : 'Ajouter une image'}
                  </label>
                  {formData.image_path && (
                    <span className="text-sm text-gray-600">
                      Image sélectionnée
                    </span>
                  )}
                  {uploadImageMutation.isLoading && (
                    <span className="text-gray-500">Téléchargement en cours...</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPublication(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
                  disabled={createPublicationMutation.isLoading || updatePublicationMutation.isLoading}
                >
                  {(createPublicationMutation.isLoading || updatePublicationMutation.isLoading) ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingPublication ? 'Mettre à jour' : 'Enregistrer'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour afficher l'image */}
      {showImageModal && editingPublication?.image_path && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setShowImageModal(false)}
          >
            <FaTimes size={24} />
          </button>
          <div className="max-w-4xl max-h-screen p-4">
            <img
              src={editingPublication.image_path}
              alt={editingPublication.titre}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationsList;