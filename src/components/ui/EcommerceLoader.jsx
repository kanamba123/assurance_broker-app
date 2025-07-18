import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const EcommerceLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white">
      <div className="relative flex flex-col items-center">
        {/* Cercle animé avec dégradé doux */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border-4 border-t-emerald-500 border-b-emerald-300 border-l-transparent border-r-transparent"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        />

        {/* Icône panier au centre */}
        <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full z-10 shadow-inner">
          <ShoppingCart className="w-10 h-10 text-indigo-950" />
        </div>

        {/* Texte */}
        <p className="mt-6 text-base text-gray-500 font-medium">
          Chargement de vos boutiques...
        </p>
      </div>
    </div>
  );
};

export default EcommerceLoader;
