import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// Fetch all messages contact
const fetchMessagesContact = async () => {
  const response = await api.get(`/contacts`);
  return response.data;
};

// Fetch one message contact by ID
const fetchMessageContactDetail = async (id) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};

// Create a new message contact
const addMessageContact = async (newMessage) => {
  const response = await api.post(`/contacts`, newMessage);
  return response.data;
};

// Delete a message contact by ID
const deleteMessageContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};

// Hook: get all messages contact
export const useMessagesContact = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: fetchMessagesContact,
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook: get one message contact by ID
export const useMessageContact = (id) => {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => fetchMessageContactDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook: add a new message contact
export const useAddMessageContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMessageContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

// Hook: delete a message contact
export const useDeleteMessageContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessageContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};
