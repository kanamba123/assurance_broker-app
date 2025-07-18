import axios from "axios";
import config from "../config/config";


const api = axios.create({
  baseURL: config.API_BASE_URL,
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Pas de refresh token");

        const response = await axios.post(`${config.API_BASE_URL}/refresh-token`, {
          refresh_token: refreshToken,
        });

        const { token: newToken, refresh_token: newRefreshToken } = response.data;

        localStorage.setItem("authToken", newToken);
        if (newRefreshToken) localStorage.setItem("refresh_token", newRefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return api(originalRequest); 
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
