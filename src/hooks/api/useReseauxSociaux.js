// hooks/api/useCategori.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const fetchReseauxSociaux = async () => {
  const response = await api.get(`/reseaux_sociaux`);
  return response.data;
};

const fetchCategoriesByCondition = async (type) => {
  const response = await api.get(`/categories?type=${type}`);
  return response.data;
};

const fetchCategorieDetail = async (ReseauxId) => {
  const response = await api.get(`/categories/${ReseauxId}`);
  return response.data;
};

const addReseauSocial = async (newReseaux) => {
  const response = await api.post(`/reseaux_sociaux`, newReseaux);
  return response.data;
};

const updateReseauSocial = async ({ id, ...updatedCategori }) => {
  const response = await api.put(`/reseaux_sociaux/${id}`, updatedCategori);
  return response.data;
};

const deleteReseauxSocial = async (ReseauxId) => {
  const response = await api.delete(`/reseaux_sociaux/${ReseauxId}`);
  console.log(response)
  return response.data;
};

export const useReseauxSociaux = () => {
  return useQuery({
    queryKey: ["reseaux_sociaux"],
    queryFn: fetchReseauxSociaux,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCategoriesByCondition = (type) => {
  return useQuery({
    queryKey: ["categoriesByCondition", type], // Ajout du type dans la queryKey pour un cache unique par type
    queryFn: () => fetchCategoriesByCondition(type), // Passage du type à la fonction de requête
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: !!type, // Ne lance la requête que si le type est défini
  });
};



export const useCategorieDetail = (ReseauxId) => {
  return useQuery({
    queryKey: ["categories", ReseauxId],
    queryFn: () => fetchCategorieDetail(ReseauxId),
    enabled: !!ReseauxId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddReseauSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addReseauSocial,
    onSuccess: () => {
      queryClient.invalidateQueries(["reseaux_sociaux"]);
    },
  });
};

export const useUpdateReseauSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReseauSocial,
    onSuccess: () => {
      queryClient.invalidateQueries(["reseaux_sociaux"]);
    },
  });
};

export const useDeleteReseauSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReseauxSocial,
    onSuccess: () => {
      queryClient.invalidateQueries(["reseaux_sociaux"]);
    },
  });
};
