// hooks/api/useCategori.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const fetchCategories = async () => {
  const response = await api.get(`/categories`);
  return response.data;
};

const fetchCategoriesByCondition = async (type) => {
  const response = await api.get(`/categories?type=${type}`);
  return response.data;
};

const fetchCategorieDetail = async (CategoriId) => {
  const response = await api.get(`/categories/${CategoriId}`);
  return response.data;
};

const addCategorie = async (newCategori) => {
  const response = await api.post(`/categories`, newCategori);
  return response.data;
};

const updateCategorie = async ({ id, ...updatedCategori }) => {
  const response = await api.put(`/categories/${id}`, updatedCategori);
  return response.data;
};

const deleteCategorie = async (CategoriId) => {
  const response = await api.delete(`/categories/${CategoriId}`);
  return response.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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



export const useCategorieDetail = (CategoriId) => {
  return useQuery({
    queryKey: ["categories", CategoriId],
    queryFn: () => fetchCategorieDetail(CategoriId),
    enabled: !!CategoriId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

export const useUpdateCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

export const useDeleteCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};