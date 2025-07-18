import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Skeleton } from '../../../components/admin/Skeleton';

const ExpertPerformance = ({ data }) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Performance des Experts</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="expert" type="category" width={120} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'completed' ? `${value} demandes` : value,
                  name === 'completed' ? 'Terminées' : 'Note moyenne'
                ]}
              />
              <Legend />
              <Bar dataKey="completed" name="Demandes terminées" fill="#8884d8" />
              <Bar dataKey="rating" name="Note moyenne" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-[300px] w-full" />
        )}
      </CardContent>
    </Card>
  );
};

export default ExpertPerformance;