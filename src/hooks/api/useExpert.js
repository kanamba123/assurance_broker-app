import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/api";
import config from "../../config/config";

// Récupérer tous les experts
const fetchExperts = async () => {
  const response = await api.get(`/experts`);
  return response.data;
};

// Récupérer les détails d'un expert
const fetchExpertDetails = async (expertId) => {
  const response = await api.get(`/experts/${expertId}`);
  return response.data;
};

// Ajouter un nouvel expert
const addExpert = async (newExpert) => {
  const response = await api.post(`/experts`, newExpert);
  return response.data;
};

// Modifier un expert existant
const updateExpert = async ({ id, data }) => {
  const response = await api.put(`/experts/${id}`, data);
  return response.data;
};

// Supprimer un expert
const deleteExpert = async (expertId) => {
  const response = await api.delete(`/experts/${expertId}`);
  return response.data;
};

// Hook pour récupérer tous les experts
export const useExperts = () => {
  return useQuery({
    queryKey: ["experts"],
    queryFn: fetchExperts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook pour récupérer les détails d'un expert
export const useExpertDetails = (expertId) => {
  return useQuery({
    queryKey: ["experts", expertId],
    queryFn: () => fetchExpertDetails(expertId),
    enabled: !!expertId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook pour ajouter un expert
export const useAddExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpert,
    onSuccess: () => {
      queryClient.invalidateQueries(["experts"]);
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout de l'expert:", error);
    }
  });
};

// Hook pour modifier un expert
export const useUpdateExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpert,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["experts"]);
      queryClient.invalidateQueries(["experts", variables.id]);
    },
    onError: (error) => {
      console.error("Erreur lors de la modification de l'expert:", error);
    }
  });
};

// Hook pour supprimer un expert
export const useDeleteExpert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpert,
    onSuccess: () => {
      queryClient.invalidateQueries(["experts"]);
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de l'expert:", error);
    }
  });
};

// Hook pour les boutiques par expert (si toujours nécessaire)
export const useShopsByExpert = (expertId) => {
  return useQuery({
    queryKey: ["experts", expertId, "shops"],
    queryFn: () => fetchExpertDetails(expertId).then(data => data.shops || []),
    enabled: !!expertId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};