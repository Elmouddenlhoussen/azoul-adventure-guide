
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MessageSquare, Users, ThumbsUp } from 'lucide-react';

interface FeatureDetailModalProps {
  feature: {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string;
    votes: number;
    progress: number;
    estimatedCompletion?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (featureId: string) => void;
  hasVoted: boolean;
}

const FeatureDetailModal = ({ 
  feature, 
  isOpen, 
  onClose, 
  onVote,
  hasVoted 
}: FeatureDetailModalProps) => {
  if (!feature) return null;

  // Mock data for the modal to make it more visually appealing
  const comments = [
    { id: '1', user: 'Sarah M.', content: 'This feature would be incredibly useful for planning my trip to Morocco!', date: '3 days ago' },
    { id: '2', user: 'Ahmed K.', content: 'I\'ve been waiting for this. Can\'t wait to see it implemented.', date: '1 week ago' }
  ];

  // Image mapping for feature categories
  const categoryImages: Record<string, string> = {
    personalization: 'https://images.unsplash.com/photo-1531761535209-180857b2a9d5?w=800&fit=crop',
    community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop',
    immersive: 'https://images.unsplash.com/photo-1563889958749-625da26ed355?w=800&fit=crop',
    local: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&fit=crop',
    travel: 'https://images.unsplash.com/photo-1518869347397-ea3138243f50?w=800&fit=crop',
    accessibility: 'https://images.unsplash.com/photo-1527866512907-a35a62a0f6c5?w=800&fit=crop',
    sustainability: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=800&fit=crop',
  };

  // Get background image based on category
  const backgroundImage = categoryImages[feature.category] || 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&fit=crop';

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="h-48 -mx-6 -mt-6 mb-4 rounded-t-lg overflow-hidden relative">
            <img 
              src={backgroundImage} 
              alt={feature.category} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <Badge className={`
                ${feature.status === 'completed' ? 'bg-green-600' : 
                  feature.status === 'in-progress' ? 'bg-blue-600' : 'bg-amber-600'}
                text-white uppercase
              `}>
                {feature.status}
              </Badge>
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold">{feature.title}</DialogTitle>
          <DialogDescription className="text-base text-foreground">{feature.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          {/* Progress section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Development Progress</span>
              <span className="font-medium">{feature.progress}%</span>
            </div>
            <Progress value={feature.progress} className="h-2" />
            {feature.estimatedCompletion && (
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                <span>Estimated completion: {feature.estimatedCompletion}</span>
              </div>
            )}
          </div>
          
          {/* Community feedback section */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Community Feedback
            </h3>
            <div className="space-y-3">
              {comments.map(comment => (
                <div key={comment.id} className="bg-muted/40 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm">{comment.user}</div>
                    <div className="text-xs text-muted-foreground">{comment.date}</div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* User engagement stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 p-3 rounded-md text-center">
              <div className="text-3xl font-bold text-morocco-clay">{feature.votes}</div>
              <div className="text-xs text-muted-foreground mt-1">Community Votes</div>
            </div>
            <div className="bg-muted/40 p-3 rounded-md text-center">
              <div className="text-3xl font-bold text-morocco-green">{comments.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Feedback Comments</div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-morocco-clay" />
            <span className="text-sm text-muted-foreground">{feature.votes + 54} users interested</span>
          </div>
          <Button
            variant={hasVoted ? "outline" : "default"}
            className={hasVoted ? "" : "bg-morocco-clay hover:bg-morocco-clay/90"}
            onClick={() => onVote(feature.id)}
            disabled={hasVoted}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {hasVoted ? "Voted" : "Vote for this feature"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureDetailModal;
