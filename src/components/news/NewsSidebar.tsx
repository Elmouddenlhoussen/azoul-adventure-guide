
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

interface NewsSidebarProps {
  categories: string[];
}

const NewsSidebar = ({ categories }: NewsSidebarProps) => {
  return (
    <div className="md:w-1/4">
      <ScrollReveal>
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-morocco-clay" />
                <Link to={`/news/category/${category.toLowerCase()}`} className="text-gray-700 hover:text-morocco-clay transition-colors">
                  {category}
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <Card className="p-6 bg-morocco-sand/10">
          <h3 className="text-lg font-semibold mb-4">Subscribe to Updates</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest news and travel updates delivered directly to your inbox
          </p>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-clay/50"
            />
            <Button className="w-full bg-morocco-clay hover:bg-morocco-clay/90">
              Subscribe
            </Button>
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
};

export default NewsSidebar;
