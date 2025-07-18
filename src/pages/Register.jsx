import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {  useRegister } from "../hooks/api/useUsers";

const Register = () => {

  const useAddUserMut = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    useAddUserMut.mutate({
      name,
      email,
      password,
      role:"user"
    }), {
      onSuccess: () => {
        setSuccess("Votre compte a été créé avec succès !");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }, onError: (error) => {
        if (err.response && err.response.data) {
          setError("Erreur lors de l'inscription : " + JSON.stringify(err.response.data.errors));
        } else {
          setError("Erreur inattendue.");
        }
        console.log("Erreur :", err)
      }

    }
  };



  const handleGoogleRegister = () => {
    alert("Inscription avec Google (à implémenter)");
  };

  const handleFacebookRegister = () => {
    alert("Inscription avec Facebook (à implémenter)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-4 py-8 sm:py-12">
      <div className="w-full max-w-md  p-8 sm:p-10 rounded-3xl shadow-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-400">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-secondary">
              Se connecter
            </Link>
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={handleGoogleRegister}
            className="flex items-center justify-center w-full py-3 px-4 border border-gray-700 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-3 text-2xl" />
            S'inscrire avec Google
          </button>

          <button
            onClick={handleFacebookRegister}
            className="flex items-center justify-center w-full py-3 px-4 border border-gray-700 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            <FaFacebook className="mr-3 text-2xl" />
            S'inscrire avec Facebook
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">ou</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium  mb-1">
              Nom d'utilisateur
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-secondary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-secondary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium  mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-secondary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium  mb-1">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg  border border-secondary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition"
            >
              S&apos;inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
