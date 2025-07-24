
import { Controller, useForm } from 'react-hook-form';
import { useCompanyProducts } from "../hooks/api/useCompanyProduct"
import Select from 'react-select';
import { useMemo } from 'react';

const DevisForm = () => {
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


  const onSubmit = (data) => {
    console.log('Données soumises :', data);
    reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <section>
        <div className="bg-bg-dark p-20">
          <h2 className="text-5xl text-white">Avez-vous un projet ?</h2>
          <h3 className="text-white text-2xl mt-3">Obtenez votre devis gratuit</h3>
        </div>
      </section>

      <header className="bg-blue-600 py-8 text-center text-white">
        <h1 className="text-5xl font-bold">Demande de Devis</h1>
        <p className="text-md mt-1">Remplissez ce formulaire pour obtenir un devis personnalisé.</p>
      </header>

      <main className="flex justify-center py-12 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-4"
        >
          <h2 className="text-4xl  font-semibold text-left">Formulaire de demande de devis</h2>

          {/* Civilité */}
          <div>
            <label className="block mb-1 text-sm text-left">Civilité</label>
            <select
              {...register('civilite', { required: 'Champ requis' })}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
              <option value="mademoiselle">Mademoiselle</option>
              <option value="personnemorale">Personne morale</option>
            </select>
            {errors.civilite && <p className="text-red-500 text-sm">{errors.civilite.message}</p>}
          </div>

          {/* Nom */}
          <div>
            <label className="block mb-1 text-sm text-left">Nom</label>
            <input
              type="text"
              {...register('nom', { required: 'Champ requis' })}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
          </div>

          {/* Prénom */}
          <div>
            <label className="block mb-1 text-sm text-left">Prénom</label>
            <input
              type="text"
              {...register('prenom', { required: 'Champ requis' })}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-left">Adresse e-mail</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email requis',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email invalide',
                },
              })}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block mb-1 text-sm text-left">Téléphone</label>
            <input
              type="tel"
              {...register('telephone', { required: 'Champ requis' })}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone.message}</p>}
          </div>

          {/* Type d'assurance */}
          <div>
            <label className="block mb-1 text-sm text-left">Type d'assurance</label>
            <select
              {...register('typeAssurance', { required: 'Champ requis' })}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="Individuelle">Particulier</option>
              <option value="Entreprise">Compagnie</option>
            </select>
            {errors.typeAssurance && <p className="text-red-500 text-sm">{errors.typeAssurance.message}</p>}
          </div>

          {/* Produit d'assurance */}
          <div>
            <label className="block mb-1 text-sm text-left">Produit d'assurance</label>
            <Controller
              name="produitAssurance"
              control={control}
              rules={{ required: 'Veuillez sélectionner au moins un produit' }}
              render={({ field }) => (
                <Select
                  {...field}
                  // isMulti
                  options={productOptions}
                  className="react-select-container w-full text-left text-md"
                  classNamePrefix="react-select"
                 
                  placeholder="Sélectionnez les produits"
                  closeMenuOnSelect={true}
                  onChange={(selected) => field.onChange(selected)}
                  value={field.value}
                />

              )}
            />
            {errors.produitAssurance && (
              <p className="text-red-500 text-sm">{errors.produitAssurance.message}</p>
            )}
          </div>


          {/* Message */}
          <div>
            <label className="block mb-1 text-sm text-left">Message / Informations complémentaires</label>
            <textarea
              {...register('message')}
              rows={4}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Bouton */}
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md items-start hover:bg-blue-700 transition"
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
