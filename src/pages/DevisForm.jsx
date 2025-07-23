import React, { useState } from 'react';

const DevisForm = () => {
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    typeAssurance: '',
    produitAssurance: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header bleu */}
      <header className="bg-blue-600 py-8 text-center text-white">
        <h1 className="text-3xl font-bold">Demande de Devis</h1>
        <p className="text-sm mt-1">Remplissez ce formulaire pour obtenir un devis personnalisé.</p>
      </header>

      <main className="flex justify-center py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4"
        >
          <h2 className="text-lg font-semibold">Formulaire de demande de devis</h2>

          {/* Civilité */}
          <div>
            <label className="block mb-1 text-sm">Civilité</label>
            <select
              name="civilite"
              value={formData.civilite}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">-- Sélectionnez --</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Nom */}
          <div>
            <label className="block mb-1 text-sm">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="block mb-1 text-sm">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Adresse e-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block mb-1 text-sm">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Type d'assurance */}
          <div>
            <label className="block mb-1 text-sm">Type d'assurance</label>
            <select
              name="typeAssurance"
              value={formData.typeAssurance}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">-- Sélectionnez --</option>
              <option value="Individuelle">Individuelle</option>
              <option value="Entreprise">Entreprise</option>
            </select>
          </div>

          {/* Produit d'assurance */}
          <div>
            <label className="block mb-1 text-sm">Produit d'assurance</label>
            <select
              name="produitAssurance"
              value={formData.produitAssurance}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">-- Sélectionnez --</option>
              <option value="RC Chef de Famille">RC Chef de Famille</option>
              <option value="Assurance Auto">Assurance Auto</option>
              <option value="Habitation">Habitation</option>
              <option value="Voyage">Voyage</option>
            </select>
          </div>

          {/* Message complémentaire */}
          <div>
            <label className="block mb-1 text-sm">Message / Informations complémentaires</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-md px-3 py-2"
            ></textarea>
          </div>

          {/* Bouton */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Envoyer ma demande
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DevisForm;
