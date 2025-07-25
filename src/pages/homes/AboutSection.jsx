import { motion } from "framer-motion";
import { CheckCircle, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

// Variants d'animation
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const AboutSection = () => {
  const navigate = useNavigate();

  // Simulation de produit sélectionné, à remplacer par une prop ou un contexte
  const selectedProduct = useMemo(() => ({
    label: "Assurance Santé",
    value: "sante",
  }), []);

  const handleDevisClick = () => {
    const labelSlug = selectedProduct.label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    navigate(`/devis/${labelSlug}/${selectedProduct.value}`);
  };

  return (
    <section id="about" className=" bg-gray-50 overflow-x-hidden">
      <motion.div
        className="grid md:grid-cols-2 gap-4 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInLeft} className="flex justify-center items-center">
          <motion.div
            className="flex justify-center items-center"
            variants={scaleIn}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src="https://bestassurbrokers.com/assets/img/why-choose-us.png"
              alt="Insurance advisor team"
              className="h-48 sm:h-64 object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-white p-4 sm:p-8"
          variants={fadeInRight}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-xl sm:text-4xl md:text-3xl font-bold mb-12 text-gray-800 text-left"
            variants={fadeInUp}
          >
            Pourquoi choisir Best Digital Insurance Brokers ?
          </motion.h2>

          <motion.div
            className="flex flex-col"
            variants={staggerContainer}
          >
            {[
              "Expertise reconnue et conseils personnalisés",
              "Solutions innovantes adaptées à chaque profil",
              "Processus 100% digital et rapide",
              "Service client réactif et disponible",
            ].map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{
                  delay: 0.1 * (index + 1),
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <CheckCircle className="text-purple-600 w-5 h-5 mt-1 flex-shrink-0" />
                <motion.p
                  className="text-gray-700 text-md text-fon"
                  // initial={{ opacity: 0 }}
                  // whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1) + 0.1 }}
                >
                  {point}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <button
            onClick={() => {
              navigate("/about")
            }}
            className="mt-2 w-auto px-5 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-md transition"
          >
            En savoir plus
          </button>
        </motion.div>
      </motion.div>

      <div className="w-full bg-blue-700 py-16 px-6 flex flex-col items-center justify-center text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Prêt à protéger ce qui compte le plus ?
        </h2>

        <button
          onClick={handleDevisClick}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md"
        >
          Obtenez votre devis gratuit
        </button>
      </div>

      <div className="w-full  py-16 px-6 flex flex-col items-center justify-center  text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Prêt à protéger ce qui compte le plus ?
        </h2>

        <p className="text-md sm:text-md font-semibold mb-6">
          N'hésitez pas à nous contacter si vous souhaitez en savoir plus sur nos services ou pour toute autre demande d'assistance.
        </p>


        <button
          onClick={()=>{
            navigate("/contact")
          }}
          className="flex items-center gap-2 bg-red-700 text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
        >
          Nous contacter
        </button>
      </div>

    </section>
  );
};

export default AboutSection;
