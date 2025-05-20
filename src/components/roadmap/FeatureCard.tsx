
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ThumbsUp, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FeatureCardProps {
  feature: {
    id: string;
    title: string;
    description: string;
    status: 'planned' | 'in-progress' | 'completed';
    category: string;
    votes: number;
    progress: number;
    estimatedCompletion?: string;
  };
  categoryLabel: string;
  categoryIcon: React.ComponentType<any>;
  statusIcon: React.ComponentType<any>;
  hasVoted: boolean;
  onClick: () => void;
  onVote: (e: React.MouseEvent) => void;
  index: number;
}

const FeatureCard = ({ 
  feature, 
  categoryLabel,
  categoryIcon: CategoryIcon,
  statusIcon: StatusIcon,
  hasVoted, 
  onClick,
  onVote,
  index
}: FeatureCardProps) => {
  // Background image based on category (placeholder images)
  const categoryImages: Record<string, string> = {
    personalization: 'https://images.unsplash.com/photo-1531761535209-180857b2a9d5?w=500&q=80&h=150&fit=crop',
    community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&q=80&h=150&fit=crop',
    immersive: 'https://images.unsplash.com/photo-1563889958749-625da26ed355?w=500&q=80&h=150&fit=crop',
    local: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=500&q=80&h=150&fit=crop',
    travel: 'https://images.unsplash.com/photo-1518869347397-ea3138243f50?w=500&q=80&h=150&fit=crop',
    accessibility: 'https://images.unsplash.com/photo-1527866512907-a35a62a0f6c5?w=500&q=80&h=150&fit=crop',
    sustainability: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=500&q=80&h=150&fit=crop',
  };
  
  // Status color
  const statusColor = 
    feature.status === 'completed' ? 'bg-green-100 text-green-700' : 
    feature.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 
    'bg-amber-100 text-amber-700';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card 
        className="h-full flex flex-col overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        {/* Feature image */}
        <div className="h-32 overflow-hidden">
          <img 
            src={categoryImages[feature.category] || 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=500&q=80&h=150&fit=crop'} 
            alt={feature.category}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`p-1 rounded ${statusColor}`}>
                <StatusIcon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs uppercase font-medium">
                {feature.status.replace('-', ' ')}
              </span>
            </div>
            <Badge variant="outline" className="bg-muted/40 text-xs flex items-center">
              <CategoryIcon className="h-3 w-3 mr-1" />
              {categoryLabel}
            </Badge>
          </div>
          <CardTitle className="text-lg">{feature.title}</CardTitle>
          <CardDescription className="line-clamp-2">{feature.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col justify-between space-y-4 pb-0">
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span className="font-medium">{feature.progress}%</span>
              </div>
              <Progress value={feature.progress} className="h-1.5" />
            </div>
            {feature.estimatedCompletion && (
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3 mr-1" />
                <span>Est: {feature.estimatedCompletion}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center text-sm">
              <ThumbsUp className="h-3.5 w-3.5 mr-1.5 text-morocco-green" />
              <span>{feature.votes} votes</span>
            </div>
            <Button
              size="sm"
              variant={hasVoted ? "outline" : "default"}
              className={hasVoted ? "text-xs" : "bg-morocco-clay hover:bg-morocco-clay/90 text-xs"}
              onClick={onVote}
              disabled={hasVoted}
            >
              {hasVoted ? "Voted" : "Vote"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
