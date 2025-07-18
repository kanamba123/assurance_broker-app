import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Skeleton } from '../../../components/admin/Skeleton';

const RevenueTrends = ({ data }) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Tendances de Revenus</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              
              <YAxis />
              <Tooltip formatter={(value) => [`€${value}, Revenu`]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Revenu mensuel"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-[300px] w-full" />
        )}
    
      </CardContent>
    </Card>
  );
};

export default RevenueTrends;