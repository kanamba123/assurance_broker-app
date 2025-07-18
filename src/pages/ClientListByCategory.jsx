import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaIdCard, 
  FaBriefcase,
  FaBuilding,
  FaRegCalendarAlt
} from 'react-icons/fa';
import { useClientsByCategory } from '../hooks/api/useClient';
import { useParams } from 'react-router-dom';

const ClientListByCategory = () => {
  const { clientId, clientName } = useParams();
  const { data: clients = [], isLoading, error } = useClientsByCategory(clientId);

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    visible: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Clients - {clientName?.replace(/-/g, " ")}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de clients dans cette catégorie. Nous travaillons avec des partenaires 
            exigeants pour offrir des solutions sur mesure adaptées à leurs besoins spécifiques.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-xl p-6 max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur de chargement</h3>
            <p className="text-red-600">Une erreur s'est produite lors du chargement des clients. Veuillez réessayer.</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="bg-blue-50 rounded-xl p-8 max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Aucun client disponible</h3>
            <p className="text-blue-600">Cette catégorie ne contient aucun client pour le moment.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {clients.map((client) => (
              <motion.div 
                key={client.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                variants={fadeIn}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBuilding className="text-primary" />
                        {client.customer_name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        ID: {client.customer_id}
                      </span>
                    </div>
                    
                    {parseFloat(client.total_due) > 0 ? (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Dette: {client.total_due} €
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Solde à jour
                      </span>
                    )}
                  </div>

                  {/* Détails du client */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FaEnvelope className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">{client.email || "Non renseigné"}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaPhone className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">{client.contact_number || "Non renseigné"}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">{client.customer_address || "Adresse non renseignée"}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaIdCard className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">
                        {client.customer_TIN ? `TIN: ${client.customer_TIN}` : "TIN non renseigné"}
                      </span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaBriefcase className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">
                        {client.customer_trade_number ? `N° Commerce: ${client.customer_trade_number}` : "N° Commerce non renseigné"}
                      </span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaRegCalendarAlt className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-700">
                        Inscrit le: {formatDate(client.reg_date)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                    <span className="text-sm text-gray-500">
                      {client.vat_customer_payer === "1" ? "Assujetti à TVA" : "Non assujetti à TVA"}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {client.tp_type === "1" ? "Particulier" : "Professionnel"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClientListByCategory;