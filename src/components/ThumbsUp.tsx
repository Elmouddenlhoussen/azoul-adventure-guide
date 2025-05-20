
import React from 'react';
import { ThumbsUp as ThumbsUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThumbsUpProps extends React.ComponentPropsWithoutRef<'button'> {
  hasVoted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

const ThumbsUp = ({ 
  hasVoted = false,
  size = 'md',
  showCount = false,
  count = 0,
  className,
  ...props
}: ThumbsUpProps) => {
  // Size mappings
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };
  
  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'rounded-full flex items-center justify-center transition-colors',
        hasVoted ? 'bg-morocco-clay/10 text-morocco-clay' : 'bg-muted hover:bg-morocco-clay/20',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <ThumbsUpIcon size={iconSizes[size]} className={hasVoted ? 'fill-morocco-clay' : ''} />
      
      {showCount && count > 0 && (
        <span className={`ml-2 ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
          {count}
        </span>
      )}
    </motion.button>
  );
};

export default ThumbsUp;
