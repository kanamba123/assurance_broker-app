import React, { useState, useRef, useEffect } from "react";
import { href, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { UserIcon, Languages, ShieldCloseIcon, Locate, LocateIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../constants";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const sidebarRef = useRef(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const langPopupRef = useRef(null);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navbarRef = useRef(null);
  const [navbarOffsetTop, setNavbarOffsetTop] = useState(null);

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


  useEffect(() => {
    if (!navbarRef.current) return;
    setNavbarOffsetTop(navbarRef.current.offsetTop);
  }, [navbarRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarOffsetTop === null) return;

      if (window.pageYOffset >= navbarOffsetTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarOffsetTop]);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
        setShowFixedNav(true);
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);



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
      label: t("navbar.contact"),
      href: "/contact",
    },
    {
      label: "Assurance en ligne",
      href: "/location",
    },
    {
      label: t("navbar.language"),
      lang: true,
    },
  ];


  const navItems2 = [
    {label :t('navbar.login'),
      href :"/login"
    },
    {
      label: "E-Partener",
      href: "epartener",
    },
    {
      label: "Nous contactez",
      href: "/contact",
    },
  ];


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBottomBar(scrollY > 50); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
    <div className="w-full relative  z-50 bg-white shadow-sm">

      <div className="block ">
        <div className="bg-primary  px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {showFixedNav && (
              <div className="z-40 transition-opacity duration-300 w-full ">
                <div className="mx-auto flex justify-between items-center px-4 text-sm">

                  {/* 📞 Gauche : numéro */}
                  <p className="text-white text-xl hidden sm:block">
                    📞 01 23 45 67 89
                  </p>

                  {/* Droite : navItems2 + bouton */}
                  <div className="flex items-center space-x-4">

                    {/* navItems2 */}
                    <div className="text-white hidden sm:flex items-center space-x-4">
                      {navItems2.map((item) => (

                        <NavLink key={item.href} to={item.href}>
                          {item.label}
                        </NavLink>

                      ))}

                    </div>

                    {/* Bouton */}
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-white text-xl bg-blue-500 py-2 px-5 rounded-lg hover:bg-blue-900 transition hidden sm:flex m-2"
                    >
                      Comparer vos assurances
                    </button>

                  </div>
                </div>
              </div>
            )}

          </div>
        </div>


        <div
          ref={navbarRef}
          className={`px-4 sm:px-6 lg:px-8 ${isFixed
            ? "relative top-0 left-0 right-0 z-50 bg-white shadow-md"
            : "relative left-0 right-0 z-50 bg-white shadow-md"
            }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
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
              <a href="/" className="flex items-center ">
                <img
                  src="https://bestassurbrokers.com/public/assets/img/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain bg-white rounded hidden sm:flex"
                />
                <span className="ml-2 text-lg font-bold text-primary">ASSURANCE BROKER</span>
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
                  ) : item.location ? (
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
                src="https://bestassurbrokers.com/public/assets/img/logo.png"
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