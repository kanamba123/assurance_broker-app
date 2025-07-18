import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/api";

import config from "../../config/config";

const fetchClients = async () => {
  const response = await api.get(`/clients`);
  return response.data;
};

const fetchClientsDetail = async (clientId) => {
  const response = await axios.get(
    `${config.API_BASE_URL}/clients/${clientId}`
  );
  return response.data;
};

const addClient = async (newClient) => {
  const response = await api.post(`${config.API_BASE_URL}/clients`, newClient);
  return response.data;
};

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
};

export const useClientsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["clients", categoryId],
    queryFn: async () => {
      const response = await api.get(`/clientsByCat?category_id=${categoryId}`);
      return response.data;
    },
    enabled: !!categoryId, // pour éviter les appels avant que l'id ne soit dispo
  });
};




export const useShopsByClient = (clientId) => {
  return useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => fetchClientsDetail(clientId),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddClients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
    },
  });
};
