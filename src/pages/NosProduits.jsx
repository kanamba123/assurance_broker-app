// src/components/Sections/ServicesSection.jsx

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCompanyProductsByInfinityPagination } from '../hooks/api/useCompanyProduct';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import QuoteBox from '../components/ui/QuoteBox';
import { Scale } from 'lucide-react';

const formatImageUrl = (path) => {
    if (!path) return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdAOY_-vITFVI-ej84s2U_ErxhOly-z3y_Q&s';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return `${import.meta.env.VITE_API_URL}${path}`;
    return `${import.meta.env.VITE_API_URL}/uploads/company_products/${path}`;
};

const NosProduits = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useCompanyProductsByInfinityPagination();
    const { t } = useTranslation();
    const loaderRef = useRef();


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

    const companyProducts = data?.pages?.flatMap(page => page.items ?? []) || [];


    console.log("Produit ", companyProducts)



    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };


    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    return (
        <section id="services" className=" bg-gray-100">

            <section
                id="contact"
                className="relative py-20 bg-cover bg-center bg-no-repeat text-primary"
                style={{
                    backgroundImage:
                        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrglL6RLn_6Se_Z-5TYswUtifJqBIKcG3MA&s')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

                {/* Contenu */}
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-8 text-primary"
                            variants={fadeInUp}
                        >
                            Prêt à protéger ce qui compte le plus ?
                        </motion.h2>

                        <motion.button
                            className="text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300 border border-primary"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Obtenez votre devis gratuit
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <section
                id="contact"
                className="relative bg-cover bg-gray-300 bg-center bg-no-repeat  py-10"

            >
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

                <div className="relative mx-auto px-4 sm:px-6 lg:px-20 text-center">
                    <motion.div
                        className="flex flex-col md:flex-row w-auto items-center text-center md:text-left gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div className="flex-1">
                            <motion.h2
                                className="text-3xl md:text-3xl font-bold mb-4"
                                variants={fadeInUp}
                            >
                                Trouvez la meilleure assurance pour vous
                            </motion.h2>
                            <motion.h2
                                className="text-base md:text-xl font-normal text-gray-400 max-w-2xl"
                                variants={fadeInUp}
                            >
                                Comparez rapidement les offres des meilleures compagnies d’assurance du marché. Choisissez celle qui correspond à vos besoins et à votre budget.
                            </motion.h2>
                        </motion.div>

                        <div className="w-full md:w-auto flex justify-end">
                            <motion.button
                                className="flex gap-1 items-end text-white whitespace-nowrap px-6 py-3 font-semibold bg-blue-500 rounded-xl transition-all duration-300"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Comparer maintenant <Scale />
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=' my-12'>
                    <h2
                        data-aos="fade-up"
                        className="text-3xl md:text-3xl font-bold text-center text-gray-800"
                    >
                        {t('service.titl', 'Nos produits d\'Assurance')}
                    </h2>
                    <p>
                        Découvrez nos offres d’assurance adaptées à vos besoins
                    </p>
                </div>


                <div className="block space-y-1 md:flex md:space-x-1 md:space-y-0">
                    <div
                        className="gap-1 overflow-x-auto pb-4 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible "
                    >
                        {companyProducts.map((service, index) => (
                            <motion.div
                                key={service.id || index}
                                data-aos="fade-up"
                                className="border border-gray-300 rounded-sm overflow-hidden bg-white 
    transform transition-transform duration-700 ease-in-out 
    hover:scale-[1.03] hover:shadow-lg"
                            >
                                <div>
                                    <img
                                        src={formatImageUrl(service.logo_path)}
                                        alt={service.name}
                                        className="object-contain max-h-full bg-cover"
                                    />
                                </div>

                                <div className="sm:p-5 space-y-2 text-gray-800">
                                    <h3 className="text-1xl sm:text-lg font-semibold items-center">
                                        {service.name}
                                    </h3>
                                    <p className="text-md gap-1 leading-relaxed">
                                        <strong>Prix :</strong> {parseFloat(service.base_price).toLocaleString()} FBU
                                    </p>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div>
                                        <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 text-white">
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                        ))}

                    </div>
                    <section className=" bg-gray-50">
                        <QuoteBox />
                    </section>
                </div>
                <div ref={loaderRef} className="h-4"></div>

                {isFetchingNextPage && (
                    <p className="text-center text-gray-500 col-span-full">Chargement...</p>
                )}
            </div>




        </section>
    );
};

export default NosProduits;
