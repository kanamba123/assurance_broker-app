import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// Fonctions d'API pour les biens
const fetchBiens = async () => {
  const response = await api.get('/biens');
  return response.data;
};

const fetchBienDetail = async (bienId) => {
  const response = await api.get(`/biens/${bienId}`);
  return response.data;
};

const addBien = async (newBien) => {
  const response = await api.post('/biens', newBien);
  return response.data;
};

const updateBien = async ({ id, ...updatedBien }) => {
  const response = await api.put(`/biens/${id}`, updatedBien);
  return response.data;
};

const deleteBien = async (bienId) => {
  const response = await api.delete(`/biens/${bienId}`);
  return response.data;
};

// Hooks pour les biens
export const useBiens = () => {
  return useQuery({
    queryKey: ['biens'],
    queryFn: fetchBiens,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useBienDetail = (bienId) => {
  return useQuery({
    queryKey: ['biens', bienId],
    queryFn: () => fetchBienDetail(bienId),
    enabled: !!bienId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddBien = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBien,
    onSuccess: () => {
      queryClient.invalidateQueries(['biens']);
    },
  });
};

export const useUpdateBien = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBien,
    onSuccess: () => {
      queryClient.invalidateQueries(['biens']);
    },
  });
};

export const useDeleteBien = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBien,
    onSuccess: () => {
      queryClient.invalidateQueries(['biens']);
    },
  });
};