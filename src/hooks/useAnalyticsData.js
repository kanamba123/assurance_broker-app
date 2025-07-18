
import { useQuery } from "@tanstack/react-query";

const fetchAnalyticsData = async (timeRange) => {
  const res = await fetch(`/api/analytics?range=${timeRange}`);
  if (!res.ok) throw new Error('Failed to fetch analytics data');
  return res.json();
};


 export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analyticsData'],  // Must be an array (even if single key)
    queryFn: async () => {
      const response = await fetch('/api/analytics');
      return response.json();
    },
    staleTime: 5000,
  });
}