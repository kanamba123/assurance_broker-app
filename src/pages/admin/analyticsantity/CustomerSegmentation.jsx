import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const CustomerSegmentation = ({ data }) => {
  const [activeTab, setActiveTab] = useState('categories');
  
  // Exemple de données transformées
  const segments = {
    categories: [
      { name: 'Particuliers', value: 65 },
      { name: 'Entreprises', value: 35 }
    ],
    geography: [
      { name: 'Bujumbura', value: 45 },
      { name: 'Gitega', value: 20 },
      { name: 'Autres', value: 35 }
    ],
    spending: [
      { name: '0-50€', value: 30 },
      { name: '50-200€', value: 45 },
      { name: '200+€', value: 25 }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Segmentation des Clients</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1 rounded-md ${
              activeTab === 'categories' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
            }`}
          >
            Catégories
          </button>
          <button
            onClick={() => setActiveTab('geography')}
            className={`px-3 py-1 rounded-md ${
              activeTab === 'geography' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
            }`}
          >
            Géographie
          </button>
          <button
            onClick={() => setActiveTab('spending')}
            className={`px-3 py-1 rounded-md ${
              activeTab === 'spending' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
            }`}
          >
            Dépenses
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments[activeTab]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {segments[activeTab].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={segments[activeTab]}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" name="Clients" fill="#8884d8">
                {segments[activeTab].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};