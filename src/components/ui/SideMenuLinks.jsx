import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/ui/SideMenuLinks.css";

function SideMenuLinks() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Gérer l'état des dropdowns ouverts

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav>
      <ul className="nav-links">
        <li className="nav-item dropdown">
          <button
            className="nav-link"
            onClick={() => toggleDropdown(0)}
            aria-expanded={activeDropdown === 0}
          >
            Legal compliance list
          </button>
          <ul className={`dropdown-menu ${activeDropdown === 0 ? "open" : ""}`}>
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

        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>

        <li className="nav-item">
          <button className="nav-link" onClick={togglePopup}>
            Plus
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/about" className="dropdown-item">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/faq" className="dropdown-item">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/terms" className="dropdown-item">
                Conditions
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default SideMenuLinks;
