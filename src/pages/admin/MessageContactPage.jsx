import React from "react";
import { Loader2, Mail, Trash2, User } from "lucide-react";
import {
  useMessagesContact,
  useDeleteMessageContact,
} from "../../hooks/api/useMessageContact";
import { Card, CardContent } from "../../components/ui/card";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const MessagesContactPage = () => {
  const { data: messages, isLoading, isError } = useMessagesContact();
  const { mutate: deleteMessage, isLoading: isDeleting } =
    useDeleteMessageContact();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce message ?"
    );
    if (!confirmed) return;

    deleteMessage(id, {
      onSuccess: () => {
        toast.success("Message supprimé avec succès");
      },
      onError: () => {
        toast.error("Erreur lors de la suppression du message");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-8">
        Une erreur est survenue lors du chargement des messages.
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        Aucun message de contact pour le moment.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-8">
      <h2 className="text-3xl font-bold">
        📩 Messages de contact
      </h2>

      {messages.map((msg) => (
        <Card
          key={msg.id}
          className="shadow-md rounded-2xl border border-gray-200"
        >
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="font-medium">{msg.nom}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>{msg.email}</span>
              </div>
            </div>

            <p className="text-gray-800 text-base leading-relaxed">
              {msg.message}
            </p>

            <div className="flex justify-end pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(msg.id)}
                disabled={isDeleting}
                className="flex items-center gap-1 px-3 py-1.5 text-black cursor-pointer hover:text-primary"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessagesContactPage;
