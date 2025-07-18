// src/components/NavMenuWebSite/Header/NavLinks.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavLinks() {
  const [ setIsPopupOpen] = useState(false); // Gérer l'état de la modale
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Gérer l'état du menu déroulant

  // Ouvre le menu au survol
  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  // Ferme le menu lorsqu'on quitte la zone
  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  // Ouvre la modale
  const openPopup = () => {
    setIsPopupOpen(true);
  };

 
  return (
    <ul className="nav-links">
      {/* Menu déroulant pour "Legal compliance list" */}
      <li className="nav-item dropdown">
        <Link to="#" className="nav-link">
          Legal compliance list
        </Link>
        <ul className="dropdown-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/privacy-policy" className="nav-link">
              Politique de Confidentialité
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/terms-of-service" className="nav-link">
              Conditions d'Utilisation
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cookie-policy" className="nav-link">
              Politique de Cookies
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/legal-notice" className="nav-link">
              Mentions Légales
            </Link>
          </li>
        </ul>
      </li>

      {/* Menu déroulant pour "Contact" */}
      <li
        className="nav-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        <Link to="/contact" className="nav-link">
          Contact
        </Link>

        {isMenuOpen && (
          <div className="dropdown-menu">
           
          </div>
        )}
      </li>

      {/* Menu déroulant pour "Plus" */}
      <li className="nav-item dropdown">
        <Link to="#" className="nav-link" onClick={openPopup}>
          Plus
        </Link>
        <ul className="dropdown-menu">
          {/* Le popup sera affiché ici lorsque l'on clique sur "Plus" */}
          {/* <FullScreenPopup
            isOpen={isPopupOpen}
            onClose={closePopup}
          /> */}
          <li className="nav-item">
            <Link to="/about" className="dropdown-item">
              À propos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="dropdown-item">
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/terms" className="dropdown-item">
              Conditions
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default NavLinks;
