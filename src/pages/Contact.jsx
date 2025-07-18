import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAddMessageContact } from "../hooks/api/useMessageContact";

const Contact = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const mutation = useAddMessageContact();
  const [submitStatus, setSubmitStatus] = useState(null); // success | error | null

  const onSubmit = async (data) => {
    setSubmitStatus(null); // reset
    try {
      await mutation.mutateAsync({
        nom: data.name,
        email: data.email,
        message: data.message,
      });
      reset();
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br px-4 py-12">
      <div className="max-w-4xl w-full rounded-2xl shadow-2xl p-8 sm:p-10 space-y-12">
        <h2 className="text-4xl font-bold text-center text-secondary">
          {t("contact.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">{t("contact.name")}</label>
              <input
                type="text"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-secondary"
                } rounded-xl focus:ring-2 focus:outline-none`}
                {...register("name", { required: true })}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {t("contact.errorRequired")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">{t("contact.email")}</label>
              <input
                type="email"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-secondary"
                } rounded-xl focus:ring-2 focus:outline-none`}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.type === "pattern"
                    ? t("contact.errorEmail")
                    : t("contact.errorRequired")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">{t("contact.message")}</label>
              <textarea
                rows="4"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.message ? "border-red-500" : "border-secondary"
                } rounded-xl focus:ring-2 focus:outline-none`}
                {...register("message", { required: true })}
                disabled={isSubmitting}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {t("contact.errorRequired")}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-secondary text-white font-semibold rounded-xl shadow-md hover:bg-primary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </button>

            {/* Message de statut */}
            {submitStatus === "success" && (
              <p className="text-green-500 text-center font-medium mt-2">
                {t("contact.success")}
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center font-medium mt-2">
                {t("contact.error")}
              </p>
            )}
          </form>

          {/* Infos de contact & réseaux sociaux */}
          <div className="space-y-6 text-gray-800 dark:text-gray-300">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-blue-500" />
              <span className="text-secondary">+1 819 968 8585</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-500" />
              <a
                href="mailto:info@gisaanalytica.com"
                className="hover:underline text-blue-600 dark:text-blue-400"
              >
                info@gisaanalytica.com
              </a>
            </div>

            <hr className="border-gray-300 dark:border-gray-700" />

            <div>
              <p className="mb-2">{t("contact.follow")}</p>
              <div className="flex space-x-4 text-xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
