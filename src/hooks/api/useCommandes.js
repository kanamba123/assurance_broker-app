import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

// Fonctions d'API pour les commandes
const fetchCommandes = async () => {
  const response = await api.get('/commandes');
  return response.data;
};

const fetchCommandeDetail = async (commandeId) => {
  const response = await api.get(`/commandes/${commandeId}`);
  return response.data;
};

const createCommande = async (bienId) => {
  const response = await api.post('/commandes', { bien_id: bienId });
  return response.data;
};

const updateCommandeStatut = async ({ id, statut }) => {
  const response = await api.put(`/commandes/${id}/statut`, { statut });
  return response.data;
};

// Hooks pour les commandes
export const useCommandes = () => {
  return useQuery({
    queryKey: ['commandes'],
    queryFn: fetchCommandes,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCommandeDetail = (commandeId) => {
  return useQuery({
    queryKey: ['commandes', commandeId],
    queryFn: () => fetchCommandeDetail(commandeId),
    enabled: !!commandeId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateCommande = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommande,
    onSuccess: () => {
      queryClient.invalidateQueries(['commandes']);
      queryClient.invalidateQueries(['biens']);
    },
  });
};

export const useUpdateCommandeStatut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommandeStatut,
    onSuccess: () => {
      queryClient.invalidateQueries(['commandes']);
      queryClient.invalidateQueries(['biens']);
    },
  });
};

// Hooks pour les commandes utilisateur
export const useCommandesAcheteur = () => {
  return useQuery({
    queryKey: ['commandes', 'acheteur'],
    queryFn: async () => {
      const response = await api.get('/user/commandes/acheteur');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCommandesVendeur = () => {
  return useQuery({
    queryKey: ['commandes', 'vendeur'],
    queryFn: async () => {
      const response = await api.get('/user/commandes/vendeur');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};