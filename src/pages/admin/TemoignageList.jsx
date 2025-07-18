import React, { useState } from 'react';
import {
  FaPlus, FaTimes, FaEdit, FaTrash, FaStar,
  FaUser, FaCalendarAlt, FaComment
} from 'react-icons/fa';
import {
  useTestimony,
  useAddTestimony,
  useUpdateTestimony,
  useDeleteTestimony,
  useUploadTestimonyImage
} from '../../hooks/api/useTestimony';

const TemoignageList = () => {
  const { data: temoignages = [], isLoading, error } = useTestimony();
  const addTemoignageMutation = useAddTestimony();
  const updateTemoignageMutation = useUpdateTestimony();
  const deleteTemoignageMutation = useDeleteTestimony();
   const uploadImageMutation = useUploadTestimonyImage();

  const [showModal, setShowModal] = useState(false);
  const [editingTemoignage, setEditingTemoignage] = useState(null);
  const [formData, setFormData] = useState({
    message: '',
    note: '5',
    image: '',
    auteur: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mutation = editingTemoignage ? updateTemoignageMutation : addTemoignageMutation;
    const data = editingTemoignage ? {
      id: editingTemoignage.id,
      ...formData
    } : formData;

    mutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setEditingTemoignage(null);
        setFormData({
          message: '',
          note: '5',
        });
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  const handleEdit = (temoignage) => {

    setEditingTemoignage(temoignage);
    setFormData({
      message: temoignage.message,
      note: temoignage.note,
      auteur: temoignage.auteur,
      image: temoignage.image,

    });
    setShowModal(true);
  };

  const handleDelete = (temoignageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      deleteTemoignageMutation.mutate(temoignageId);
    }
  };

  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= note ? 'text-yellow-400' : 'text-gray-300'}
          size={14}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };


    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { image_url} = await uploadImageMutation.mutateAsync(file);
        setFormData(prev => ({ ...prev,image: image_url }));
      } catch (err) {
        console.error("Erreur lors de l'upload de l'image", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Gestion des témoignages</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus /> Ajouter un témoignage
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les témoignages</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className=" py-3 t text-xs font-medium uppercase tracking-wider">ID</th>
                    <th className=" py-3 t text-xs font-medium uppercase tracking-wider">Utilisateur</th>
                    <th className=" py-3 t text-xs font-medium uppercase tracking-wider">Message</th>
                    <th className=" py-3 t text-xs font-medium uppercase tracking-wider">Note</th>
                    <th className=" py-3 t text-xs font-medium uppercase tracking-wider">Date</th>
                    <th className=" py-3 t text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {temoignages.map((temoignage) => (
                    <tr key={temoignage.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {temoignage.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-blue-800" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {temoignage.user?.name || 'Anonyme'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {temoignage.user?.email || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-2">
                          <FaComment className="inline mr-2 text-blue-500" />
                          {temoignage.message}
                        </div>
                      </td>
                      <td className="px-6 align-middle whitespace-nowrap">
                        {renderStars(parseInt(temoignage.note))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <FaCalendarAlt className="inline mr-1" />
                        {new Date(temoignage.date_posted).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(temoignage)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(temoignage.id)}
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

      {/* Modal pour ajouter/modifier un témoignage */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingTemoignage(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingTemoignage ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Message*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

               <div>
                <label className="block font-medium mb-1">Auteur*</label>
                <input
                  name="auteur"
                  type='name'
                  value={formData.auteur}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Note*</label>
                <select
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} étoile{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer flex items-center gap-2"
                  >
                    <FaPlus /> {formData.image ? 'Changer l\'image' : 'Ajouter une image'}
                  </label>
                  {formData.image && (
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
                    setEditingTemoignage(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
                  disabled={addTemoignageMutation.isLoading || updateTemoignageMutation.isLoading}
                >
                  {(addTemoignageMutation.isLoading || updateTemoignageMutation.isLoading) ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingTemoignage ? 'Mettre à jour' : 'Enregistrer'}</span>
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

export default TemoignageList;