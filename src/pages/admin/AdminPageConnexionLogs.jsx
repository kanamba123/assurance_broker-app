import React from 'react';
import { FaTrash, FaBroom } from 'react-icons/fa';

import {
  useDeleteConnexion,
  useCleanOldConnexions, useConnexions
} from '../../hooks/api/useConnexionLogs';

const AdminPageConnexionLogs = () => {
 const { data, isLoading, error, refetch } = useConnexions();
const connexions = data?.connexions || [];
  const deleteConnexion = useDeleteConnexion();
  const cleanOld = useCleanOldConnexions();

  const handleDelete = (id) => {
    if (window.confirm("Confirmer la suppression de cette connexion ?")) {
      deleteConnexion.mutate(id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  const handleCleanOld = () => {
    if (window.confirm("Voulez-vous nettoyer les connexions anciennes ?")) {
      cleanOld.mutate(null, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Historique des connexions</h1>
          <button
            onClick={handleCleanOld}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
          >
            <FaBroom /> Nettoyer anciennes
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Erreur</p>
            <p>Impossible de charger les connexions</p>
          </div>
        ) : (
          <div className="rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Utilisateur</th>
                    <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Adresse IP</th>
                    <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
  {connexions.map((c) => (
    <tr key={c.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex flex-col">
          <span className="font-medium">{c.name || '-'}</span>
          <span className="text-xs text-gray-500">{c.email}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.ip}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(c.date_connexion).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => handleDelete(c.id)}
          className="text-red-600 hover:text-red-900"
          title="Supprimer"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
  {connexions.length === 0 && (
    <tr>
      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
        Aucune connexion enregistrée.
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPageConnexionLogs;
