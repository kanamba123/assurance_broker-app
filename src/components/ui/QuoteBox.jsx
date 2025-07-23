import React, { useState } from 'react';
import { List, DollarSign, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuoteBox = () => {
  const [selectedProduct, setSelectedProduct] = useState('RC Chef de Famille');
  const navigate = useNavigate();

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleDevisClick = () => {
    navigate('/devis'); // Redirection vers la page formulaire
  };

  return (
    <div className="bg-blue-500 text-white rounded-xl w-80 p-6 space-y-4 shadow-md">
      <h2 className="text-xl font-bold text-center">Obtenez un devis</h2>
      <p className="text-sm text-center text-white/90">Veuillez sélectionner un produit</p>

      {/* Sélecteur de produit */}
      <div className="relative">
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full appearance-none bg-white text-gray-800 rounded-md px-4 py-2 pr-10 focus:outline-none"
        >
          <option value="RC Chef de Famille">RC Chef de Famille</option>
          <option value="Assurance Auto">Assurance Auto</option>
          <option value="Assurance Habitation">Assurance Habitation</option>
        </select>
        <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-500 pointer-events-none" />
      </div>

      {/* Bouton Détails */}
      <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 py-2 rounded-md hover:bg-gray-100 transition">
        <List className="w-4 h-4" />
        Détails
      </button>

      {/* Bouton Devis → Navigation */}
      <button
        onClick={handleDevisClick}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
      >
        <DollarSign className="w-4 h-4" />
        Devis
      </button>
    </div>
  );
};

export default QuoteBox;
