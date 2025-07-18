

import React from "react";

const MentionsLegales = () => {
  return (
    <>

      <main className="bg-gray-100 min-h-screen text-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Mentions Légales</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <p className="mb-2">Nom de l'entreprise : <strong>Votre Société</strong></p>
            <p className="mb-2">Adresse : 123 Rue Exemple, 75000 Paris, France</p>
            <p className="mb-2">Téléphone : +33 1 23 45 67 89</p>
            <p className="mb-2">Email : contact@votresite.com</p>
            <p className="mb-2">SIRET : 123 456 789 00000</p>
            <p>Directeur de la publication : Monsieur / Madame Nom Prénom</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <p className="mb-2">Hébergeur : Vercel Inc.</p>
            <p className="mb-2">Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
            <p>Email : support@vercel.com</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p className="mb-2">
              Le contenu de ce site (textes, images, logos, etc.) est protégé par le droit d'auteur. 
              Toute reproduction ou représentation, totale ou partielle, est interdite sans l'autorisation préalable de l'éditeur.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
            <p className="mb-2">
              Les informations personnelles collectées sur ce site sont destinées exclusivement à l’usage de Votre Société. 
              Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
            </p>
            <p>Pour exercer ces droits, contactez-nous à l'adresse suivante : <strong>contact@votresite.com</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              Ce site utilise des cookies à des fins de mesure d’audience et de fonctionnement. Vous pouvez configurer vos préférences de cookies via votre navigateur.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default MentionsLegales;
