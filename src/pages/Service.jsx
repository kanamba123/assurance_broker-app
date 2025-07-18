import React, { useState } from "react";
import { useService } from "../hooks/api/useService";
import {
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Service = () => {
  const { data: service = [], isLoading, error } = useService();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary-dark">
          {t("service.title")}
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-300">{t("service.loading")}</p>
        ) : error ? (
          <p className="text-center text-red-400">{t("service.error")}</p>
        ) : service.length === 0 ? (
          <p className="text-center text-gray-400">{t("service.empty")}</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
              {service.map((service) => (
                <div
                  key={service.Id_Service}
                  className="p-4 transition duration-300 flex flex-col justify-between border-1 border-gray-300 text-left"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {service?.image ? (
                          <img
                            src={service?.image}
                            alt={service?.titre}
                            className="w-12 h-12"
                          />
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-xl">
                              {service?.titre?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-primary">
                        {service?.titre}
                      </h2>
                    </div>
                    <div>
                      <p className="mb-4">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      {service.actif ? (
                        <>
                          <FaCheckCircle className="text-green-500" />
                          <span className="font-medium text-text-primary">
                            {t("service.available")}
                          </span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-500" />
                          <span className="font-medium text-text-primary">
                            {t("service.unavailable")}
                          </span>
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

export default Service;
