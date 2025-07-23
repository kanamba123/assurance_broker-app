import React, { useEffect, useState } from "react";
import AOS from "aos";
import {
    MapPin,
    Mail,
    Phone,
    Clock,
    Globe,
} from "lucide-react";
import "aos/dist/aos.css";

import logo from "../../assets/FlayerIco/logo.png";
import background from "../../assets/FlayerIco/H4d60de7afe6749cbbe44e22f4356acabH.avif";

import img1 from "../../assets/FlayerIco/relic.jpg";
import img2 from "../../assets/FlayerIco/agico.jpg";
import img3 from "../../assets/FlayerIco/bicvie.jpg";
import img4 from "../../assets/FlayerIco/Ucarvie.jpg";
import img5 from "../../assets/FlayerIco/socarvie.jpg";
import img6 from "../../assets/FlayerIco/bicor.jpg";
import img7 from "../../assets/FlayerIco/egicvie.jpg";
import img8 from "../../assets/FlayerIco/egicnonvie.jpg";
import img9 from "../../assets/FlayerIco/inkinzovie.jpg";
import img10 from "../../assets/FlayerIco/avia.jpg";

const FlayerLogo = () => {
    const [visibleImages, setVisibleImages] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        });

        const updateImages = () => {
            const isMobile = window.innerWidth < 768;
            const maxImages = isMobile ? 8 : 9;
            const allImages = [
                { src: img1, link: "https://site1.com" },
                { src: img2, link: "https://www.agico.bi" },
                { src: img3, link: "https://www.bicvie.com" },
                { src: img4, link: "https://www.ucar-vie.com" },
                { src: img5, link: "https://www.socarvie.bi" },
                { src: img6, link: "https://wwww.bicor.bi" },
                { src: img7, link: "https://www.egicvie.bi" },
                { src: img8, link: "https://www.egic.bi" },
                { src: img9, link: "https://www.inkinzovie.com" },
                { src: img10, link: "https://www.avia.bi" },
            ];
            setVisibleImages(allImages.slice(0, maxImages));
        };

        updateImages();
        window.addEventListener("resize", updateImages);
        return () => window.removeEventListener("resize", updateImages);
    }, []);

    return (
        <section className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-4">

            {/* Colonne 1 : Contact */}
            <div
                className="flex-1 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 rounded-xl shadow-md"
                data-aos="fade-right"
            >
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>

                <div className="space-y-5 text-lg">
                    <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-white mt-1" />
                        <p>
                            Chaussée du peuple murundi,<br />
                            Jabe, Bujumbura, Burundi
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-white" />
                        <p>contact@bestassurbrokers.com</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-white" />
                        <p>(+257) 69 19 00 84 / (+257) 68 25 03 83</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Clock className="w-6 h-6 text-white" />
                        <p>Lun – Ven : 08h00 – 17h30</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Globe className="w-6 h-6 text-white" />
                        <a
                            href="https://bestassurbrokers.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gray-300"
                        >
                            www.bestassurbrokers.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Colonne 2 : Images */}
            <div
                className="flex-[2] bg-white p-6 rounded-xl shadow-md"
                data-aos="zoom-in"
                id="contact"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <>
                    <div>
                        <h1 className="text-2xl font-bold mb-6 text-white">
                            Best Digital Insurance Brokers
                        </h1>
                        <h2 className="text-2xl font-bold mb-6 text-gray-300">
                            Votre assistant en assurance 24h/24h
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {visibleImages.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full aspect-[4/3] overflow-hidden rounded-xl transform transition hover:scale-105 hover:shadow-xl"
                                data-aos="flip-up"
                                data-aos-delay={idx * 100}
                            >
                                <img
                                    src={item.src}
                                    alt={`Flayer ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        ))}
                    </div>
                </>
            </div>

            {/* Colonne 3 : Logo */}
            <div
                className="flex-1 flex items-center justify-center bg-black rounded-xl shadow-md p-4"
                data-aos="fade-left"
            >
                <img src={logo} alt="Logo entreprise" className="h-50 object-contain" />
            </div>
        </section>
    );
};

export default FlayerLogo;
