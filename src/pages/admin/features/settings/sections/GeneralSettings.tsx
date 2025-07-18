import { useState } from 'react';
import { FiSave, FiMoon, FiSun, FiMonitor } from 'react-icons/fi';

const GeneralSettings = () => {
  const [theme, setTheme] = useState('system');
  const [accentColor, setAccentColor] = useState('blue');
  const [language, setLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [dateFormat, setDateFormat] = useState('fr-FR');
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [tutorials, setTutorials] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous ajouteriez la logique pour sauvegarder les paramètres
    console.log('Paramètres sauvegardés', {
      theme,
      accentColor,
      language,
      timezone,
      dateFormat,
      autoUpdates,
      analytics,
      tutorials
    });
  };

  const themeOptions = [
    { value: 'light', label: 'Clair', icon: <FiSun className="mr-2" /> },
    { value: '', label: 'Sombre', icon: <FiMoon className="mr-2" /> },
    { value: 'system', label: 'Système', icon: <FiMonitor className="mr-2" /> }
  ];

  const colorOptions = [
    { value: 'blue', bg: 'bg-blue-500', ring: 'ring-blue-500' },
    { value: 'green', bg: 'bg-green-500', ring: 'ring-green-500' },
    { value: 'purple', bg: 'bg-purple-500', ring: 'ring-purple-500' },
    { value: 'red', bg: 'bg-red-500', ring: 'ring-red-500' },
    { value: 'orange', bg: 'bg-orange-500', ring: 'ring-orange-500' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b border-gray-200 :border-gray-700 pb-6">
            <h1 className="text-2xl font-bold text-gray-900 :text-white">Paramètres généraux</h1>
            <p className="mt-1 text-sm text-gray-500 :text-gray-400">
              Personnalisez l'apparence et le comportement de votre application
            </p>
          </div>

          {/* Section Apparence */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 :text-white">Apparence</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Sélecteur de thème */}
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 :text-gray-300 mb-2">
                  Thème
                </label>
                <div className="space-y-2">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTheme(option.value)}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md border transition-colors ${
                        theme === option.value
                          ? 'bg-blue-50 border-blue-200 text-blue-700 :bg-blue-900/30 :border-blue-800 :text-blue-200'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 :border-gray-700 :text-gray-300 :hover:bg-gray-800'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélecteur de couleur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 :text-gray-300 mb-2">
                  Couleur d'accentuation
                </label>
                <div className="flex space-x-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setAccentColor(color.value)}
                      className={`w-10 h-10 rounded-full ${color.bg} ${
                        accentColor === color.value ? `ring-2 ring-offset-2 ${color.ring}` : ''
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${color.ring}`}
                      aria-label={`Couleur ${color.value}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section Langue et Localisation */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 :text-white">Langue et Localisation</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Sélecteur de langue */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 :text-gray-300 mb-2">
                  Langue
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 :border-gray-700 :bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                </select>
              </div>

              {/* Sélecteur de fuseau horaire */}
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 :text-gray-300 mb-2">
                  Fuseau horaire
                </label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 :border-gray-700 :bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="Europe/Paris">Paris (UTC+1)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">New York (UTC-5)</option>
                  <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                </select>
              </div>

              {/* Sélecteur de format de date */}
              <div>
                <label htmlFor="date-format" className="block text-sm font-medium text-gray-700 :text-gray-300 mb-2">
                  Format de date
                </label>
                <select
                  id="date-format"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 :border-gray-700 :bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="fr-FR">JJ/MM/AAAA</option>
                  <option value="en-US">MM/DD/YYYY</option>
                  <option value="en-GB">DD/MM/YYYY</option>
                  <option value="de-DE">DD.MM.YYYY</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Préférences */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 :text-white">Préférences</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="auto-updates"
                    type="checkbox"
                    checked={autoUpdates}
                    onChange={(e) => setAutoUpdates(e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 :border-gray-600 rounded :bg-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="auto-updates" className="font-medium text-gray-700 :text-gray-300">
                    Mises à jour automatiques
                  </label>
                  <p className="text-gray-500 :text-gray-400">
                    L'application se mettra à jour automatiquement en arrière-plan
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="analytics"
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 :border-gray-600 rounded :bg-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="analytics" className="font-medium text-gray-700 :text-gray-300">
                    Statistiques d'utilisation
                  </label>
                  <p className="text-gray-500 :text-gray-400">
                    Nous aidons à améliorer le produit grâce à des données anonymes
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="tutorials"
                    type="checkbox"
                    checked={tutorials}
                    onChange={(e) => setTutorials(e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 :border-gray-600 rounded :bg-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="tutorials" className="font-medium text-gray-700 :text-gray-300">
                    Tutoriels interactifs
                  </label>
                  <p className="text-gray-500 :text-gray-400">
                    Afficher des guides pour les nouvelles fonctionnalités
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6 border-t border-gray-200 :border-gray-700">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FiSave className="mr-2" />
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;