import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WellnessCardProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  title?: string;
  description?: string;
  variant?: 'default' | 'gradient' | 'primary' | 'secondary';
}

export const WellnessCard = ({ 
  children, 
  className, 
  onClick, 
  icon, 
  title, 
  description,
  variant = 'default'
}: WellnessCardProps) => {
  const variantStyles = {
    default: 'wellness-card',
    gradient: 'wellness-card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20',
    primary: 'wellness-card bg-gradient-to-br from-primary to-primary-hover text-primary-foreground border-primary',
    secondary: 'wellness-card bg-gradient-to-br from-secondary to-secondary-hover text-secondary-foreground border-secondary'
  };

  return (
    <div 
      className={cn(variantStyles[variant], className)} 
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && title ? (
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="text-4xl">{icon}</div>
          <div className="space-y-2">
            <h3 className="text-xl font-heading font-semibold">{title}</h3>
            {description && (
              <p className="text-base text-text-secondary">{description}</p>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};