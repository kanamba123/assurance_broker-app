import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config/config";
import api from "../../api/api";

const fetchClientsCategoris = async () => {
  const response =await api.get(`/categorieclient`);
  return response.data;
};

const fetchClientsCategorisDetail = async (clientId) => {
  const response = await axios.get(
    `${config.API_BASE_URL}/categorieclient/${clientId}`
  );
  return response.data;
};


const addClient = async (newClient) => {
  const response = await axios.post(`${config.API_BASE_URL}/categorieclient`, newClient);
  return response.data;
};

const deleteClientCategory = async (categoryId) => {
  const response = await axios.delete(`${config.API_BASE_URL}/categorieclient/${categoryId}`);
  return response.data;
};

const updateCategorie = async ({ id, ...updatedCategori }) => {
  const response = await api.put(`/categorieclient/${id}`, updatedCategori);
  return response.data;
};


export const useClientsCategoris = () => {
  return useQuery({
    queryKey: ["categorieclient"],
    queryFn: fetchClientsCategoris,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
};

export const useClientDetailCategory = (clientId) => {
  return useQuery({
    queryKey: ["categorieclient", clientId],
    queryFn: () => fetchClientsCategorisDetail(clientId),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddClientsCategoris = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["categorieclient"]);
    },
  });
};

export const useDeleteClientsCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClientCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categorieclient"]);
    },
    onError: (error) => {
      console.error("Error deleting client category:", error);
    }
  });
};

export const useUpdateCategorie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries(["categorieclient"]);
    },
  });
};