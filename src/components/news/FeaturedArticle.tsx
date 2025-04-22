
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

interface FeaturedArticleProps {
  article: {
    id: string;
    title: string;
    image: string;
    date: string;
    category: string;
    excerpt: string;
    author: string;
    authorImage: string;
  };
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-morocco-sand/20 text-morocco-clay px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center mb-6">
                  <img 
                    src={article.authorImage}
                    alt={article.author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <span className="text-gray-700 font-medium">
                    {article.author}
                  </span>
                </div>
                
                <Button asChild className="bg-morocco-clay hover:bg-morocco-clay/90 w-full sm:w-auto">
                  <Link to={`/news/${article.id}`}>
                    Read Full Article
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedArticle;
