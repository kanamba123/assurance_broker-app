import { useTestimonInfinite, useAddTestimony } from "../../hooks/api/useTestimony";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialSection = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTestimonInfinite();

  const { mutateAsync: addTestimony, isLoading: isAdding } = useAddTestimony();
  const [form, setForm] = useState({ auteur: "", role: "", message: "", image: "" });
  const loaderRef = useRef();

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

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

  const testimonies = data?.pages?.flatMap(page => page.items ?? []) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTestimony(form);
    setForm({ auteur: "", role: "", message: "", image: "" });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          data-aos="fade-up"
        >
          What Our Clients Say
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonies.map((t, index) => (
            <div
              key={t.id ?? index}
              className="bg-gray-100 rounded-2xl p-8 shadow-md hover:-translate-y-1 transition-transform duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center mb-4">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.auteur || "Auteur inconnu"}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mr-4 font-bold text-xl uppercase">
                    {t.auteur?.charAt(0) || "?"}
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{t.auteur || "Auteur inconnu"}</h4>
                  <p className="text-sm text-gray-500 capitalize">{t.role || "visiteur"}</p>
                  {t.date_posted && (
                    <p className="text-xs text-gray-400">
                      {new Date(t.date_posted).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">“{t.message}”</p>
            </div>
          ))}

          <div ref={loaderRef} className="h-4"></div>

          {isFetchingNextPage && (
            <p className="text-center text-gray-500 col-span-full">Chargement...</p>
          )}
        </div>

        {hasNextPage && (
          <div className="text-center mt-12">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        <div
          className="max-w-xl mx-auto bg-gray-50 p-6 mt-16 rounded-xl shadow-md"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Laisser un témoignage
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Votre nom"
              value={form.auteur}
              onChange={(e) => setForm({ ...form, auteur: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Poste / Fonction"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              placeholder="Votre témoignage"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 border rounded-lg"
              rows={4}
              required
            />
            <input
              type="text"
              placeholder="URL de votre photo (optionnel)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              disabled={isAdding}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              {isAdding ? "Envoi en cours..." : "Envoyer le témoignage"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
