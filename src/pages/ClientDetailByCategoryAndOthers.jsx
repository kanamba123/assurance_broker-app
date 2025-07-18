import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useClientDetailCategory, useClientsCategoris } from "../hooks/api/useCientCategories";

const ClientDetailByCategoryAndOthers = () => {
  const { clientId, clientName } = useParams();
  const { data: categoriesdetailclients = [], isLoading, error } = useClientDetailCategory(clientId);
  const { data: categoriesClients = [], isLoading: isLoadingClientCat, error: errorClient } = useClientsCategoris();

  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('client.loadingDetails')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{t('client.errorDetails')}</p>
          </div>
        ) : categoriesdetailclients && Object.keys(categoriesdetailclients).length > 0 && (
          <div className="bg-white shadow-lg p-0 mb-12 mt-8">

            {/* Hero Section */}
            <div
              className=" h-[80vh] flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${categoriesdetailclients.image_uri || "https://static.wixstatic.com/media/591562_a5dea6a98574483f9418304bc9e4d33d~mv2.png/v1/fill/w_980,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Titre%20de%20la%20page_comp-lvfco8hi.png"})`,
                backgroundSize: "cover",
                backgroundPosition: `center ${scrollY * 0.5}px`,
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-primary/30"></div>

              <div
                className="relative z-20 p-10 rounded-xl max-w-4xl w-full text-center"
                style={{
                  transform: `translateY(${scrollY * 0.3}px)`,
                  opacity: Math.max(0, 1 - scrollY / 800)
                }}
              >
                <h1 className="text-4xl font-bold text-center mb-4 text-primary-dark">
                  {t('clients.title1')} - {clientName?.replace(/-/g, " ")}
                </h1>
              </div>
            </div>

            {/* Detail Section */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {categoriesdetailclients.image_uri ? (
                  <img
                    src={categoriesdetailclients.image_uri}
                    alt={categoriesdetailclients.nom}
                    className="w-60 h-60 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                    <span className="text-gray-500">{t('client.noImage')}</span>
                  </div>
                )}

                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-primary-dark mb-2">
                    {categoriesdetailclients.nom}
                  </h2>
                  <p className="text-gray-700 max-w-3xl">
                    {categoriesdetailclients.description || t('client.noDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto px-4 py-8 space-y-6 text-gray-800">
          <p className="text-lg leading-relaxed">
            <strong className="text-primary-600">GISA ANALYTICA Inc.</strong> mobilise un réseau international de chercheurs,
            d'experts sectoriels et de praticiens chevronnés pour accompagner les gouvernements, les institutions,
            les ONG, les entreprises stratégiques et les membres de la diaspora dans la conception, la planification
            et la mise en œuvre de projets à fort impact.
          </p>

          <p className="text-lg leading-relaxed">
            Ancré entre le <span className="font-semibold">Canada</span>, <span className="font-semibold">l'Afrique</span> et les
            <span className="font-semibold"> marchés émergents</span>, notre cabinet combine rigueur analytique, compréhension contextuelle,
            et efficacité opérationnelle. Tous nos services sont offerts en <span className="font-semibold">français</span> et en
            <span className="font-semibold"> anglais</span>, avec un traitement confidentiel et un suivi professionnel à chaque étape.
          </p>
        </div>

        {isLoadingClientCat ? (
          <p className="text-center text-gray-300">Chargement des services...</p>
        ) : errorClient ? (
          <p className="text-center text-red-400">Erreur lors du chargement des services.</p>
        ) : categoriesClients.length === 0 ? (
          <p className="text-center text-gray-400">Aucun service disponible pour cette catégorie.</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-primary-dark mb-8 text-center">
              {t('')}
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
              {categoriesClients.map((clientCategorie) => (
                <div
                  key={clientCategorie.id}
                  className="p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {clientCategorie?.image_uri ? (
                          <img
                            src={clientCategorie?.image_uri}
                            alt={clientCategorie?.nom}
                            className="w-12 h-12 object-cover "
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 border-2 border-dashed">
                            <span className="text-primary font-semibold text-xl">
                              {clientCategorie?.nom?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      <h2 className="text-2xl font-semibold text-gray-800">
                        {clientCategorie?.nom}
                      </h2>
                    </div>

                    <div>
                      <p className="text-gray-600 mb-4">{clientCategorie.description}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default ClientDetailByCategoryAndOthers;