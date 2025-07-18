import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Intercepteur réponse pour gérer expiration du token
API.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('Pas de refresh token');

        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/refresh-token`, {
          refresh_token: refreshToken,
        });

        const { token: newToken, refresh_token: newRefreshToken } = response.data;

        localStorage.setItem('authToken', newToken);
        if (newRefreshToken) localStorage.setItem('refresh_token', newRefreshToken);

        // Réessaye la requête échouée
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
