import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// Récupérer les conversations de l'utilisateur
const fetchUserConversations = async () => {
  const response = await api.get('/conversations');
  return response.data;
};

// Récupérer les messages d'une conversation
const fetchConversationMessages = async (conversationId) => {
  const response = await api.get(`/conversations/${conversationId}/messages`);
  return response.data;
};

// Envoyer un message
const sendNewMessage = async ({ conversationId, contenu }) => {
  const response = await api.post(`/conversations/${conversationId}/messages`, { 
    contenu, 
    destinataire_id: 17,
    conversationId 
  });
  return response.data;
};

// Marquer comme lu
const markConversationAsRead = async (conversationId) => {
  const response = await api.patch(`/conversations/${conversationId}/read`);
  return response.data;
};

// Créer une nouvelle conversation
const createNewConversation = async (destinataire_id) => {
  const response = await api.post('/conversations', { destinataire_id });
  return response.data;
};

// Supprimer un message
const deleteMessage = async (messageId) => {
  const response = await api.delete(`/messages/${messageId}`);
  return response.data;
};

// Restaurer un message
const restoreMessage = async (messageId) => {
  const response = await api.patch(`/messages/${messageId}/restore`);
  return response.data;
};

// Récupérer les utilisateurs disponibles
const fetchAvailableUsers = async () => {
  const response = await api.get('/users/available-for-conversation');
  return response.data;
};

export const useUserConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: fetchUserConversations,
    staleTime: 5 * 60 * 1000,
  });
};

export const useConversationMessages = (conversationId) => {
  return useQuery({
    queryKey: ['conversationMessages', conversationId],
    queryFn: () => fetchConversationMessages(conversationId),
    enabled: !!conversationId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendNewMessage,
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries(['conversationMessages', conversationId]);
      queryClient.invalidateQueries(['conversations']);
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markConversationAsRead,
    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries(['conversations']);
      queryClient.invalidateQueries(['conversationMessages', conversationId]);
    },
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewConversation,
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_, messageId) => {
      queryClient.invalidateQueries(['conversationMessages']);
      queryClient.invalidateQueries(['conversations']);
    },
  });
};

export const useRestoreMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(['conversationMessages']);
      queryClient.invalidateQueries(['conversations']);
    },
  });
};

export const useAvailableUsers = () => {
  return useQuery({
    queryKey: ['availableUsers'],
    queryFn: fetchAvailableUsers,
    staleTime: 10 * 60 * 1000,
  });
};