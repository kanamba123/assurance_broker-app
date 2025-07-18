import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/api";
import config from "../../config/config";

// Récupérer tous les users
const fetchUsers = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

// Récupérer les détails d'un user
const fetchUserDetails = async (userId) => {
  const response = await api.get(`${config.API_BASE_URL}/users/${userId}`);
  return response.data;
};

// Ajouter un nouvel user
const addUser = async (newUser) => {
  const response = await api.post(`${config.API_BASE_URL}/users`, newUser);
  return response.data;
};

// s'enregistrer 
const subscribeUser = async (newUser) => {
  const response = await api.post(`${config.API_BASE_URL}/register`, newUser);
  return response.data;
};

// Mettre à jour un user existant
const updateUser = async ({ userId, userData }) => {
  const response = await api.put(`${config.API_BASE_URL}/users/${userId}`, userData);
  return response.data;
};

// Supprimer un user
const deleteUser = async (userId) => {
  const response = await api.delete(`${config.API_BASE_URL}/users/${userId}`);
  return response.data;
};

// Récupérer les boutiques par user
const fetchShopsByUser = async (userId) => {
  const response = await api.get(`${config.API_BASE_URL}/users/${userId}/boutiques`);
  return response.data;
};

// Exporter les hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useUserDetails = (userId) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUserDetails(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout d'un users:", error);
    }
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscribeUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout d'un users:", error);
    }
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour d'un user:", error);
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression d'un user:", error);
    }
  });
};

export const useShopsByUser = (userId) => {
  return useQuery({
    queryKey: ["users", userId, "boutiques"],
    queryFn: () => fetchShopsByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Fonctions utilitaires
export const getUserRoles = () => {
  return [
    { value: 'admin', label: 'Administrateur' },
    { value: 'user', label: 'user standard' },
    { value: 'editor', label: 'Éditeur' }
  ];
};

export const getUserStatuses = () => {
  return [
    { value: 'actif', label: 'Actif' },
    { value: 'inactif', label: 'Inactif' },
    { value: 'en_attente', label: 'En attente' }
  ];
};