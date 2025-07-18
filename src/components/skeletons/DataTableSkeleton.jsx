import React from 'react';

const DataTableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
    </div>
  );
};

export default DataTableSkeleton;