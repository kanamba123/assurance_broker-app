import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// ===== API Functions =====

const fetchInsuranceCompanies = async () => {
  const response = await api.get(`/insurance_companies`);
  return response.data;
};

const fetchInsuranceCompanyDetail = async (companyId) => {
  const response = await api.get(`/insurance_companies/${companyId}`);
  return response.data;
};

const addInsuranceCompany = async (newCompany) => {
  const response = await api.post(`/insurance_companies`, newCompany);
  return response.data;
};

const updateInsuranceCompany = async ({ id, ...updatedCompany }) => {
  const response = await api.put(`/insurance_companies/${id}`, updatedCompany);
  return response.data;
};

const deleteInsuranceCompany = async (companyId) => {
  const response = await api.delete(`/insurance_companies/${companyId}`);
  return response.data;
};

// ===== HOOKS =====

export const useInsuranceCompanies = () => {
  return useQuery({
    queryKey: ["insurance_companies"],
    queryFn: fetchInsuranceCompanies,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useInsuranceCompanyDetail = (companyId) => {
  return useQuery({
    queryKey: ["insurance_company", companyId],
    queryFn: () => fetchInsuranceCompanyDetail(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddInsuranceCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addInsuranceCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["insurance_companies"]);
    },
  });
};

export const useUpdateInsuranceCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInsuranceCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["insurance_companies"]);
    },
  });
};

export const useDeleteInsuranceCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInsuranceCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["insurance_companies"]);
    },
  });
};
