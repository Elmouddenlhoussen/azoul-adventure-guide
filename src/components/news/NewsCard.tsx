
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

interface NewsCardProps {
  item: {
    id: string;
    title: string;
    image: string;
    date: string;
    category: string;
    excerpt: string;
  };
  index: number;
}

const NewsCard = ({ item, index }: NewsCardProps) => {
  return (
    <ScrollReveal key={item.id} delay={index * 0.1}>
      <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-morocco-sand/20 text-morocco-clay px-2 py-0.5 rounded-full text-xs font-medium">
              {item.category}
            </span>
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {item.date}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 line-clamp-2">
            {item.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {item.excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button asChild variant="link" className="text-morocco-clay p-0 h-auto font-medium">
            <Link to={`/news/${item.id}`} className="flex items-center">
              Read More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </ScrollReveal>
  );
};

export default NewsCard;
