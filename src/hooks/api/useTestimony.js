import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../api/api";

// Fonctions d'API pour les témoignages
const fetchTestimonies = async () => {
  const response = await api.get('/temoignage');
  return response.data;
};

// Fonctions d'API pour les témoignages
const fetchTestimoniesPaginated = async ({ pageParam = 1 }) => {
  const limit = 5;
  const response = await api.get(`/temoignage/client?page=${pageParam}&limit=${limit}`);
  return response.data;
};


const fetchTestimonyDetail = async (testimonyId) => {
  const response = await api.get(`/temoignage/${testimonyId}`);
  return response.data;
};

const createTestimony = async (testimonyData) => {
  const response = await api.post('/temoignage', testimonyData);
  return response.data;
};

const updateTestimony = async ({ id, ...testimonyData }) => {
  const response = await api.put(`/temoignage/${id}`, testimonyData);
  return response.data;
};

const deleteTestimony = async (testimonyId) => {
  const response = await api.delete(`/temoignage/${testimonyId}`);
  return response.data;
};

const uploadTestimonyImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post('/temoignage/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Hooks pour les témoignages
export const useTestimony = () => {
  return useQuery({
    queryKey: ['temoignages'],
    queryFn: fetchTestimonies,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hooks pour les témoignages par paginatation auto
export const useTestimonInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['testimonies'],
    queryFn: fetchTestimoniesPaginated,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
  });
};


export const useTestimonyDetail = (testimonyId) => {
  return useQuery({
    queryKey: ['temoignages', testimonyId],
    queryFn: () => fetchTestimonyDetail(testimonyId),
    enabled: !!testimonyId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestimony,
    onSuccess: () => {
      queryClient.invalidateQueries(['temoignages']);
    },
  });
};

export const useUpdateTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTestimony,
    onSuccess: () => {
      queryClient.invalidateQueries(['temoignages']);
    },
  });
};

export const useDeleteTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimony,
    onSuccess: () => {
      queryClient.invalidateQueries(['temoignages']);
    },
  });
};

export const useUploadTestimonyImage = () => {
  return useMutation({
    mutationFn: uploadTestimonyImage,
  });
};