
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userString = localStorage.getItem("user");
        
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }

        const user = JSON.parse(userString);
        
        if (!allowedRoles.includes(user.role)) {
          navigate('/unauthorized', { replace: true });
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        localStorage.clear();
        navigate('/login', { replace: true });
      }
    };

    verifyAuth();
  }, [navigate, allowedRoles]);

  if (isAuthenticated === null) {
    return <div>Chargement...</div>; // Ou un spinner
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;