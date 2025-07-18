import React, { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Calendar,
  Eye,
  DollarSign
} from "lucide-react";

import { usePublicationsPub } from "../hooks/api/usePublications";
import { useAuth } from "../contexts/authContext";
import { FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Publications = () => {
  const { isAuthenticated } = useAuth();
  const { data: publications = [], isLoading, error } = usePublicationsPub();
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);

  const publicationsPerPage = 6;
  const totalPages = Math.ceil(publications.length / publicationsPerPage);
  const startIndex = (currentPage - 1) * publicationsPerPage;
  const currentPublications = publications.slice(startIndex, startIndex + publicationsPerPage);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const renderContentPreview = useCallback((publication) => {

    console.log(publication)
    const MAX_CHARS = 400;
    const PREVIEW_CHARS = 150;

    const truncateText = (text, limit) => {
      if (text.length <= limit) return text;
      return text.substring(0, limit) + '...';
    };

    if (isAuthenticated) {
      return (
        <a href={`/publications/detail/${publication.titre
              }/${publication.id}`}className="text-gray-700 leading-relaxed cursor-pointer">
          {truncateText(publication.contenu, MAX_CHARS)}
          {publication.contenu.length > MAX_CHARS && (
            <a href={`/publications/detail/${publication.titre
              }/${publication.id}`} className="text-gray-400 text-sm ml-1 cursor-grab hover:text-primary">
              ({t("publications.moreChars", { count: publication.contenu.length - MAX_CHARS })})
            </a>
          )}
        </a>
      );
    }

    const previewText = truncateText(publication.contenu, PREVIEW_CHARS);
    const remainingText = publication.contenu.substring(PREVIEW_CHARS);

    return (
      <div className="relative">
        <p className="text-gray-700 leading-relaxed">{previewText}</p>

        {remainingText.length > 0 && (
          <div className="relative mt-2">
            <div className="gradient-blur-text">
              {truncateText(remainingText, MAX_CHARS - PREVIEW_CHARS)}
            </div>
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <div className="inline-flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                <FaLock className="text-gray-500 text-sm" />
                <a href="/login" className="text-xs font-medium text-gray-600 cursor-pointer">
                  {t("publications.loginToReadMore", {
                    count: remainingText.length,
                  })}
                </a>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .gradient-blur-text {
            color: transparent;
            background-image: linear-gradient(
              to bottom,
              rgba(75, 85, 99, 0.9) 0%,
              rgba(75, 85, 99, 0.5) 50%,
              rgba(75, 85, 99, 0.1) 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            filter: blur(1px);
            line-height: 1.6;
          }
        `}</style>
      </div>
    );
  }, [isAuthenticated, t]);

  const LoadingState = () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-4 text-gray-600">{t("publications.loading")}</span>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-600 font-medium">{t("publications.errorTitle")}</p>
        <p className="text-red-500 text-sm mt-2">{t("publications.errorMessage")}</p>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
        <p className="text-gray-600 text-lg font-medium">{t("publications.empty")}</p>
        <p className="text-gray-500 text-sm mt-2">{t("publications.checkBack")}</p>
      </div>
    </div>
  );

  const PublicationCard = ({ publication }) => (
    <article className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group ${!isAuthenticated ? "ring-1 ring-gray-200" : ""
      }`}>
      {publication.image_path && (
        <div className="relative h-48 sm:h-56 lg:h-48 overflow-hidden">
          <img
            src={publication.image_path}
            alt={publication.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {!isAuthenticated && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 flex items-end justify-center pb-4">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center gap-1 text-gray-700">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">{t("publications.premiumContent")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <header className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {publication.titre}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={publication.date_publication}>
                {new Date(publication.date_publication).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{publication.qui_peu_voir}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <DollarSign className="h-4 w-4" />
              <span>{publication.prix} CAD</span>
            </div>
          </div>
        </header>

        <div className="mb-6 min-h-[120px] ">
          {renderContentPreview(publication)}
        </div>
      </div>
    </article>
  );

  const Pagination = () => (
    <nav className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
      >
        <ChevronLeft className="h-4 w-4" />
        {t("pagination.prev")}
      </button>

      <div className="flex items-center gap-2">
        <span className="text-gray-600 font-medium">
          {t("pagination.pageOf", { current: currentPage, total: totalPages })}
        </span>
      </div>

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
      >
        {t("pagination.next")}
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            📰 {t("publications.title")}
          </h1>
          {!isAuthenticated && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("publications.loginMessage")}
            </p>
          )}
        </header>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : currentPublications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {currentPublications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
            {totalPages > 1 && <Pagination />}
          </>
        )}
      </div>
    </div>
  );
};

export default Publications;
