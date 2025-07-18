import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegCommentDots } from "react-icons/fa";
import { useArticles } from "../hooks/api/useArticles";

const Articles = () => {
  const { data: articles = [], isLoading, error } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [activeArticleId, setActiveArticleId] = useState(null);

  const articlesPerPage = 6;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => ({
      ...prev,
      [activeArticleId]: [...(prev[activeArticleId] || []), newComment.trim()],
    }));
    setNewComment("");
  };

  const openCommentModal = (id) => {
    setActiveArticleId(id);
    setNewComment("");
  };

  const closeModal = () => {
    setActiveArticleId(null);
    setNewComment("");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  px-4 py-12 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary-dark">📰 Nos Articles</h1>

        {isLoading ? (
          <p className="text-center text-gray-300">Chargement des articles...</p>
        ) : error ? (
          <p className="text-center text-red-400">Erreur lors du chargement des articles.</p>
        ) : currentArticles.length === 0 ? (
          <p className="text-center text-gray-400">Aucun article disponible.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentArticles.map((article) => (
                <div
                  key={article.Id_Article}
                  className="bg-white  rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-secondary mb-2">
                      {article.titre}
                    </h2>

                    {article.image_uri && (
                      <img
                        src={article.image_uri}
                        alt={article.titre}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}

                    <p className=" mb-4">
                      {article.contenu.length > 150
                        ? `${article.contenu.slice(0, 150)}...`
                        : article.contenu}
                    </p>

                    <div className="text-sm  space-y-1 mb-4">
                      <p><strong>Publié le :</strong> {new Date(article.date_publication).toLocaleDateString()}</p>
                      <p><strong>Visibilité :</strong> {article.qui_peu_voir}</p>
                    </div>

                    {/* Like and comment controls */}
                    <div className="flex items-center justify-between mt-4 mb-2">
                      <button
                        onClick={() => handleLike(article.Id_Article)}
                        className="flex items-center gap-1 text-pink-500 hover:text-pink-400 transition"
                      >
                        <FaHeart className="text-lg" />
                        <span>{likes[article.Id_Article] || 0}</span>
                      </button>

                      <button
                        onClick={() => openCommentModal(article.Id_Article)}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                      >
                        <FaRegCommentDots />
                        <span>{(comments[article.Id_Article] || []).length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border border-secondary hover:bg-primary transition ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaChevronLeft /> Précédent
              </button>
              <span className="text-sm md:text-base text-secondary">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border border-secondary hover:bg-primary transition ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Suivant <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal commentaire */}
      {activeArticleId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-black w-full max-w-md p-6 rounded-xl relative shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Commentaires</h3>

            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {(comments[activeArticleId] || []).map((c, i) => (
                <div key={i} className="bg-gray-100 px-3 py-2 rounded-md text-sm">
                  {c}
                </div>
              ))}
            </div>

            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-1 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Fermer
              </button>
              <button
                onClick={handleAddComment}
                className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
