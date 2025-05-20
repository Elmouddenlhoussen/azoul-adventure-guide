
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Star,
  Users, 
  MessageSquare, 
  Compass, 
  Check, 
  CalendarDays
} from 'lucide-react';

interface CategoryTagsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Features', icon: Star, color: 'bg-muted text-muted-foreground' },
  { id: 'personalization', label: 'Personalization', icon: Star, color: 'bg-purple-100 text-purple-700' },
  { id: 'community', label: 'Community', icon: Users, color: 'bg-blue-100 text-blue-700' },
  { id: 'immersive', label: 'Immersive', icon: Compass, color: 'bg-teal-100 text-teal-700' },
  { id: 'local', label: 'Local', icon: MessageSquare, color: 'bg-amber-100 text-amber-700' },
  { id: 'travel', label: 'Travel', icon: CalendarDays, color: 'bg-rose-100 text-rose-700' },
  { id: 'accessibility', label: 'Accessibility', icon: Check, color: 'bg-green-100 text-green-700' },
  { id: 'sustainability', label: 'Sustainability', icon: Star, color: 'bg-emerald-100 text-emerald-700' },
];

const CategoryTags = ({ activeCategory, setActiveCategory }: CategoryTagsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-2 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {categories.map((category) => {
        const CategoryIcon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <motion.div key={category.id} variants={item}>
            <Badge 
              variant={isActive ? "default" : "outline"}
              className={`
                cursor-pointer px-3 py-1.5 text-sm
                ${isActive ? 'bg-morocco-clay text-white' : category.color}
                hover:bg-morocco-clay/80 hover:text-white transition-colors
              `}
              onClick={() => setActiveCategory(category.id)}
            >
              <CategoryIcon className="w-3.5 h-3.5 mr-1.5" />
              {category.label}
            </Badge>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CategoryTags;
