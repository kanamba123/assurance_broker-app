// hooks/api/useService.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const fetchServices = async () => {
  const response = await api.get(`/services`);
  return response.data;
};

const fetchServiceDetail = async (serviceId) => {
  const response = await api.get(`/services/${serviceId}`);
  return response.data;
};

const addService = async (newService) => {
  const response = await api.post(`/services`, newService);
  return response.data;
};

const updateService = async ({ id, ...updatedService }) => {
  const response = await api.put(`/services/${id}`, updatedService);
  return response.data;
};

const deleteService = async (serviceId) => {
  const response = await api.delete(`/del_services/${serviceId}`);
  return response.data;
};

export const useService = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useServicesByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["services", categoryId],
    queryFn: async () => {
      const response = await api.get(`/servicesBycat?category_id=${categoryId}`);
      return response.data;
    },
    enabled: !!categoryId, // pour éviter les appels avant que l'id ne soit dispo
  });
};


export const useServiceDetail = (serviceId) => {
  return useQuery({
    queryKey: ["services", serviceId],
    queryFn: () => fetchServiceDetail(serviceId),
    enabled: !!serviceId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addService,
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });
};