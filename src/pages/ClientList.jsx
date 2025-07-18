import React, { useState } from 'react';
import { useAddClients, useClients } from '../hooks/api/useClient';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ClientList = () => {
  const { data: clients = [], isLoading, error } = useClients();
  const useAddClientMut = useAddClients();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    useAddClientMut.mutate(formData, {
      onSuccess: () => {
        setShowModal(false);
        setFormData({ name: '', email: '', description: '' });
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("clients.title")}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            <FaPlus /> {t("clients.add")}
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500">{t("clients.loading")}</p>
        ) : error ? (
          <p className="text-red-500">{t("clients.error")}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <p className="font-semibold text-lg">{client.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {client.email}
                </p>
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4">{t("clients.modalTitle")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  {t("clients.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  {t("clients.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  {t("clients.description")}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  {t("clients.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  {t("clients.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
