import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

type AppLoaderProps = {
  message?: string;
};

const AppLoader = ({ message = "Chargement..." }: AppLoaderProps) => {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-white text-center px-4">
      <motion.div
        className="p-4 rounded-full bg-indigo-50 border border-indigo-100 shadow-md mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            y: [0, -4, 0],
            opacity: [1, 0.9, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <ShieldCheck className="text-indigo-950 w-8 h-8" />
        </motion.div>
      </motion.div>

      <motion.p
        className="text-base md:text-lg text-emerald-700 font-medium"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {message}
      </motion.p>

      <p className="text-sm text-gray-500 mt-1">
        Veuillez patienter un instant...
      </p>
    </div>
  );
};

export default AppLoader;
