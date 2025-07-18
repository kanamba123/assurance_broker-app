import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash, FaStore, FaSearch } from 'react-icons/fa';
import { useAddClients, useClients } from '../../hooks/api/useClient';
import SelectPersonalize from '../../components/ui/Select';
import { useClientsCategoris } from '../../hooks/api/useCientCategories';
import CustomerSelect from '../../components/ui/CustomerSelect ';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';

const ClientList = () => {
  const { data: clients = [], isLoading, error } = useClients();
  const { data: categories = [], isLoading: isLoadingCat } = useClientsCategoris();

  const addClientMutation = useAddClients();
  const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const isAdmin = currentUser?.role === 'admin';
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category_id: '',
    customer_name: '',
    contact_number: '',
    customer_address: '',
    email: '',
    customer_TIN: '',
    customer_trade_number: '',
    vat_customer_payer: '0',
    tp_type: '1'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? '1' : '0') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addClientMutation.mutate(formData, {
      onSuccess: () => {
        setShowModal(false);
        setEditingClient(null);
        setFormData({
          customer_name: '',
          contact_number: '',
          customer_address: '',
          email: '',
          customer_TIN: '',
          customer_trade_number: '',
          vat_customer_payer: '0',
          tp_type: '1'
        });
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      customer_name: client.customer_name,
      contact_number: client.contact_number,
      customer_address: client.customer_address,
      email: client.email,
      customer_TIN: client.customer_TIN,
      customer_trade_number: client.customer_trade_number,
      vat_customer_payer: client.vat_customer_payer,
      tp_type: client.tp_type
    });
    setShowModal(true);
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case '1':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaStore /> Particulier
        </span>;
      case '2':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaStore /> Entreprise
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaStore /> Inconnu
        </span>;
    }
  };

  const getVatStatusBadge = (status) => {
    return status === '1' ? (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Assujetti</span>
    ) : (
      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Non assujetti</span>
    );
  };

  const arrayChangeCategories = categories.map(category => ({
    value: category.id,
    label: category.nom,
  }));


  // Filtrage
  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.customer_name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.tp_type.toLowerCase().includes(searchLower)
    );
  });


   const handleConfirm = () => {
    console.log("Action confirmée");
    // Ajoutez ici votre logique de confirmation
  };




  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto ">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-secondary">Gestion des clients</h1>
          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-primary dark:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg shadow transition whitespace-nowrap"
                disabled={isLoading}
              >
                <FaPlus /> Ajouter un client
              </button>
            </div>
          )}

        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les clients</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">ID Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Téléphone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Adresse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">TVA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Date création</th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-secondary">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.customer_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {client.customer_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.contact_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.customer_address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(client.tp_type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getVatStatusBadge(client.vat_customer_payer)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.date_created).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(client)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                             onClick={() => setIsDialogOpen(true)}
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

      {/* Modal pour ajouter/modifier un client */}
      {showModal && (
        <div className="fixed max-[80vh] inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowModal(false);
                setEditingClient(null);
              }}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingClient ? 'Modifier client' : 'Ajouter un client'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <CustomerSelect
                  options={arrayChangeCategories}
                  value={formData.category_id}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      category_id: e
                    }));
                  }}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Nom du client*</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Téléphone*</label>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Type*</label>
                  <select
                    name="tp_type"
                    value={formData.tp_type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="1">Particulier</option>
                    <option value="2">Entreprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Adresse*</label>
                <input
                  type="text"
                  name="customer_address"
                  value={formData.customer_address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Numéro TIN</label>
                  <input
                    type="text"
                    name="customer_TIN"
                    value={formData.customer_TIN}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Numéro de commerce</label>
                  <input
                    type="text"
                    name="customer_trade_number"
                    value={formData.customer_trade_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="vat_customer_payer"
                  checked={formData.vat_customer_payer === '1'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Assujetti à la TVA
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingClient(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
                  disabled={addClientMutation.isLoading}
                >
                  {addClientMutation.isLoading ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>{editingClient ? 'Mettre à jour' : 'Enregistrer'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

       <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Supprimer l'élément"
        message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
      />
    </div>
  );
};

export default ClientList;