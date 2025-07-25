import { Eye, Group, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QuoteBox from "../components/ui/QuoteBox";
import InsuranceGrid from "./bout/InsuranceGrid";


const About = () => {
  const { t } = useTranslation();


  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <section
        className="relative bg-cover bg-center bg-no-repeat py-32 px-20 text-md"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/591562_d3fcc6ab9e26440c808bdad25d2a0c5c~mv2.png')`,
        }}
      >
        <div className="absolute inset-0 bg-blue-700 bg-opacity-50"></div>
        <div className="relative max-w-7xl bg-white mx-auto px-10 py-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{t("about.title")}</h1>
          <p className="text-2xl  mb-6">{t("about.description")}</p>
        </div>
      </section>

      <section className="py-6 text-left text-xl ">
        <div className="max-w-7xl mx-auto px-4 text-left border-1 border-gray-400 ">
          <h2 className="text-3xl flex font-bold mb-6"> <User2Icon /> {t("about.whoAreWe.title")}</h2>

          <p>{t("about.whoAreWe.description1")}</p>
          <p className="mt-4">{t("about.whoAreWe.description2")}</p>
          <p className="mt-4">{t("about.whoAreWe.description3")}</p>

          <div className="p-4">
            <h2 className="text-3xl flex font-bold mb-6"> <Eye className="text-2xl" /> {t("about.mission.title")}</h2>

            <p>
              {t("about.mission.intro")}
            </p>
          </div>

          <h2 className="text-3xl flex font-bold mb-6"> <User2Icon /> {t("about.mission.titre1")}</h2>

          <div className="p-4">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{t("about.mission.point1")}</li>
              <li>{t("about.mission.point2")}</li>
              <li>{t("about.mission.point3")}</li>
              <li>{t("about.mission.point4")}</li>
            </ul>
          </div>
          <section className=" flex items-center justify-center my-4 bg-gray-50">
            <QuoteBox />
          </section>
        </div>
      </section>

      <section className="max-w-7xl mx-auto my-6  text-left">
        <div className="min-h-screen bg-gray-100">
          <h1 className="text-4xl py-1 text-primary font-bold text-left ">{t('about.ourpartener')}</h1>
          <InsuranceGrid />
        </div>
      </section>

    </div>
  );
};

export default About;
