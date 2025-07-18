// api/analytics.js
import axios from 'axios';

export const fetchAnalyticsData = async (timeRange) => {
  try {
    const response = await axios.get(`/api/analytics?range=${timeRange}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch analytics data');
  }
};

// Exemple de structure de réponse
/*
{
  metrics: {
    totalCustomers: 1245,
    newCustomers: 32,
    totalRevenue: 45230.50,
    activeExperts: 28,
    pendingRequests: 12,
    conversionRate: 0.42
  },
  activity: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [120, 190, 130, 170, 150, 210]
  },
  customerSegmentation: [
    { category: 'Particuliers', value: 65 },
    { category: 'Entreprises', value: 35 }
  ],
  expertPerformance: [
    { expert: 'John Doe', completed: 12, rating: 4.8 },
    { expert: 'Jane Smith', completed: 8, rating: 4.9 }
  ],
  revenueTrends: [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 8000 },
    { month: 'Mar', revenue: 12000 }
  ]
}
*/