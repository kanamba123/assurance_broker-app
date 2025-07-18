import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useClientsCategoris } from "../../hooks/api/useCientCategories";
import { ChevronDownIcon, UserIcon, Languages, ShieldCloseIcon, Locate, LocateIcon } from "lucide-react";
import { useCategoriesByCondition } from "../../hooks/api/useCategoriesService";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../constants";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: clients = [] } = useClientsCategoris();
  const { data: categoriesbyservices = [] } = useCategoriesByCondition("service");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const sidebarRef = useRef(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const langPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (showLangPopup && langPopupRef.current && !langPopupRef.current.contains(event.target)) {
        setShowLangPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen, showLangPopup]);

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  const navItems = [
    {
      label: t("navbar.home"),
      href: "/home",
    },
    {
      label: t("navbar.about"),
      href: "/about",
    },
    {
      label: t("navbar.ourProducts"),
      href: "/our_products",
    },
    {
      label: t("navbar.publications"),
      href: "/publications",
    },
    {
      label: t("navbar.contact"),
      href: "/contact",
    },
    {
      label: t("navbar.language"),
      lang: true,
    },
    {
      label: t("navbar.location"),
      href: "/location",
    },
    user
      ? {
        label: ` ${user?.name}` || t("navbar.account"),
        isUserMenu: true,
      }
      : {
        label: t("navbar.login"),
        isAuth: true,
      },
      {
      label: t("navbar.comparator"),
      href: "/location",
    },
  ];

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const renderDropdownContent = () => {
    const item = navItems.find((i) => i.label === openDropdown);
    if (!item) return null;

    if (item.submenu) {
      const isClientMenu = item.label === t("navbar.clients");
      const showLimit = 3;
      const totalItems = item.submenu.length;

      const submenuToRender = isClientMenu
        ? item.submenu.slice(0, showLimit)
        : item.submenu;

      const remainingCount = isClientMenu && totalItems > showLimit
        ? totalItems - showLimit
        : 0;

      return (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {submenuToRender.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-primary text-base font-semibold border-b pb-1">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group block transition"
                        onClick={() => setOpenDropdown(null)}
                      >

                        {link.description && (
                          <p className="text-md mt-1 text-gray-600 group-hover:text-primary group-hover:underline">
                            {link.description}
                          </p>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {remainingCount > 0 && (
            <div className="mt-4 text-sm">
              <a
                href="/clientCategorie"
                onClick={() => setOpenDropdown(null)}
                className="text-gray-500 italic hover:text-primary transition underline"
              >
                ...{remainingCount} {t("navbar.remaining")}
              </a>
            </div>
          )}
        </div>
      );
    }



    if (item.isUserMenu) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 md:bg-white md:rounded-lg md:shadow-lg md:w-64">
          <div className="bg-white rounded-lg w-full max-w-xs mx-4 md:mx-0 md:border md:border-gray-200">
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-2 rounded-full flex-shrink-0">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{user.name || user.email}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Utilisateur'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1 space-y-1">
              <NavLink
                to="/admin/dashboard/profile"
                className="flex items-center px-3 py-2 rounded text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                onClick={() => setOpenDropdown(null)}
              >
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon profil
              </NavLink>

              {user.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className="flex items-center px-3 py-2 rounded text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setOpenDropdown(null)}
                >
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dashboard
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const LangPopup = () => {
    if (!showLangPopup) return null;

    return (
      <div
        ref={langPopupRef}
        className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-50 w-40"
      >
        <div className="py-1">
          {LANGUAGES.map(({ code, label }) => (
            <li key={code}>
              <button
                onClick={() => {
                  i18n.changeLanguage(code);
                  localStorage.setItem('i18nextLng', code);
                  setShowLangDropdown(false);
                  setOpenDropdown(null);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${i18n.language === code ? "text-primary font-medium" : ""
                  }`}
              >
                {code === "fr" && "🇫🇷"} {code === "en" && "🇬🇧"} {label}
              </button>
            </li>
          ))}
        </div>
      </div>
    );
  };

  const AuthPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 md:bg-white md:rounded-lg md:shadow-lg md:w-64">
      <div className="bg-white rounded-lg w-full max-w-xs mx-4 md:mx-0 md:border md:border-gray-200">
        <button
          onClick={() => setShowAuthPopup(false)}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ShieldCloseIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>

        <div className="p-4 text-center">
          <h2 className="text-lg font-bold">Connexion</h2>
          <p className="text-xs mt-1">Accédez à votre compte</p>
        </div>

        <div className="p-4 space-y-2">
          <NavLink
            to="/login"
            className="flex items-center justify-center space-x-1 bg-secondary hover:bg-primary text-white text-sm font-medium py-1 px-3 rounded transition-colors"
            onClick={() => setShowAuthPopup(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Se connecter</span>
          </NavLink>

          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-xs">ou</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <NavLink
            to="/register"
            className="flex items-center justify-center space-x-1 border border-secondary text-secondary hover:bg-primary hover:text-white text-sm font-medium py-1 px-3 rounded transition-colors"
            onClick={() => setShowAuthPopup(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Créer un compte</span>
          </NavLink>
        </div>

        <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500">
            En continuant, vous acceptez nos{' '}
            <a href="/terms" className="text-primary hover:underline">
              conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-600 focus:outline-none mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <a href="/" className="flex items-center">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABC1BMVEUAAAD////m6e3/6qdp1vT813CpqanswZz/7anu8fXM0dlt3v3/8ayajWX/9K7/76q3qHjSwYo3MyT346JwZkkQISbYx44RERF5b0+Cd1XDxsm8oFRJSkuwsLDZ3OCYgkRjyufS0tI+P0BcXV9TVFW4ur18foDf4uU/gZNUq8MuXmtewNscOkImTViLjY+OdV45dIRXsMnftpNFOS4kJCWAaFTFoYKIdD1w5P8jIBfJzM9sbGz/4nYyMjMcHBwJExWGhoZRRiR6aTbRsl2pkEv20m5mVy1TTDaPg14tLS3EtIBgWD9zdnubm5sVLDIiRk+miG5rWEdQQjWJcFtNnLIxKCD7zabku5c0a3nDuCgJAAAHCUlEQVR4nO3de1vaSBQG8AgKpCBWpcXNaio3sa7FS9W1QdC9dLdW3AVb6X7/T7LIzCSZcAjkcWYyxPP+Z+Zg8mMSSCYhMZaSHiPuBZAeFMqJtZMRm0Zq6rxiEFbahoR0dqbMTr3wRoZvbGyC81MurMsCjlKBZqhaWJMINAyoFxULM1KBRjV+YVmu0GjELdxhS/LbO6H5nf3fTtxCthX+cbUiNFcrf9H/bMYspIvxp2DgKJ/pv7b0EH4WDlxhnTi5IcYiFN+FKyu/ohCFKEQhClGIwuQLr/QS/iwhOuy1WVJGoIKp3gcOL5QJM7IPfr20ucEMRUKno8z3lJZy4b1S3yhVb1VVItxTDTSMsrumqhDGADSMLutFBUL/COJG6SeJ2frbNys2sihf2HTnWV7dzK0VZCaX/nrnzq6lSrjN5vglPVoC2ckV1z+xGdpqhBab3+uidN44a5sbdI5tNcKaYuCoGzdZLzZVCNlWuFVQBRz14rp/S5QtZB+km/I3QS/FEpnprQoh3dsuKVtHn5JjnWgqEN6SWX1V2YWjTqRCR4EwjpU0nS7Qb8UddUK1wHThC5ltRp1Q6WY4Eq6iUJYwF5K0wJI5hM2KoHDC3HpI6NK/DSnZnLdkDqEhOERYCCshy1b8FFLydtxFhbuQktdr8wmFjzrML9wIKaHCUkjJvELh42K6CcUPHOkmPItOmBHNhBLG/jQT0q2wWxcQUFjjAgrrXMkZJNzmSjoRhOyQrmW/em7sV6DQ9Ie9obzQ5mrqkNDiSm4iCOlidJ/tewosTPliwkKuBBQ2/P/G3JtfyLbCVmKFXZFdqKPQ3QoTK6RdeCsGqJ2w2WRbYa8hJloJK206bCQhOgib7vmFhArdK7CTKpQMjF/IBhuSK5R+pUR0oSlU6K2j1W3BAYW244sNCq2Kv2QbEma4knaosErn3HZSpuCAQjAyjw/ZYrS5tUdM9BCyHQ/xPl2EdGdbRhfqJWwlV0g/SuvJFTq01Z69wGKEVS6gkC8pQ8IOV3IWJmQjMzVVn6VLEUeilp49EsUG9DLiiaBQ/V6bu1sqfj3VRMiuCZHwYaOL0L1+UPh6qovQuwZU9HqqjdC91UG9aQuNPkL2ZkuKBkLJdzvQQSj3jhVaCKWup1oIpf7sQw+hzBFFrYTXb6DMbjPC2nhhqulLChQ6XAks5EoiCPcv8xO5PCFtB0Bbfpe0HUJteVAIRsGVCkyYX57MeyqE2n6hQqhtGYUoRCEKYxKWuYBCsIQXgiWaCNWPRKkWxrxPg0IUohCFKEQhClGIwoUQQuMtYsdpzIh73qJ+jaBuNBGMuuNDKUGhgcJxUGigMPqCzx2thMn/PnwB+zQoRCEKUYhCFKIQhShE4VOSfw44+efxwSTqWgwUohCFL/760uRfIywlWu3ToBCFKEShfOHxLpDvpO1gGWij35WHUNuujkJonyaPR8AoRCEKF02Y/JEo9fc2US0Eg8f4KEQhClEYSaj+vok67tOIvfeljsLF3mtDIQqfK1RwfalqYYM8LoPu5P/zAcghaXsDtf1L2q6htg96COXeIgqFKEQhCuMRqv41AhX2HEt8QKHy5z3Juxe0qcmdkpN/t2sUohCFkYRSnkOqTBjbs2SVCWN7HrA6oaqgEIWJEtId91mO6WW8sCA9uUhCM+Xc77Xbvb2MkwpBmrbV6o3KWg17EskJC6UtySmt5+YXmvaN9yiv6n1zitG0al23rLYTrOKFhvTM/41vssuK3dxDRLMSeKhgx+LL6GT9hKbVnXhx1Z4wmsA9wG8WQmiCV2J2nSCxB5XVFkBoNuCXl3miCQL5J53QSboJnWmvP2vOWEVJeqbuwqr7gsfzfr8/8I5o/E8u870PD9/6/aMH72/vI5VO4IXvodCfZnwHG0noGZJ9qO0ggtDrm8eL7DCbzQ5/9NnP+wzL60L3fRhcPFVlh6fnbMpteB9C5+EuqXAXPEk3Tp4qTqBrfI+j9CHjDLJuTh/ptG23d9xtte9WDS/YNPeJPHML80w4Fbicp2eyTqC2CEKTDRD7gKOwNdVhXcieTNMf+qoYsau1kH6Hlzmgu+w3dNnZM3IGfmB2+C3wRmgpZH3DC7MDMpmupu4XymmgjE5me0A6CtlAfGDJWSd2yTkTdp5gECyjnzY1fYVsd+ZjcNFP6X4cWf9MerrhKFjWJ9M7GgszUzon+xESXky8EWT6mf7C82Fg0Ye8sL74wuCiDxPXhyhEIQpRiEIUojChwnFm7bVVSBkTBsqGP5iQnMlgwvFJhSL9C7rW1hvFmJpLdxQDCBOO51SEhfXWOPSHCw9HwdCBjD1SRkf8z4NV9BC4TKpa1LRKQv/ah3JN2o7BRhJ6He9/UBsdpSqRGd2BwgQGhYsfFC5+Xo6wkklqKvxvZhIaFC5+/geGYozKDKVB5gAAAABJRU5ErkJggg=="
                alt="Logo"
                width={40}
                height={40}
                className="object-contain bg-white rounded"
              />
              <span className="ml-2 text-lg font-bold text-primary hidden sm:inline">ASSURANCE BROKER</span>
            </a>
          </div>

          {/* Navigation desktop */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
                onMouseLeave={() => item.submenu && handleMouseLeave()}
              >
                {item.isAuth ? (
                  <button
                    onClick={() => setShowAuthPopup(true)}
                    className="flex items-center hover:text-secondary text-sm lg:text-base"
                  >
                    <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                    {item.label}
                  </button>
                ) : item.isUserMenu ? (
                  <button
                    onClick={() => handleMouseEnter(item.label)}
                    className="flex items-center hover:text-primary text-sm lg:text-base"
                  >
                    <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                    <span>{item.label}</span>
                  </button>
                ) : item.lang ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowLangPopup(!showLangPopup)}
                      className="flex items-center hover:text-primary text-sm lg:text-base"
                    >
                      <Languages className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                      <span>{item.label}</span>
                    </button>
                    <LangPopup />
                  </div>
                ) :  item.location ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowLangPopup(!showLangPopup)}
                      className="flex items-center hover:text-primary text-sm lg:text-base"
                    >
                      <LocateIcon className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                      <span>{item.label}</span>
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `hover:text-primary text-sm lg:text-base ${isActive ? "text-primary font-medium" : "text-gray-700"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Dropdown desktop */}
        {openDropdown && (
          <div
            className="absolute left-0 w-full bg-white shadow-lg z-40 border-t border-gray-100"
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              {renderDropdownContent()}
            </div>
          </div>
        )}

      </div>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
        <div
          ref={sidebarRef}
          className="relative w-72 sm:w-80 h-full bg-white shadow-xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <a href="/" className="flex items-center">
              <img
                src="https://static.wixstatic.com/media/591562_e80aea7a733d400da8350fbfb583107b~mv2.png/v1/fill/w_96,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/591562_e80aea7a733d400da8350fbfb583107b~mv2.png"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain bg-white rounded"
              />
              <span className="ml-2 text-lg font-bold text-primary">GISA ANALYTICA</span>
            </a>
            <button
              className="text-gray-500 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="h-[calc(100%-60px)] overflow-y-auto">
            <ul className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const hasSubmenu = !!item.submenu;
                const isLang = item.lang;

                return (
                  <li key={item.label} className="border-b border-gray-100 last:border-0">
                    {item.href ? (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50 ${isActive ? "bg-gray-50 font-medium" : ""}`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          {item.label === "Connexion" && (
                            <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                          )}
                          <span>{item.label}</span>
                        </div>
                        {(hasSubmenu || isLang) && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </NavLink>
                    ) : isLang ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <Languages className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{item.label}</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="pl-4">
                          {LANGUAGES.map(({ code, label }) => (
                            <button
                              key={code}
                              onClick={() => {
                                i18n.changeLanguage(code);
                                setMobileMenuOpen(false);
                              }}
                              className={`block w-full px-3 py-2 text-left text-sm rounded ${i18n.language === code
                                ? "text-primary font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={() => item.isAuth ? setShowAuthPopup(true) : null}
                      >
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    )}

                    {hasSubmenu && !isLang && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.submenu.map((section) => (
                          <li key={section.title} className="border-l border-gray-200 pl-3">
                            <h4 className="text-sm font-medium text-primary px-2 py-1">{section.title}</h4>
                            <ul className="space-y-1">
                              {section.links.map((link) => (
                                <li key={link.href}>
                                  <NavLink
                                    to={link.href}
                                    className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {link.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Auth Popup */}
      {showAuthPopup && <AuthPopup />}
    </div>
  );
};

export default Navbar;