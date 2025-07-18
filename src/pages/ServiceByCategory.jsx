import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useServicesByCategory } from "../hooks/api/useService";
import {
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCategorieDetail } from "../hooks/api/useCategoriesService";

const ServiceByCategory = () => {
  const { serviceId, serviceName } = useParams();
  const { data: service = [], isLoading, error } = useServicesByCategory(serviceId);
  const { data: categoriesdetailServiceCategories = [], isLoading:isLoadingServiceCat, errorServiceCat } = useCategorieDetail(serviceId);

  const [scrollY, setScrollY] = useState(0);
  const {t}=useTranslation();


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
        ) : categoriesdetailServiceCategories && Object.keys(categoriesdetailServiceCategories).length > 0 && (
          <div className="bg-white shadow-lg p-0 mb-12 mt-8">

            {/* Hero Section */}
            <div
              className=" h-[80vh] flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${categoriesdetailServiceCategories?.image_uri || "https://static.wixstatic.com/media/591562_a5dea6a98574483f9418304bc9e4d33d~mv2.png/v1/fill/w_980,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Titre%20de%20la%20page_comp-lvfco8hi.png"})`,
                backgroundSize: "cover",
                backgroundPosition: `center ${scrollY * 0.5}px`,
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>

              <div
                className="relative z-20 p-10 rounded-xl max-w-4xl w-full text-center"
                style={{
                  transform: `translateY(${scrollY * 0.3}px)`,
                  opacity: Math.max(0, 1 - scrollY / 800)
                }}
              >
                <h1 className="text-4xl font-bold text-center mb-4 text-white">
                  {t('clients.title1')} - {serviceName?.replace(/-/g, " ")}
                </h1>
                <p className="text-gray-700 max-w-3xl text-4xl text-white">
                    {categoriesdetailServiceCategories?.description || t('client.noDescription')}
                  </p>
              </div>
            </div>

          
          </div>
        )}

        <div className=" mx-auto px-4 py-8 space-y-6 text-gray-800">
          <p className="text-lg leading-relaxed">
            <strong className="text-primary-600">GISA ANALYTICA Inc.</strong> mobilise un réseau international de chercheurs,
            d’experts sectoriels et de praticiens chevronnés pour accompagner les gouvernements, les institutions,
            les ONG, les entreprises stratégiques et les membres de la diaspora dans la conception, la planification
            et la mise en œuvre de projets à fort impact.
          </p>

          <p className="text-lg leading-relaxed">
            Ancré entre le <span className="font-semibold">Canada</span>, <span className="font-semibold">l’Afrique</span> et les
            <span className="font-semibold"> marchés émergents</span>, notre cabinet combine rigueur analytique, compréhension contextuelle,
            et efficacité opérationnelle. Tous nos services sont offerts en <span className="font-semibold">français</span> et en
            <span className="font-semibold"> anglais</span>, avec un traitement confidentiel et un suivi professionnel à chaque étape.
          </p>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-300">Chargement des services...</p>
        ) : error ? (
          <p className="text-center text-red-400">Erreur lors du chargement des services.</p>
        ) : service.length === 0 ? (
          <p className="text-center text-gray-400">Aucun service disponible pour cette catégorie.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
              {service.map((service) => (
                <div
                  key={service.Id_Service}
                  className=" p-4 transition duration-300 flex flex-col justify-between border-1 border-gray-300"
                >

                  <div className="text-left">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar avec image de profil - aligné à gauche */}
                      <div className="flex-shrink-0">
                        {service?.image ? (
                          <img
                            src={service?.image}
                            alt={service?.titre}
                            className="w-12 h-12  border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12    flex items-center justify-center bg-gray-100">
                            <span className="text-blue-600 font-semibold text-xl">
                              {service?.titre?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Titre - aligné à droite */}
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-primary">
                        {service?.titre}
                      </h2>
                    </div>

                    <div>
                      <p className="y mb-4">{service.description}</p>
                    </div>
                  </div>


                  <div className="mt-4 text-sm space-y-2">

                    <div className="flex items-center gap-2">
                      {service.actif ? (
                        <>
                          <FaCheckCircle className="text-green-500" />
                          <span className="font-medium text-text-primary">Disponible</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-500" />
                          <span className="font-medium text-text-primary">Indisponible</span>
                        </>
                      )}
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

export default ServiceByCategory;
