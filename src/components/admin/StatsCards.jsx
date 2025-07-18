// components/admin/StatsCards.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from './Skeleton';

const StatsCards = ({ metrics, loading, activeTab }) => {
  const cardsConfig = {
    overview: [
      { title: 'Clients totaux', value: 'totalCustomers', icon: '👥', description: '+12% ce mois' },
      { title: 'Revenu total', value: 'totalRevenue', icon: '💰', description: '+8% ce mois', isCurrency: true },
      { title: 'Experts actifs', value: 'activeExperts', icon: '🔧', description: 'Disponibles' },
      { title: 'Taux de conversion', value: 'conversionRate', icon: '📈', description: 'Commandes/Visites', isPercentage: true }
    ],
    customers: [
      { title: 'Nouveaux clients', value: 'newCustomers', icon: '🆕', description: 'Ce mois' },
      { title: 'Clients récurrents', value: 'returningCustomers', icon: '🔄', description: 'Fidélité' },
      { title: 'Satisfaction', value: 'customerSatisfaction', icon: '😊', description: 'Moyenne', isPercentage: true },
      { title: 'Panier moyen', value: 'averageOrderValue', icon: '🛒', description: 'Par commande', isCurrency: true }
    ],
    experts: [
      { title: 'Experts disponibles', value: 'availableExperts', icon: '✅', description: 'En ligne' },
      { title: 'Demandes traitées', value: 'completedRequests', icon: '✔️', description: 'Ce mois' },
      { title: 'Note moyenne', value: 'averageExpertRating', icon: '⭐', description: 'Sur 5' },
      { title: 'Retard moyen', value: 'averageResponseTime', icon: '⏱️', description: 'En heures' }
    ],
    transactions: [
      { title: 'Commandes', value: 'totalOrders', icon: '📦', description: 'Ce mois' },
      { title: 'Revenu mensuel', value: 'monthlyRevenue', icon: '💳', description: 'Total', isCurrency: true },
      { title: 'Paiements en attente', value: 'pendingPayments', icon: '⏳', description: 'À traiter' },
      { title: 'Taux de réussite', value: 'paymentSuccessRate', icon: '🎯', description: 'Paiements', isPercentage: true }
    ]
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      
    </div>
  );
};

export default StatsCards;