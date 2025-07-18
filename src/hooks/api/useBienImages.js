import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// Fonctions d'API pour les images
const fetchBienImages = async (bienId) => {
  const response = await api.get(`/biens/${bienId}/images`);
  return response.data;
};

const addBienImage = async ({ bienId, imageFile }) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post(`/biens/${bienId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteBienImage = async (imageId) => {
  const response = await api.delete(`/biens/images/${imageId}`);
  return response.data;
};

// Hooks pour les images
export const useBienImages = (bienId) => {
  return useQuery({
    queryKey: ['biens', bienId, 'images'],
    queryFn: () => fetchBienImages(bienId),
    enabled: !!bienId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddBienImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBienImage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['biens', variables.bienId, 'images']);
      queryClient.invalidateQueries(['biens', variables.bienId]);
    },
  });
};

export const useDeleteBienImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBienImage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['biens', data.bien_id, 'images']);
      queryClient.invalidateQueries(['biens', data.bien_id]);
    },
  });
};