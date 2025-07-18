import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StoreImageCarousel = ({ images = [], storeName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-md">
      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${storeName} image ${currentIndex + 1}`}
          className="w-full h-72 object-cover"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Boutons navigation */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Pagination bullets */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full ${
              idx === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreImageCarousel;
