import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import config from "../config/config";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError(t("login.fill_all_fields"));
      return;
    }

    try {
      const response = await axios.post(`${config.API_BASE_URL}/login`, {
        email,
        password,
      });

      const token = response.data.token;
      const refreshToken = response.data.refresh_token;
      const user = response.data.user;

      if (!token || !refreshToken || !user) {
        setError(t("login.invalid_server_response"));
        return;
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "assistant":
          navigate("/assistant/dashboard");
          break;
        case "client":
          navigate("/client/dashboard");
          navigate("/home");
          break;
        case "expert":
          navigate("/expert/dashboard");
          break;
        default:
          navigate("/");
      }

    } catch (err) {
      console.error("Erreur de connexion:", err);
      if (err.response?.status === 401) {
        setError(t("login.invalid_credentials"));
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(t("login.unknown_error"));
      }
    }
  };

  const handleGoogleLogin = () => {
    alert(t("login.google_auth_placeholder"));
  };

  const handleFacebookLogin = () => {
    alert(t("login.facebook_auth_placeholder"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-8 sm:p-10 rounded-3xl shadow-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">{t("login.title")}</h2>
          <p className="mt-2 text-sm text-gray-400">
            {t("login.no_account")}{" "}
            <Link to="/register" className="font-medium text-primary hover:text-secondary">
              {t("login.register_link")}
            </Link>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              {t("login.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              {t("login.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-2 rounded-lg text-white bg-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
            >
              {t("login.submit")}
            </button>
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">{t("login.or")}</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 px-2 border border-gray-700 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-3 text-2xl" />
            {t("login.continue_with_google")}
          </button>

          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full py-2 px-2 border border-gray-700 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            <FaFacebook className="mr-3 text-2xl" />
            {t("login.continue_with_facebook")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
