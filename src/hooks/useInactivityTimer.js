// useInactivityTimer.js
import { useEffect } from 'react';

export const useInactivityTimer = (logout, timeout = 15 * 60 * 1000, warningTime = 5 * 60 * 1000) => {
  useEffect(() => {
    let inactivityTimer;
    let warningTimer;

    const resetTimers = () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      
      // Timer pour l'avertissement
    //   warningTimer = setTimeout(() => {
    //     alert(`Vous serez déconnecté dans ${warningTime / 60000} minutes pour inactivité.`);
    //   }, timeout - warningTime);
      
      // Timer pour la déconnexion
      inactivityTimer = setTimeout(() => {
        logout();
      }, timeout);
    };

    // Événements à surveiller
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    // Initialiser les timers
    resetTimers();

    // Ajouter les écouteurs d'événements
    events.forEach(event => {
      window.addEventListener(event, resetTimers);
    });

    // Nettoyage
    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetTimers);
      });
    };
  }, [logout, timeout, warningTime]);
};