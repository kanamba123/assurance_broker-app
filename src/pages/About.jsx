import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const About = () => {
  const { t } = useTranslation();

  
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <section
        className="relative bg-cover bg-center bg-no-repeat py-32 text-md text-white"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/591562_d3fcc6ab9e26440c808bdad25d2a0c5c~mv2.png')`,
        }}
      >
        <div className="absolute inset-0 bg-blue-700 bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{t("about.title")}</h1>
        </div>
      </section>

      <section className="py-6 text-left text-xl">
        <div className="max-w-5xl mx-auto px-4 text-left">
          <h2 className="text-3xl font-bold mb-6">{t("about.whoAreWe.title")}</h2>
          <p>{t("about.whoAreWe.description1")}</p>
          <p className="mt-4">{t("about.whoAreWe.description2")}</p>

          <p className="mt-4">{t("about.analysisIntro")}</p>
          <div className="p-4">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t("about.analysis.point1")}</li>
              <li>{t("about.analysis.point2")}</li>
              <li>{t("about.analysis.point3")}</li>
            </ul>
            <p>
              {t("about.analysis.highlight")}
            </p>
          </div>

          <div className="flex items-start space-x-4 mt-6">
            <div className="w-1 h-10 bg-[#0b2e59]"></div>
            <p className="text-gray-800 text-3xl font-bold mb-6">
              {t("about.international.title")}
            </p>
          </div>
          <p>{t("about.international.description1")}</p>
          <p className="mt-4">{t("about.international.description2")}</p>

          <div className="mt-4">
            <div className="flex items-start space-x-4">
              <div className="w-1 h-10 bg-[#0b2e59]"></div>
              <p className="text-gray-800 text-3xl font-bold mb-6">{t("about.mission.title")}</p>
            </div>
            <p>{t("about.mission.intro")}</p>

            <div className="p-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t("about.mission.point1")}</li>
                <li>{t("about.mission.point2")}</li>
              </ul>
              <p>{t("about.analysis.highlight")}</p>

              <div>
                <p className="my-5">{t("about.mission.description1")}</p>
                <p><strong>{t("about.mission.description2")}</strong></p>
                <p><strong>{t("about.mission.description3")}</strong></p>
              </div>
            </div>
          </div>

          <h1 className="text-4xl mt-10">{t("about.models.title")}</h1>
          <h2>{t("about.models.hybridTitle")}</h2>
          <p>{t("about.models.hybridDescription")}</p>

          <div className="p-4">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t("about.models.hybrid.point1")}</li>
              <li>{t("about.models.hybrid.point2")}</li>
              <li>{t("about.models.hybrid.point3")}</li>
            </ul>
            <p>{t("about.analysis.highlight")}</p>
          </div>

          <h2>{t("about.models.businessModelTitle")}</h2>
          <div className="p-4">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t("about.models.business.point1")}</li>
              <li>{t("about.models.business.point2")}</li>
              <li>{t("about.models.business.point3")}</li>
            </ul>
          </div>

          <h1 className="text-4xl mt-10">{t("about.security.title")}</h1>
          <p>{t("about.security.point1")}</p>
          <p>{t("about.security.point2")}</p>
          <p>{t("about.security.point3")}</p>

          <h1 className="text-4xl mt-10">{t("about.why.title")}</h1>
          <div className="p-4">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t("about.why.point1")}</li>
              <li>{t("about.why.point2")}</li>
              <li>{t("about.why.point3")}</li>
              <li>{t("about.why.point4")}</li>
            </ul>
            <p>{t("about.why.closing")}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("about.quick.missionTitle")}</h3>
              <p>{t("about.quick.missionText")}</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("about.quick.visionTitle")}</h3>
              <p>{t("about.quick.visionText")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary-dark">{t("about.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("about.values.integrityTitle")}</h3>
              <p>{t("about.values.integrityText")}</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("about.values.innovationTitle")}</h3>
              <p>{t("about.values.innovationText")}</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("about.values.commitmentTitle")}</h3>
              <p>{t("about.values.commitmentText")}</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("about.values.excellenceTitle")}</h3>
              <p>{t("about.values.excellenceText")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
