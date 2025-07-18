// components/admin/skeleton.tsx
import * as React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', isLoading = true, children, ...props }, ref) => {
    if (!isLoading) return <>{children}</>;

    return (
      <div
        ref={ref}
        className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`}
        {...props}
      >
        {/* Contenu vide pour le skeleton */}
        {children && React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              className: 'opacity-0' // Cache le contenu réel pendant le chargement
            } as React.HTMLAttributes<HTMLElement>);
          }
          return null;
        })}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Variantes prédéfinies
const SkeletonCircle = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`}
    {...props}
  />
);

const SkeletonText = ({ 
  className = '',
  lines = 1,
  lineClassName = 'h-4 w-full',
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
  lines?: number; 
  lineClassName?: string; 
}) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`bg-gray-200 dark:bg-gray-800 rounded animate-pulse ${lineClassName}`}
      />
    ))}
  </div>
);

export { Skeleton, SkeletonCircle, SkeletonText };