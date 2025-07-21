import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// ===== API Functions =====

const fetchInsuranceTypes = async () => {
  const response = await api.get(`/insurance_types`);
  return response.data;
};

const fetchInsuranceTypeDetail = async (typeId) => {
  const response = await api.get(`/insurance_types/${typeId}`);
  return response.data;
};

const addInsuranceType = async (newType) => {
  const response = await api.post(`/insurance_types`, newType);
  return response.data;
};

const updateInsuranceType = async ({ id, ...updatedType }) => {
  const response = await api.put(`/insurance_types/${id}`, updatedType);
  return response.data;
};

const deleteInsuranceType = async (typeId) => {
  const response = await api.delete(`/insurance_types/${typeId}`);
  return response.data;
};

// ===== HOOKS =====

export const useInsuranceTypes = () => {
  return useQuery({
    queryKey: ["insurance_types"],
    queryFn: fetchInsuranceTypes,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useInsuranceTypeDetail = (typeId) => {
  return useQuery({
    queryKey: ["insurance_type", typeId],
    queryFn: () => fetchInsuranceTypeDetail(typeId),
    enabled: !!typeId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddInsuranceType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addInsuranceType,
    onSuccess: () => {
      queryClient.invalidateQueries(["insurance_types"]);
    },
  });
};

export const useUpdateInsuranceType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInsuranceType,
    onSuccess: () => {
      queryClient.invalidateQueries(["insurance_types"]);
    },
  });
};

export const useDeleteInsuranceType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInsuranceType,
    onSuccess: () => {
      queryClient.invalidateQueries(["insurance_types"]);
    },
  });
};
