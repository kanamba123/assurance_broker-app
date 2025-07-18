import { Line } from 'react-chartjs-2';

export default function ActivityChart({ data }) {
  return (
    <Line 
      data={{
        labels: data?.labels || [],
        datasets: [
          {
            label: 'Activité utilisateur',
            data: data?.values || [],
            borderColor: '#3b82f6',
            tension: 0.1
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }}
    />
  );
}