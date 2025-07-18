import React, { useState, useEffect } from 'react';

// Composant indépendant pour le chat
const ChatComponent = ({ 
  currentChat, 
  onClose, 
  onSendMessage,
  onStartNewChat 
}) => {
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      onSendMessage(messageContent);
      setMessageContent('');
    }
  };

  return (
    <div className="lg:w-1/3 bg-white shadow rounded-lg overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">
          {currentChat ? `Conversation avec ${currentChat.sender}` : 'Nouvelle conversation'}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={onStartNewChat}
            className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
          >
            Nouveau
          </button>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        {currentChat ? (
          currentChat.conversation.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.sender === 'Vous' ? 'text-right' : ''}`}
            >
              <div className={`inline-block px-4 py-2 rounded-lg ${message.sender === 'Vous' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>Sélectionnez une conversation ou démarrez-en une nouvelle</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder={currentChat ? "Écrivez votre message..." : "Démarrer une nouvelle conversation..."}
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageContent.trim()}
            className="bg-orange-600 text-white px-4 py-2 rounded-r-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant principal des notifications
const MessageExpert = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [newChatRecipient, setNewChatRecipient] = useState('');

  // Icônes SVG inline
  const BellIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );

  const CheckIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const MailIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const UserAddIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );

  const DocumentTextIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const TrashIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const ReplyIcon = ({ className = "h-5 w-5", color = "currentColor" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
  );

  // Données simulées de notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'message',
        title: 'Nouveau message',
        content: 'Vous avez reçu un message de Jean Dupont concernant votre projet',
        time: 'Il y a 5 minutes',
        read: false,
        sender: 'Jean Dupont',
        senderId: 101,
        icon: <MailIcon className="h-5 w-5" color="#3B82F6" />,
        conversation: [
          {
            id: 1,
            sender: 'Jean Dupont',
            content: 'Bonjour, avez-vous eu le temps de regarder ma proposition pour le projet ?',
            time: 'Il y a 5 minutes'
          }
        ]
      },
      {
        id: 2,
        type: 'connection',
        title: 'Nouvelle connexion',
        content: 'Marie Lambert a accepté votre invitation à vous connecter',
        time: 'Il y a 1 heure',
        read: false,
        icon: <UserAddIcon className="h-5 w-5" color="#10B981" />
      },
      {
        id: 3,
        type: 'document',
        title: 'Document approuvé',
        content: 'Votre proposition de contrat a été approuvée',
        time: 'Hier, 14:30',
        read: true,
        icon: <DocumentTextIcon className="h-5 w-5" color="#8B5CF6" />
      },
      {
        id: 4,
        type: 'alert',
        title: 'Paiement reçu',
        content: 'Votre paiement de 1 250€ a été confirmé',
        time: 'Hier, 09:15',
        read: true,
        icon: <BellIcon className="h-5 w-5" color="#F59E0B" />
      },
      {
        id: 5,
        type: 'update',
        title: 'Mise à jour système',
        content: 'Une nouvelle version de la plateforme est disponible',
        time: '12/06/2023',
        read: true,
        icon: <BellIcon className="h-5 w-5" color="#F97316" />
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    if (currentChat && currentChat.id === id) {
      setCurrentChat(null);
    }
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    setCurrentChat(null);
  };

  const handleSendMessage = (messageContent) => {
    if (!messageContent.trim()) return;
    
    if (currentChat) {
      // Réponse à une conversation existante
      const updatedNotifications = notifications.map(notification => {
        if (notification.id === currentChat.id) {
          const newMessage = {
            id: notification.conversation.length + 1,
            sender: 'Vous',
            content: messageContent,
            time: 'Maintenant'
          };
          return {
            ...notification,
            conversation: [...notification.conversation, newMessage],
            read: true
          };
        }
        return notification;
      });
      
      setNotifications(updatedNotifications);
      setCurrentChat(updatedNotifications.find(n => n.id === currentChat.id));
    } else {
      // Nouvelle conversation
      const newNotification = {
        id: Math.max(...notifications.map(n => n.id), 0) + 1,
        type: 'message',
        title: 'Message envoyé',
        content: `Vous avez démarré une conversation avec ${newChatRecipient}`,
        time: 'Maintenant',
        read: true,
        sender: newChatRecipient,
        senderId: Math.floor(Math.random() * 1000),
        icon: <MailIcon className="h-5 w-5" color="#3B82F6" />,
        conversation: [
          {
            id: 1,
            sender: 'Vous',
            content: messageContent,
            time: 'Maintenant'
          }
        ]
      };
      
      setNotifications([newNotification, ...notifications]);
      setCurrentChat(newNotification);
      setNewChatRecipient('');
    }
  };

  const startNewChat = () => {
    setCurrentChat(null);
    setNewChatRecipient('');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Colonne principale des notifications */}
        <div className={`${showChat ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <div className="flex items-center space-x-4">
              {notifications.length > 0 && (
                <button 
                  onClick={deleteAllNotifications}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Tout supprimer
                </button>
              )}
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-orange-600 hover:text-orange-800 flex items-center"
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Tout marquer comme lu
                </button>
              )}
              <button
                onClick={() => {
                  setShowChat(!showChat);
                  if (!showChat) setCurrentChat(null);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <MailIcon className="h-4 w-4 mr-1" />
                {showChat ? 'Masquer le chat' : 'Afficher le chat'}
              </button>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Toutes
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'unread' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Non lues
                {unreadCount > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('read')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'read' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Lues
              </button>
            </nav>
          </div>

          {/* Liste des notifications */}
          <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {activeTab === 'unread' 
                  ? "Vous n'avez pas de nouvelles notifications" 
                  : "Aucune notification trouvée"}
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      {notification.icon}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.content}
                      </p>
                      <div className="mt-2 flex space-x-3">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-orange-600 hover:text-orange-800 flex items-center"
                          >
                            <CheckIcon className="h-3 w-3 mr-1" />
                            Marquer comme lu
                          </button>
                        )}
                        {notification.type === 'message' && (
                          <button 
                            onClick={() => {
                              setCurrentChat(notification);
                              setShowChat(true);
                              markAsRead(notification.id);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <ReplyIcon className="h-3 w-3 mr-1" />
                            Répondre
                          </button>
                        )}
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-red-600 hover:text-red-800 flex items-center"
                        >
                          <TrashIcon className="h-3 w-3 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination (optionnelle) */}
          {filteredNotifications.length > 0 && (
            <div className="mt-6 flex justify-between items-center text-sm text-gray-700">
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                Précédent
              </button>
              <span>Page 1 sur 2</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                Suivant
              </button>
            </div>
          )}
        </div>

        {/* Colonne de chat (visible uniquement si showChat est true) */}
        {showChat && (
          <ChatComponent
            currentChat={currentChat}
            onClose={() => setShowChat(false)}
            onSendMessage={handleSendMessage}
            onStartNewChat={startNewChat}
          />
        )}
      </div>
    </div>
  );
};

export default MessageExpert;