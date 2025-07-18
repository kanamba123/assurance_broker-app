import { useCallback, useEffect, useRef, useState } from "react";
import { useAddTestimony, useTestimonInfinite } from "../hooks/api/useTestimony";
import { useTranslation } from "react-i18next";

const StarRatingDisplay = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="ml-1 text-sm text-gray-500">{rating}/5</span>
  </div>
);

const Testimony = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTestimonInfinite();
  const loaderRef = useRef();
  const useAddTest = useAddTestimony();
  const { t } = useTranslation();

  const [isTestifyModalOpen, setIsTestifyModalOpen] = useState(false);
  const [testimonyContent, setTestimonyContent] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);


  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const testimonies = data?.pages.flatMap(page => page.items) || [];



  const handleSubmitTestimony = () => {
    if (!testimonyContent.trim()) return;

    const newTestimony = {
      title,
      note: rating,
      message: testimonyContent,
      date_posted: new Date().toISOString(),
    };

    useAddTest.mutate(newTestimony, {
      onSuccess: () => {
        setTestimonyContent("");
        setTitle("");
        setRating(0);
        setIsTestifyModalOpen(false);
      },
      onError: (err) => console.error("Erreur lors de l'envoi :", err),
    });
  };

  const renderContentPreview = useCallback((content) => (
    <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line line-clamp-3">
      {content}
    </p>
  ), []);



  return (
    <div className="min-h-screen bg-gradient-to-br px-4 py-12 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          💬 {t("testimonies.title")}
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-300">{t("testimonies.loading")}</p>
        ) : error ? (
          <p className="text-center text-red-400">{t("testimonies.error")}</p>
        ) : testimonies.length === 0 ? (
          <p className="text-center text-gray-400">{t("testimonies.empty")}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
              {testimonies.map((testimony) => (
                <div key={testimony.id} className="w-full h-full rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col bg-white">

                  <div className="flex items-center mb-4">
                    {testimony.user.profile ? (
                      <img
                        src={testimony.user.profile}
                        alt={testimony.user.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 border border-action-add rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {testimony.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-semibold">{testimony.user.name}</p>
                      <p className="text-sm text-gray-400">
                        Publié le {new Date(testimony.date_posted).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <StarRatingDisplay rating={testimony.note} />

                  {testimony.image && (
                    <div className="relative h-48 overflow-hidden mt-4">
                      <img
                        src={testimony.image}
                        alt={testimony.title}
                        className="h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <blockquote className="italic text-primary mb-4">
                    {renderContentPreview(testimony.message)}
                  </blockquote>
                </div>
              ))}
            </div>


          </>
        )}
      </div>

      {/* Élément sentinelle pour IntersectionObserver */}
      <div ref={loaderRef} className="h-4"></div>


      {/* Loader affiché pendant le fetch de la page suivante */}
      {isFetchingNextPage && (
        <p className="text-center text-gray-500">Chargement...</p>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsTestifyModalOpen(true)}
        className="fixed md:static bottom-6 right-6 md:mt-8 z-50 bg-secondary hover:bg-primary p-4 md:px-6 md:py-3 rounded-full md:rounded-lg shadow-lg transition"
      >
        {t("testimonies.cta")}
      </button>

      {/* Modal */}
      {isTestifyModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white text-black w-full max-w-md rounded-xl shadow-2xl mx-4">
            <div className="bg-gradient-to-r from-primary to-primary px-6 py-4">
              <h2 className="text-xl font-bold text-white">{t("testimonies.modal.title")}</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("testimonies.modal.fields.title")}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder={t("testimonies.modal.fields.titlePlaceholder")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("testimonies.modal.fields.rating")}
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${rating >= star
                          ? "bg-blue-100 text-secondary border-2 border-secondary"
                          : "bg-gray-100 text-gray-400 border-2 border-gray-300 hover:border-blue-300"}`}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="ml-2 text-gray-500 text-sm">{rating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("testimonies.modal.fields.details")}
                </label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder={t("testimonies.modal.fields.detailsPlaceholder")}
                  value={testimonyContent}
                  onChange={(e) => setTestimonyContent(e.target.value)}
                />
              </div>


              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsTestifyModalOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  {t("testimonies.modal.cancel")}
                </button>
                <button
                  onClick={handleSubmitTestimony}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-blue-500 text-white"
                >
                  {t("testimonies.modal.submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimony;
