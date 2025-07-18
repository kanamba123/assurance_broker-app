import { Tab, Tabs } from "../../components/ui/Tabs";
import GeneralSettings from "./features/settings/sections/GeneralSettings";
import NotificationSettings from "./features/settings/sections/NotificationSettings";
import SecuritySettings from "./features/settings/sections/SecuritySettings";

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      
      <Tabs 
        defaultTab="general"
        variant="underline"
      >
        <Tab id="general" label="Général">
          <GeneralSettings />
        </Tab>
        
        <Tab id="security" label="Sécurité">
          <SecuritySettings />
        </Tab>
        
        <Tab id="notifications" label="Notifications">
          <NotificationSettings />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Settings;