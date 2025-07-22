import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import api from '../../api/api';

// API
const fetchCompanyProducts = async () => {
  const response = await api.get('/company_products');
  return response.data;
};

const fetchCompanyProductsByPagin = async () => {
  const response = await api.get('/company_products/client');
  return response.data;
};

const fetchCompanyProductsByInfinityPagin = async ({ pageParam = 1 }) => {
  const limit = 6;
  const response = await api.get(`/company_products_pag_inf/client?page=${pageParam}&limit=${limit}`);
  return response.data;
};


const createCompanyProduct = async (product) => {
  const response = await api.post('/company_products', product);
  return response.data;
};

const updateCompanyProduct = async ({ id, ...product }) => {
  const response = await api.put(`/company_products/${id}`, product);
  return response.data;
};

const deleteCompanyProduct = async (id) => {
  const response = await api.delete(`/company_products/${id}`);
  return response.data;
};

const uploadCompanyProductImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/company_products/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// Hooks
export const useCompanyProducts = () => {
  return useQuery({
    queryKey: ['company_products'],
    queryFn: fetchCompanyProducts,
    staleTime: 1000 * 60 * 5,
  });
};

// Hooks
export const useCompanyProductsByPagination = () => {
  return useQuery({
    queryKey: ['company_products1'],
    queryFn: fetchCompanyProductsByPagin,
    staleTime: 1000 * 60 * 5,
  });
};



export const useCompanyProductsByInfinityPagination = () => {
  return useInfiniteQuery({
    queryKey: ['company_productsinf'],
    queryFn: fetchCompanyProductsByInfinityPagin,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
  });
};

export const useCreateCompanyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['company_products']);
    }
  });
};

export const useUpdateCompanyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['company_products']);
    }
  });
};

export const useDeleteCompanyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['company_products']);
    }
  });
};

export const useUploadCompanyProductImage = () => {
  return useMutation({
    mutationFn: uploadCompanyProductImage,
  });
};
