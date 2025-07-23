
import { motion } from "framer-motion";

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

const AboutSection = () => (
  <section id="about" className="py-20 bg-gray-50 overflow-x-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
          variants={fadeInUp}
        >
          Who We Are at BestBrokers
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu Gauche */}
          <motion.div variants={fadeInLeft}>
            <motion.h3
              className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800"
              variants={fadeInUp}
            >
              Expertise & Trust at Your Service
            </motion.h3>

            <motion.p
              className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              At BestBrokers, we connect individuals and businesses with the best insurance solutions tailored to their needs. Our mission is to make insurance simple, transparent, and accessible to everyone.
            </motion.p>

            <motion.p
              className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              Whether it's health, auto, property, or life insurance, our experts guide you every step of the way to ensure you’re always protected with confidence.
            </motion.p>

            <motion.div
              className="rounded-2xl overflow-hidden shadow-lg relative max-w-full"
              variants={scaleIn}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1588776814546-ec7e3588c9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Insurance advisor team"
                className="w-full h-48 sm:h-64 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 opacity-0"
                whileHover={{ opacity: 1, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-gray-800">
                  Your Trusted Advisors
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Statistiques à droite */}
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
            variants={fadeInRight}
            whileHover={{
              scale: 1.02,
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { number: "1,200+", label: "Happy Clients", delay: 0.1 },
                { number: "99%", label: "Claims Success Rate", delay: 0.2 },
                { number: "10+", label: "Years of Expertise", delay: 0.3 },
                { number: "50+", label: "Insurance Partners", delay: 0.4 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{
                    delay: stat.delay,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: stat.delay,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.p
                    className="text-gray-600 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: stat.delay + 0.2 }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
