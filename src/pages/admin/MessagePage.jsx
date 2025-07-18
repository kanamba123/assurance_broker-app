import React, { useState, useEffect, useRef } from "react";
import {
  useUserConversations,
  useConversationMessages,
  useSendMessage,
  useMarkAsRead,
  useCreateConversation,
  useAvailableUsers,
  useDeleteMessage,
  useRestoreMessage,
} from "../../hooks/api/useMessages";
import { FiSend, FiSearch, FiPaperclip, FiUserPlus, FiUser, FiTrash2, FiRotateCcw } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../contexts/authContext";

const MessagePage = ({ currentUserId }) => {
  const { user, logout } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [conversationSearchTerm, setConversationSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // Récupération des données
  const {
    data: conversations = [],
    isLoading: loadingConversations,
    refetch: refetchConversations
  } = useUserConversations();

  const {
    data: messages = [],
    isLoading: loadingMessages,
    refetch: refetchMessages
  } = useConversationMessages(selectedConversationId);

  const {
    data: availableUsers = [],
    isLoading: loadingAvailableUsers
  } = useAvailableUsers();

  // Mutations
  const { mutate: sendMessageMutation } = useSendMessage();
  const { mutate: markAsReadMutation } = useMarkAsRead();
  const { mutate: createConversationMutation } = useCreateConversation();
  const { mutate: deleteMessageMutation } = useDeleteMessage();
  const { mutate: restoreMessageMutation } = useRestoreMessage();

  // Effets
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handlers
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversationId) return;

    sendMessageMutation(
      { conversationId: selectedConversationId, contenu: newMessage.trim() },
      {
        onSuccess: () => {
          setNewMessage("");
          refetchMessages();
          refetchConversations();
        },
      }
    );
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversationId(conversation.id);
    if (conversation.unread_count > 0) {
      markAsReadMutation(conversation.id);
    }
  };

  const startNewConversation = (userId) => {
    createConversationMutation(
      userId,
      {
        onSuccess: (data) => {
          setSelectedConversationId(data.id);
          setShowNewConversationModal(false);
          refetchConversations();
        },
      }
    );
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessageMutation(messageId, {
      onSuccess: () => {
        setSelectedMessage(null);
        refetchMessages();
      }
    });
  };

  const handleRestoreMessage = (messageId) => {
    restoreMessageMutation(messageId, {
      onSuccess: () => {
        setSelectedMessage(null);
        refetchMessages();
      }
    });
  };

  // Filtrer les utilisateurs disponibles
  const filteredAvailableUsers = availableUsers.filter(user =>
    user.id !== currentUserId &&
    user.name.toLowerCase().includes(conversationSearchTerm.toLowerCase())
  );

  // Filtrer les conversations
  const filteredConversations = conversations.filter(conv =>
    conv.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.last_message?.contenu?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingConversations) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Chargement des conversations...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Colonne des conversations */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <button
            onClick={() => setShowNewConversationModal(true)}
            className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
          >
            <FiUserPlus size={20} />
          </button>
        </div>

        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {conversations.length === 0
                ? "Aucune conversation trouvée"
                : "Aucun résultat correspondant à votre recherche"}
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`cursor-pointer p-4 border-b border-gray-100 hover:bg-gray-50 ${selectedConversationId === conv.id ? "bg-blue-50" : ""
                  }`}
                onClick={() => handleSelectConversation(conv)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{conv.contact_name}</h3>
                  {conv.unread_count > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conv.last_message?.contenu || ""}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {conv.last_message?.createdAt &&
                    new Date(conv.last_message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  }
                </p>
              </div>
            ))
          )}
        </div>
      </div>

        {/* Zone de chat */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversationId ? (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <FiUser className="text-gray-600" />
                </div>
                <h3 className="text-lg font-medium">
                  {conversations.find(c => c.id === selectedConversationId)?.contact_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedConversationId(null)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
              >
                <IoMdClose className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <div>Chargement des messages...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Aucun message dans cette conversation
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isSender = msg.expediteur_id === user.id;
                  const isSelected = selectedMessage?.id === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      {!isSender && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-sm font-medium text-gray-600">
                          {msg.sender_name?.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className={`relative max-w-[70%] rounded-2xl px-4 py-2 shadow-md ${isSender ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"} ${isSelected ? "ring-2 ring-blue-400" : ""}`}>
                        {isSelected && (
                          <div className="absolute -top-8 right-0 flex gap-2 bg-white rounded-lg shadow-md p-1">
                            {msg.is_deleted ? (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRestoreMessage(msg.id);
                                }}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                title="Restaurer"
                              >
                                <FiRotateCcw size={16} />
                              </button>
                            ) : (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteMessage(msg.id);
                                }}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Supprimer"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            )}
                          </div>
                        )}
                        
                        {msg.is_deleted ? (
                          <p className="italic text-gray-500">Message supprimé</p>
                        ) : (
                          <>
                            <p className="break-words">{msg.contenu}</p>
                            <div className="text-[11px] mt-1 flex items-center justify-end gap-1 opacity-70">
                              <span>
                                {new Date(msg.date_envoi).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {msg.lu && isSender && (
                                <BsCheck2All className={msg.lu ? "text-blue-300" : "text-gray-400"} />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiPaperclip />
              </button>
              <input
                type="text"
                placeholder="Écrire un message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-4">
            <FiUserPlus size={48} className="mb-4 text-gray-300" />
            <p className="text-lg mb-2">Aucune conversation sélectionnée</p>
            <p className="text-sm mb-4">
              Sélectionnez une conversation ou démarrez-en une nouvelle
            </p>
            <button
              onClick={() => setShowNewConversationModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Nouvelle conversation
            </button>
          </div>
        )}
      </div>

      {/* Modal nouvelle conversation */}
      {showNewConversationModal && (
        <div className="fixed inset-0 bg-primary/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Nouvelle conversation</h3>
              <button
                onClick={() => setShowNewConversationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={conversationSearchTerm}
                  onChange={(e) => setConversationSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingAvailableUsers ? (
                <div className="flex justify-center items-center h-32">
                  <div>Chargement des utilisateurs...</div>
                </div>
              ) : filteredAvailableUsers.length === 0 ? (
                <div className="flex justify-center items-center h-32 text-gray-500">
                  {availableUsers.length === 0
                    ? "Aucun utilisateur disponible"
                    : "Aucun résultat correspondant à votre recherche"}
                </div>
              ) : (
                filteredAvailableUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center"
                    onClick={() => startNewConversation(user.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FiUser size={18} className="text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowNewConversationModal(false);
                  setConversationSearchTerm("");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;