import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useAddClients, useClients } from '../../hooks/api/useClient';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import ActionBar from '../../components/ui/ActionBar';
import Pagination from '../../components/ui/Pagination';

const ClientList = () => {
  const { data: clients = [], isLoading, error } = useClients();

  const addClientMutation = useAddClients();
  const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const isAdmin = currentUser?.role === 'admin';
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);

   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

  const nextStep = () => setFormStep(2);
  const prevStep = () => setFormStep(1);

  const [formData, setFormData] = useState({
    civility: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: null,
    postal_code: "",
    city: "",
    country: "",
    marital_status: "",
    profession: "",
    marketing_consent: "",
    notes: null,
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
          civility: "",
          first_name: "",
          last_name: "",
          birth_date: "",
          email: "",
          phone: "",
          address_line1: "",
          address_line2: null,
          postal_code: "",
          city: "",
          country: "",
          marital_status: "",
          profession: "",
          marketing_consent: "",
          notes: null,
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
      civility: client.civility,
      first_name: client.first_name,
      last_name: client.last_name,
      birth_date: client.birth_date,
      email: client.email,
      phone: client.phone,
      address_line1: client.address_line1,
      address_line2: client.address_line2,
      postal_code: client.postal_code,
      city: client.city,
      country: client.country,
      marital_status: client.marital_status,
      profession: client.profession,
      marketing_consent: client.marketing_consent,
      notes: client.notes,
    });
    setShowModal(true);
  };



  // Filtrage
  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.first_name.toLowerCase().includes(searchLower) ||
      client.last_name.toLowerCase().includes(searchLower) ||
      client.profession.toLowerCase().includes(searchLower)
    );
  });

   const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredClients.slice(startIndex, endIndex);


  const handleConfirm = () => {
    console.log("Action confirmée");
    // Ajoutez ici votre logique de confirmation
  };


  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-9xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-secondary">Gestion des clients</h1>
        </div>
        <div className='p-4 bg-white border-t-4 border-blue-600 rounded-t-md'>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 mb-3 rounded shadow transition"
            disabled={isLoading}
          >
            <FaPlus /> Ajouter un client
          </button>


          <ActionBar
            data={filteredClients}
            searchQuery={searchTerm}
            onSearchChange={setSearchTerm}
            title="Clients"
          />

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
                  <thead className="bg-primary">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">ID Client</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Téléphone</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Adresse</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Proffesion</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Date création</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((client) => (
                      <tr key={client.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {client.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          <div className="text-sm font-medium text-gray-900">
                            {client.first_name} {client.last_name}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {client.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {client.phone}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {client.address_line1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {client.profession}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {new Date(client.date_created).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
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
           <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingClient ? 'Modifier le client' : 'Ajouter un client'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Étape 1 */}
              {formStep === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-1">Civilité</label>
                      <select
                        name="civility"
                        value={formData.civility}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Sélectionner --</option>
                        <option value="M">Monsieur</option>
                        <option value="Mme">Madame</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Date de naissance</label>
                      <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Prénom*</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Nom*</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Suivant
                    </button>
                  </div>
                </>
              )}

              {/* Étape 2 */}
              {formStep === 2 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <div>
                      <label className="block font-medium mb-1">Téléphone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-medium mb-1">Adresse ligne 1</label>
                      <input
                        type="text"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-medium mb-1">Adresse ligne 2</label>
                      <input
                        type="text"
                        name="address_line2"
                        value={formData.address_line2 || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Code postal</label>
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Ville</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Pays</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Situation familiale</label>
                      <input
                        type="text"
                        name="marital_status"
                        value={formData.marital_status}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Profession</label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2 flex items-center">
                      <input
                        type="checkbox"
                        name="marketing_consent"
                        checked={formData.marketing_consent === '1'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            marketing_consent: e.target.checked ? '1' : '0',
                          })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Consentement marketing
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-medium mb-1">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                      disabled={addClientMutation?.isLoading}
                    >
                      {editingClient ? 'Mettre à jour' : 'Enregistrer'}
                    </button>
                  </div>
                </>
              )}
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