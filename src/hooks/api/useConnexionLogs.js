// hooks/api/useConnexions.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// --- API CALLS ---

const fetchConnexions = async () => {
  const response = await api.get("/connexions");
  return response.data;
};

const deleteConnexion = async (id) => {
  const response = await api.delete(`/connexions/${id}`);
  return response.data;
};

const cleanOldConnexions = async () => {
  const response = await api.post("/connexions/clean-old");
  return response.data;
};

// --- REACT QUERY HOOKS ---

export const useConnexions = () => {
  return useQuery({
    queryKey: ["connexions"],
    queryFn: fetchConnexions,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteConnexion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConnexion,
    onSuccess: () => {
      queryClient.invalidateQueries(["connexions"]);
    },
  });
};

export const useCleanOldConnexions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cleanOldConnexions,
    onSuccess: () => {
      queryClient.invalidateQueries(["connexions"]);
    },
  });
};
