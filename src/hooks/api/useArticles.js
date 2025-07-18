import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config/config";
import api from "../../api/api";

const fetchArticles = async () => {
  const response = await api.get(`/articles`);
  return response.data;
};

const fetchArticleDetail = async (articleId) => {
  const response = await api.get(
    `${config.API_BASE_URL}/articles/${articleId}`
  );
  return response.data;
};

const addArticles = async (newArticle) => {
  const response = await api.post(`/articles`, newArticle);
  return response.data;
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
};



export const useShopsByArticles = (articleId) => {
  return useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => fetchArticleDetail(articleId),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddArticles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addArticles,
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};
