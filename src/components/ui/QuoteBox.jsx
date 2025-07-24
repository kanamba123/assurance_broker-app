import React, { useMemo, useState } from 'react';
import { List, DollarSign, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useCompanyProducts } from '../../hooks/api/useCompanyProduct';
import { Controller, useForm } from 'react-hook-form';

const QuoteBox = () => {
  const [selectedProduct, setSelectedProduct] = useState('RC Chef de Famille');
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { data: campanieProducts } = useCompanyProducts();

  const productOptions = useMemo(() => {
    return (campanieProducts || []).map(product => ({
      value: product.id,
      label: product.name,
    }));
  }, [campanieProducts]);

 const handleDevisClick = () => {
  const labelSlug = selectedProduct.label
    .toLowerCase()
    .normalize("NFD")                
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9]+/g, "-")    
    .replace(/^-+|-+$/g, "");     

  navigate(`/devis/${labelSlug}/${selectedProduct.value}`);
};


  return (
    <div className="bg-blue-500 text-white w-80 p-6 space-y-4 shadow-md rounded-tr-xl rounded-bl-xl mx-2  transition-transform ">
      <h2 className="text-xl font-bold text-center">Obtenez un devis</h2>
      <p className="text-sm text-center text-white/90">Veuillez sélectionner un produit</p>

      <div className="relative">
        <div>
          <label className="block mb-1 text-sm text-left">Produit d'assurance</label>
          <Controller
            name="produitAssurance"
            control={control}
            rules={{ required: 'Veuillez sélectionner au moins un produit' }}
            render={({ field }) => (
              <Select
                {...field}
                options={productOptions}
                className="react-select-container bg-primary text-black w-full text-left text-md"
                classNamePrefix="react-select"
                placeholder="Sélectionnez les produits"
                closeMenuOnSelect={true}
                onChange={(selected) => {
                  setSelectedProduct(selected);   
                  field.onChange(selected);      
                }}
                value={field.value}
              />
            )}
          />
          {errors.produitAssurance && (
            <p className="text-red-500 text-sm">{errors.produitAssurance.message}</p>
          )}
        </div>
        <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-500 pointer-events-none" />
      </div>


      <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 py-2 rounded-md hover:bg-gray-100 transition">
        <List className="w-4 h-4" />
        Détails
      </button>

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
