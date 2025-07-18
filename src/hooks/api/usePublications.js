import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// Fonctions d'API pour les publications
const fetchPublications = async () => {
  const response = await api.get('/publications');
  return response.data;
};

// Fonctions d'API pour les publications
const fetchPublicationsPub = async () => {
  const response = await api.get('/publications_pub');
  return response.data;
};

const fetchPublicationDetail = async (publicationId) => {
  const response = await api.get(`/publications/${publicationId}`);
  return response.data;
};

const fetchPublicationBySlug = async (slug) => {
  const response = await api.get(`/publications/slug/${slug}`);
  return response.data;
};

const createPublication = async (publicationData) => {
  const response = await api.post('/publications', publicationData);
  return response.data;
};

const updatePublication = async ({ id, ...publicationData }) => {
  const response = await api.put(`/publications/${id}`, publicationData);
  return response.data;
};

const deletePublication = async (publicationId) => {
  const response = await api.delete(`/publications/${publicationId}`);
  return response.data;
};

const uploadPublicationImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post('/publications/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Hooks pour les publications
export const usePublications = () => {
  return useQuery({
    queryKey: ['publications'],
    queryFn: fetchPublications,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hooks pour les publications
export const usePublicationsPub = () => {
  return useQuery({
    queryKey: ['publications'],
    queryFn: fetchPublicationsPub,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};


export const usePublicationDetail = (publicationId) => {
  return useQuery({
    queryKey: ['publications', publicationId],
    queryFn: () => fetchPublicationDetail(publicationId),
    enabled: !!publicationId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const usePublicationBySlug = (slug) => {
  return useQuery({
    queryKey: ['publications', 'slug', slug],
    queryFn: () => fetchPublicationBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreatePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPublication,
    onSuccess: () => {
      queryClient.invalidateQueries(['publications']);
    },
  });
};

export const useUpdatePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePublication,
    onSuccess: () => {
      queryClient.invalidateQueries(['publications']);
    },
  });
};

export const useDeletePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePublication,
    onSuccess: () => {
      queryClient.invalidateQueries(['publications']);
    },
  });
};

export const useUploadPublicationImage = () => {
  return useMutation({
    mutationFn: uploadPublicationImage,
  });
};