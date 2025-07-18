import Button from "../../../../../components/ui/Button";


const SecuritySettings = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Sécurité</h2>
        <p className="text-gray-600">Gérez la sécurité de votre compte</p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Mot de passe</h3>
          <p className="text-gray-600 mb-3">Dernière modification il y a 3 mois</p>
          <Button variant="outline">Changer le mot de passe</Button>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Authentification à deux facteurs</h3>
          <p className="text-gray-600 mb-3">Non activée</p>
          <Button variant="outline">Activer la 2FA</Button>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Sessions actives</h3>
          <p className="text-gray-600 mb-3">2 sessions actives</p>
          <Button variant="outline">Voir toutes les sessions</Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;