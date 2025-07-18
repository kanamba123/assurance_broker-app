import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaGlobe, FaCommentDots, FaEllipsisH } from "react-icons/fa";

function NavOptions() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState([
    { id: 1, label: "Se Connecter", icon: <FaUser />, path: "/login" },
    { id: 2, label: "Magasin DD-FB", icon: <FaShoppingCart />, path: "/dd_fb.main.html" },
    { id: 3, label: "Changer Langue", icon: <FaGlobe />, path: "", action: () => alert("Changer la langue") },
    { id: 4, label: "Chat / Call Me", icon: <FaCommentDots />, path: "/chat" },
  ]);
  const [hiddenLinks, setHiddenLinks] = useState([
    { id: 5, label: "Mes Commandes", icon: null, path: "/order" },
    { id: 6, label: "Panier", icon: <FaShoppingCart />, path: "/cart" },
  ]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Gère la visibilité du menu dropdown
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Fonction pour gérer la taille de la fenêtre
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Ajouter l'écouteur d'événements pour le redimensionnement
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Effectuer des actions basées sur la taille de la fenêtre
  useEffect(() => {
    if (windowWidth < 768) {
      // Si la largeur de la fenêtre est inférieure à 768px, masquez certains liens
      setVisibleLinks([
        { id: 1, label: "Se Connecter", icon: <FaUser />, path: "/login" },
        { id: 2, label: "Magasin DD-FB", icon: <FaShoppingCart />, path: "/dd_fb.main.html" },
        { id: 3, label: "Changer Langue", icon: <FaGlobe />, path: "", action: () => alert("Changer la langue") },
        { id: 4, label: "Chat / Call Me", icon: <FaCommentDots />, path: "/chat" },
      ]);
      setHiddenLinks([
        { id: 5, label: "Mes Commandes", icon: null, path: "/order" },
        { id: 6, label: "Panier", icon: <FaShoppingCart />, path: "/cart" },
      ]);
      setShowMore(true);
    } else {
      // Si la largeur de la fenêtre est supérieure à 768px, montrez tous les liens
      setVisibleLinks([
        { id: 1, label: "Se Connecter", icon: <FaUser />, path: "/login" },
        { id: 2, label: "Magasin DD-FB", icon: <FaShoppingCart />, path: "/dd_fb.main.html" },
        { id: 3, label: "Changer Langue", icon: <FaGlobe />, path: "", action: () => alert("Changer la langue") },
        { id: 4, label: "Chat / Call Me", icon: <FaCommentDots />, path: "/chat" },
        { id: 5, label: "Mes Commandes", icon: null, path: "/order" },
        { id: 6, label: "Panier", icon: <FaShoppingCart />, path: "/cart" },
      ]);
      setShowMore(false);
    }
  }, [windowWidth]); // Assurez-vous que l'effet est exécuté chaque fois que windowWidth change

  return (
    <div className="nav-options">
      <ul className="nav-options__list">
        {/* Lien visible */}
        {visibleLinks.map((link) => (
          <li key={link.id}>
            <Link
              to={link.path}
              className="nav-link"
              onClick={link.action ? link.action : null}
            >
              {link.icon && <span className="nav-icon">{link.icon}</span>} {link.label}
            </Link>
          </li>
        ))}

        {/* Icône de "Plus" et Dropdown */}
        {showMore && (
          <li className="nav-more">
            <button className="nav-more__button" onClick={toggleDropdown}>
              <FaEllipsisH />
            </button>
            {isDropdownVisible && (
              <ul className="nav-more__dropdown">
                {hiddenLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className="dropdown-item"
                      onClick={link.action ? link.action : null}
                    >
                      {link.icon && <span className="dropdown-icon">{link.icon}</span>} {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavOptions;
