import React, { useState } from 'react';
import {
  FaPlus, FaTimes, FaEdit, FaTrash, FaImages, FaEuroSign, FaCalendarAlt
} from 'react-icons/fa';
import {
  useCompanyProducts,
  useCreateCompanyProduct,
  useUpdateCompanyProduct,
  useDeleteCompanyProduct,
  useUploadCompanyProductImage
} from '../../hooks/api/useCompanyProduct';
import { useInsuranceCompanies } from '../../hooks/api/useInsuranceCompany';
import { useInsuranceTypes } from '../../hooks/api/useInsuranceType';

const CompanyProducts = () => {
  const { data: products = [], isLoading, error } = useCompanyProducts();
  const { data: insurance_campanies = [] } = useInsuranceCompanies()
  const { data: insurance_type = [] } = useInsuranceTypes()
  const createProductMutation = useCreateCompanyProduct();
  const updateProductMutation = useUpdateCompanyProduct();
  const deleteProductMutation = useDeleteCompanyProduct();
  const uploadImageMutation = useUploadCompanyProductImage();

  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    company_id: '',
    type_id: '',
    product_code: '',
    name: '',
    description: '',
    base_price: 0,
    commission_rate: 0,
    is_active: true,
    terms_conditions: '',
    garanties: '',
    image_path: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { image_url } = await uploadImageMutation.mutateAsync(file);
        setFormData(prev => ({ ...prev, image_path:image_url }));
      } catch (err) {
        console.error("Erreur lors de l'upload de l'image", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mutation = editingProduct ? updateProductMutation : createProductMutation;
    const payload = editingProduct ? { id: editingProduct.id, ...formData } : formData;

    mutation.mutate(payload, {
      onSuccess: () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
          company_id: '',
          type_id: '',
          product_code: '',
          name: '',
          description: '',
          base_price: 0,
          commission_rate: 0,
          is_active: true,
          terms_conditions: '',
          garanties: '',
          image_path: ''
        });
      },
      onError: (err) => {
        console.error(err);
      }
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      company_id: product.company_id,
      type_id: product.type_id,
      product_code: product.product_code,
      name: product.name,
      description: product.description || '',
      base_price: product.base_price,
      commission_rate: product.commission_rate,
      is_active: !!product.is_active,
      terms_conditions: product.terms_conditions || '',
      garanties: product.garanties || '',
      image_path: product.image_path || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce produit ?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleOpenImageModal = (product) => {
    setEditingProduct(product);
    setShowImageModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Produits de l'entreprise</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark"
          >
            <FaPlus /> Ajouter un produit
          </button>
        </div>

        {isLoading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-red-500">Erreur lors du chargement des produits</div>
        ) : (
          <table className="w-full table-auto bg-white rounded shadow overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Prix</th>
                <th className="px-4 py-2">Commission</th>
                <th className="px-4 py-2">Actif</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.product_code}</td>
                  <td className="px-4 py-2"><FaEuroSign className="inline mr-1" /> {p.base_price}</td>
                  <td className="px-4 py-2">{p.commission_rate} %</td>
                  <td className="px-4 py-2">{p.is_active ? 'Oui' : 'Non'}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(p)} title="Modifier" className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button onClick={() => handleOpenImageModal(p)} title="Image" className="text-purple-600 hover:text-purple-800"><FaImages /></button>
                    <button onClick={() => handleDelete(p.id)} title="Supprimer" className="text-red-600 hover:text-red-800"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-2xl relative overflow-auto max-h-[90vh]">
            <button onClick={() => { setShowModal(false); setEditingProduct(null); }} className="absolute top-4 right-4">
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Modifier' : 'Ajouter'} un produit</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
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
                  {insurance_campanies.map((insuranc_c) => (
                    <option key={insuranc_c.id} value={insuranc_c.id}>
                      {insuranc_c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Insurance type *</label>
                <select
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez une type d'assurance</option>
                  {insurance_type.map((type_assurance) => (
                    <option key={type_assurance.id} value={type_assurance.id}>
                      {type_assurance.name}
                    </option>
                  ))}
                </select>
              </div>
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nom" required className="p-2 border rounded" />
              <input name="product_code" value={formData.product_code} onChange={handleInputChange} placeholder="Code produit" required className="p-2 border rounded" />
              <input name="base_price" type="number" value={formData.base_price} onChange={handleInputChange} placeholder="Prix" className="p-2 border rounded" />
              <input name="commission_rate" type="number" value={formData.commission_rate} onChange={handleInputChange} placeholder="Commission (%)" className="p-2 border rounded" />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="p-2 border rounded" />
              <textarea name="terms_conditions" value={formData.terms_conditions} onChange={handleInputChange} placeholder="Conditions" className="p-2 border rounded" />
              <textarea name="garanties" value={formData.garanties} onChange={handleInputChange} placeholder="Garanties" className="p-2 border rounded" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                Actif
              </label>

              <div>
                <label className="block font-medium mb-1">Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer flex items-center gap-2"
                  >
                    <FaPlus /> {formData.image_path ? 'Changer l\'image' : 'Ajouter une image'}
                  </label>
                  {formData.image_path && (
                    <span className="text-sm text-gray-600">
                      Image sélectionnée
                    </span>
                  )}
                  {uploadImageMutation.isLoading && (
                    <span className="text-gray-500">Téléchargement en cours...</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editingProduct ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showImageModal && editingProduct?.image_path && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center">
          <button className="absolute top-4 right-4 text-white" onClick={() => setShowImageModal(false)}>
            <FaTimes size={24} />
          </button>
          <img src={editingProduct.image_path} alt="Produit" className="max-w-full max-h-screen object-contain" />
        </div>
      )}
    </div>
  );
};

export default CompanyProducts;
