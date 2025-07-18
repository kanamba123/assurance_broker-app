import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useAddCategorie, useCategories, useDeleteCategorie, useUpdateCategorie } from '../../hooks/api/useCategoriesService';

const CategoriesList = () => {
  const { data: categories = [], isLoading, error, refetch } = useCategories();
  const addCategorieMutation = useAddCategorie();
  const updateCategorieMutation = useUpdateCategorie();
  const deleteCategorieMutation = useDeleteCategorie();

  const [showModal, setShowModal] = useState(false);
  const [editingCategorie, setEditingCategorie] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    slug: '',
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
    const mutation = editingCategorie ? updateCategorieMutation : addCategorieMutation;
    const data = editingCategorie 
      ? { ...formData, id: editingCategorie.id }
      : formData;

    mutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setEditingCategorie(null);
        setFormData({
          nom: '',
          description: '',
          slug: '',
        });
        refetch();
      },
      onError: (err) => {
        console.error('Error:', err);
      }
    });
  };

  const handleEdit = (categorie) => {
    setEditingCategorie(categorie);
    setFormData({
      nom: categorie.nom || '',
      description: categorie.description || '',
      slug: categorie.slug || '',
    });
    setShowModal(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce category ?')) {
      deleteCategorieMutation.mutate(categoryId, {
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
          <h1 className="text-3xl font-bold text-secondary">Gestion des categorie pour service</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus /> Ajouter categorie
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les categorie</p>
          </div>
        ) : (
          <div className="rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{category.nom}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 line-clamp-2">{category.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          {category.slug ? (
                            <>{category.slug}</>
                          ):(<>-</>)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 hover:text-blue-900"
                            titre="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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

      {/* Modal pour ajouter/modifier un Categorie */}
      {showModal && (
        <div className="fixed inset-0 bg-primary-dark/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingCategorie(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            
            <h2 className="text-xl font-bold mb-4">
              {editingCategorie ? 'Modifier le Categorie' : 'Ajouter un Categorie'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Titre *</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
                <label className="block font-medium mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategorie(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                  disabled={addCategorieMutation.isLoading || updateCategorieMutation.isLoading}
                >
                  {(addCategorieMutation.isLoading || updateCategorieMutation.isLoading) ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingCategorie ? 'Mettre à jour' : 'Enregistrer'}</span>
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

export default CategoriesList;