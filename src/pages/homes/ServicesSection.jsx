// src/components/Sections/ServicesSection.jsx

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {  useCompanyProductsByPagination } from '../../hooks/api/useCompanyProduct';
import { useTranslation } from 'react-i18next';

const formatImageUrl = (path) => {
    if (!path) return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdAOY_-vITFVI-ej84s2U_ErxhOly-z3y_Q&s';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return `${import.meta.env.VITE_API_URL}${path}`;
    return `${import.meta.env.VITE_API_URL}/uploads/company_products/${path}`;
};

const ServicesSection = () => {
    const { data: companyProducts = [] } = useCompanyProductsByPagination();
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    data-aos="fade-up"
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
                >
                    {t('service.title', 'Nos Services')}
                </h2>

                {/* Container horizontal scroll on small screens */}
                <div
                    className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
                >


                    {companyProducts.map((service, index) => (
                        <div
                            key={service.id || index}
                            data-aos="fade-up"
                            className=" border border-gray-300 rounded-xl  transition duration-300 flex flex-col md:flex-row"
                        >
                            <div className="w-full md:w-1/3 h-48 md:h-48 overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none flex items-center justify-center">
                                <img
                                    src={formatImageUrl(service.logo_path)}
                                    alt={service.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow text-left">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {service.description}
                                </p>

                                <div className="text-sm text-gray-700 space-y-1">
                                    <p>
                                        <strong>💰 Prix :</strong> {parseFloat(service.base_price).toLocaleString()} FBU
                                    </p>
                                    {service.terms_conditions && (
                                        <p className="text-xs text-gray-500 italic">
                                            ⚖️ {service.terms_conditions}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
