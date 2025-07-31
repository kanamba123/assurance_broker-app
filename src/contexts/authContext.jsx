import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// Durées en millisecondes
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIMEOUT = 5 * 60 * 1000; // Avertir 5 minutes avant

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem("authToken");
    const initialUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const [token, setToken] = useState(initialToken);
    const [user, setUser] = useState(initialUser);
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
    const [showWarning, setShowWarning] = useState(false);

    // Fonction de login
    const login = async (newToken, newUser) => {
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        startInactivityTimer(); // Démarrer le timer après login

        // 🔔 Notifier toute l'application (événement personnalisé)
        window.dispatchEvent(new CustomEvent("app-login", {
            detail: { token: newToken, user: newUser }
        }));

        // 🔁 (Facultatif) Synchronisation cross-onglet via localStorage
        localStorage.setItem("login-event", Date.now()); // délenche storage event dans autres onglets

        return newUser;
    };


    // Fonction de logout
    const logout = useCallback(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setShowWarning(false);

        window.dispatchEvent(new Event("app-logout"));

        window.location.reload();
    }, []);


    // Détection d'inactivité
    const startInactivityTimer = useCallback(() => {
        let inactivityTimer;
        let warningTimer;

        const resetTimers = () => {
            // Réinitialiser les timers
            clearTimeout(warningTimer);
            clearTimeout(inactivityTimer);
            setShowWarning(false);

            // Configurer le timer d'avertissement
            warningTimer = setTimeout(() => {
                setShowWarning(true);
            }, INACTIVITY_TIMEOUT - WARNING_TIMEOUT);

            // Configurer le timer de déconnexion
            inactivityTimer = setTimeout(() => {
                logout();
            }, INACTIVITY_TIMEOUT);
        };

        // Événements à surveiller
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

        // Initialiser
        resetTimers();

        // Ajouter les écouteurs
        events.forEach(event => {
            window.addEventListener(event, resetTimers);
        });

        // Nettoyage
        return () => {
            clearTimeout(warningTimer);
            clearTimeout(inactivityTimer);
            events.forEach(event => {
                window.removeEventListener(event, resetTimers);
            });
        };
    }, [logout]);

    // Démarrer le timer au montage et quand l'authentification change
    useEffect(() => {
        if (isAuthenticated) {
            const cleanup = startInactivityTimer();
            return cleanup; // Nettoyer à la suppression
        }
    }, [isAuthenticated, startInactivityTimer]);

    // Vérifier la validité du token au chargement
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await fetch('/api/verify-token', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (!response.ok) throw new Error('Token invalide');
                } catch (error) {
                    logout();
                }
            }
        };
        verifyToken();
    }, [token, logout]);

    const authContextValue = {
        isAuthenticated,
        token,
        user,
        login,
        logout,
        showWarning
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};