
import React, { useEffect } from 'react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import NewsHero from '@/components/news/NewsHero';
import FeaturedArticle from '@/components/news/FeaturedArticle';
import NewsCard from '@/components/news/NewsCard';
import NewsSidebar from '@/components/news/NewsSidebar';
import { featuredNews, newsItems, categories } from '@/data/newsData';

const NewsPage = () => {
  useEffect(() => {
    document.title = 'Latest News | Azoul Morocco';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <NewsHero />

        {/* Featured Article */}
        <FeaturedArticle article={featuredNews} />

        {/* Latest News Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* News Articles */}
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-8">Latest Updates</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {newsItems.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                  ))}
                </div>
                
                <div className="flex justify-center mt-12">
                  <Button variant="outline" className="border-morocco-clay text-morocco-clay">
                    Load More News
                  </Button>
                </div>
              </div>
              
              {/* Sidebar */}
              <NewsSidebar categories={categories} />
            </div>
          </div>
        </section>
      </div>
    </AnimatedTransition>
  );
};

export default NewsPage;
