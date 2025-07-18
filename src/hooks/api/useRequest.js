import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const fetchRequest = async () => {
  const response = await api.get(`/demandes`);
  return response.data;
};

const fetchRequestByExpert = async () => {
  const response = await api.get(`/demandes`);
  return response.data;
};

const fetchArticleDetail = async (articleId) => {
  const response = await api.get(
    `/demandes/${articleId}`
  );
  return response.data;
};

const addRequest = async (newArticle) => {
  const response = await api.post(`/demandes`, newArticle);
  return response.data;
};

export const useRequest = () => {
  return useQuery({
    queryKey: ["demandes"],
    queryFn: fetchRequest,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
};

export const useRequestExpert = () => {
  return useQuery({
    queryKey: ["demandes"],
    queryFn: fetchRequestByExpert,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
};



export const useShopsByRequest = (articleId) => {
  return useQuery({
    queryKey: ["demandes", articleId],
    queryFn: () => fetchArticleDetail(articleId),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["demandes"]);
    },
  });
};

export const useAddResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["demandes"]);
    },
  });
};
