import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import {
  useService,
  useAddService,
  useUpdateService,
  useDeleteService
} from '../../hooks/api/useService';
import { useCategories } from '../../hooks/api/useCategoriesService';

const ServiceList = () => {
  const { data: services = [], isLoading, error, refetch } = useService();
  const { data: categories = [] } = useCategories();
  const addServiceMutation = useAddService();
  const updateServiceMutation = useUpdateService();
  const deleteServiceMutation = useDeleteService();

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '',
    titre: '',
    description: '',
    contenu: '',
    actif: 1,
    image: '',
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
    const mutation = editingService ? updateServiceMutation : addServiceMutation;
    const data = editingService
      ? { ...formData, id: editingService.id }
      : formData;

    mutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setEditingService(null);
        setFormData({
          category_id: '',
          titre: '',
          description: '',
          contenu: '',
          actif: 'active',
          image: '',
        });
        refetch();
      },
      onError: (err) => {
        console.error('Error:', err);
      }
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      category_id: service.category_id || '',
      titre: service.titre || '',
      description: service.description || '',
      contenu: service.contenu || '',
      actif: service.actif || 'active',
      image: service.image || '',
    });
    setShowModal(true);
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      deleteServiceMutation.mutate(serviceId, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-1">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Gestion des services</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus /> Ajouter un service
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les services</p>
          </div>
        ) : (
          <div className="rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actif</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-secondary">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.titre}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 line-clamp-2">{service.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${service.actif === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {service.actif === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-blue-600 hover:text-blue-900"
                            titre="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="text-red-600 hover:text-red-900"
                            titre="Supprimer"
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

      {/* Modal pour ajouter/modifier un service */}
      {showModal && (
        <div className="fixed inset-0 bg-primary-dark/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingService(null);
              }}
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingService ? 'Modifier le service' : 'Ajouter un service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block font-medium mb-1">Catégorie *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nom} 
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Contenu</label>
                <textarea
                  name="contenu"
                  value={formData.contenu}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL de l'image"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                  disabled={addServiceMutation.isLoading || updateServiceMutation.isLoading}
                >
                  {(addServiceMutation.isLoading || updateServiceMutation.isLoading) ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingService ? 'Mettre à jour' : 'Enregistrer'}</span>
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

export default ServiceList;