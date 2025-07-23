import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { label: "Particuliers", href: `/products/particuliers` },
    { label: "Entreprises", href: `/products/entreprises`},
    // { label: "Life Insurance", href: "/products/life" },
    // { label: "Property Insurance", href: "/products/property" },
];

const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

const ProdPopup = ({ label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

    const handleClick = (href) => {
        setIsOpen(false);
        navigate(href); 
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative inline-block"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center hover:text-primary text-sm lg:text-base transition-colors duration-300"
                type="button"
            >
                <span>{label}</span>
                <ChevronDown
                    className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="popup"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-50 w-48 origin-top-right"
                    >
                        <ul className="py-1">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleClick(item.href)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                        type="button"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProdPopup;
