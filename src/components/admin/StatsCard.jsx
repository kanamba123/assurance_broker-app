import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Skeleton } from './Skeleton';

const StatsCard = ({ title, value, icon, description, loading, isCurrency, isPercentage }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl">{icon}</span>
      </CardHeader>
      <CardContent>
        {loading ? (
          <>
            <Skeleton className="h-8 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {isCurrency && '€'}
              {isPercentage 
                ? `${(value * 100).toFixed(1)}%`
                : value}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;