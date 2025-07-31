import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useInsuranceTypes, useUpdateInsuranceType, useDeleteInsuranceType, useAddInsuranceType } from '../../hooks/api/useInsuranceType';
import ActionBar from '../../components/ui/ActionBar';
import { useInsuranceCompanies } from '../../hooks/api/useInsuranceCompany';
import { useCategories } from '../../hooks/api/useCategoriesService';
import Pagination from '../../components/ui/Pagination';

const InsuranceTypeList = () => {
  const { data: insurancestypes = [], isLoading, error, refetch } = useInsuranceTypes();
  const { data: insurance_campanies = [] } = useInsuranceCompanies()
  const { data: categories = [] } = useCategories();
  const addCompanyMutation = useAddInsuranceType();
  const updateCompanyMutation = useUpdateInsuranceType();
  const deleteUserMutation = useDeleteInsuranceType();
  const [searchText, setSearchText] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingCompay, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    company_id: '',
    garanties: ''
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const filteredInsuranceTyoes = insurancestypes.filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalItems = filteredInsuranceTyoes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredInsuranceTyoes.slice(startIndex, endIndex);


  const handleSubmit = (e) => {
    e.preventDefault();
    const mutation = editingCompay ? updateCompanyMutation : addCompanyMutation;
    const data = editingCompay
      ? { ...formData, Id_Utilisateur: editingCompay.Id_Utilisateur }
      : formData;

    mutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setEditingUser(null);
        setFormData({ name: '', description: '', category_id: '', company_id: '', garanties: '' });
        refetch();
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  const handleEdit = (company) => {
    setEditingUser(company);
    setFormData({
      name: company.name,
      description: company.description,
      category_id: company.category_id,
      company_id: company.company_id,
      garanties: company.garanties
    });
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      deleteUserMutation.mutate(userId, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-9xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Compagnies d'assurance</h1>
        </div>
        <div className='p-4 bg-white border-t-4 border-blue-600 rounded-t-md'>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 mb-3 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus />  Ajouter une compagnie
          </button>

          <ActionBar
            data={filteredInsuranceTyoes}
            searchQuery={searchText}
            onSearchChange={setSearchText}
            title="Compagnies"
          />


          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p className="font-bold">Erreur</p>
              <p>Impossible de charger les utilisateurs</p>
            </div>
          ) : (
            <div className=" rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white  divide-y divide-gray-200 "
                    onMouseLeave={() => {
                      document
                        .querySelectorAll(".col-hover")
                        .forEach((cell) => cell.classList.remove("highlight-col"));
                    }}>
                    {currentItems.map((company) => (

                      <tr key={company.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm ">
                          {company?.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium ">
                                {company.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {company.description}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(company)}
                              className="text-white bg-action-edit px-2 py-1 rounded-sm"
                              title="Modifier"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(company.id)}
                              className="bg-action-delete text-white px-2 py-1 rounded-sm"
                              title="Supprimer"
                              disabled={company.rôle === 'admin'}
                            >
                              Suprimer
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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </div>

      </div>

      {/* Modal pour ajouter/modifier un utilisateur */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingUser(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingCompay ? 'Modifier utilisateur' : 'Ajouter un utilisateur'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500  dark:border-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  type="description"
                  name="description"

                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500  dark:border-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Campanies *</label>
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
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Campanies *</label>
                <select
                  name="company_id"
                  value={formData.company_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {insurance_campanies.map((compagnie) => (
                    <option key={compagnie.id} value={compagnie.id}>
                      {compagnie.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Garanties</label>
                <input
                  type="garanties"
                  name="garanties"
                  value={formData.garanties}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500  dark:border-gray-700"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
                  disabled={addCompanyMutation.isLoading || updateCompanyMutation.isLoading}
                >
                  {addCompanyMutation.isLoading || updateCompanyMutation.isLoading ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingCompay ? 'Mettre à jour' : 'Enregistrer'}</span>
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

export default InsuranceTypeList;