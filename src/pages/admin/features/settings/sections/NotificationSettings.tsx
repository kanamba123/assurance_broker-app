const NotificationSettings = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-gray-600">Configurez comment vous recevez les notifications</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">Email</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Nouveaux messages</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Mises à jour du système</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Offres spéciales</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">Notifications push</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Alertes importantes</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Rappels</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">Fréquence des notifications</h3>
          <select className="w-full p-2 border rounded-md" defaultValue="medium">
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;