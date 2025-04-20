
import React, { useEffect } from 'react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

// Sample news data
const featuredNews = {
  id: 'morocco-reopening',
  title: 'Morocco Reopens Historic Sites After Restoration',
  image: 'https://images.unsplash.com/photo-1623867483196-4e42c89b2be4?w=800&h=400&fit=crop',
  date: 'April 10, 2025',
  category: 'Tourism',
  excerpt: 'Several historic monuments across Morocco have reopened to the public following extensive restoration projects, offering visitors enhanced experiences with new interpretive displays and guided tours.',
  author: 'Laila Benjelloun',
  authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
};

const newsItems = [
  {
    id: 'new-airline-routes',
    title: 'New International Airline Routes Connect Morocco to Global Destinations',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=400&fit=crop',
    date: 'April 5, 2025',
    category: 'Transportation',
    excerpt: 'Several major airlines have announced new direct routes to Morocco from cities across Europe, Asia, and North America.',
  },
  {
    id: 'desert-festival',
    title: 'Annual Desert Music Festival Returns to Merzouga',
    image: 'https://images.unsplash.com/photo-1590172462287-d71eeca9754d?w=800&h=400&fit=crop',
    date: 'March 28, 2025',
    category: 'Events',
    excerpt: 'The internationally renowned music festival set against the backdrop of the Sahara Desert will feature both local and global artists.',
  },
  {
    id: 'sustainable-tourism',
    title: 'Morocco Launches Sustainable Tourism Initiative',
    image: 'https://images.unsplash.com/photo-1574236170880-fea1a43d6be6?w=800&h=400&fit=crop',
    date: 'March 15, 2025',
    category: 'Sustainability',
    excerpt: 'The Moroccan Ministry of Tourism has unveiled a comprehensive plan to promote sustainable practices across the tourism sector.',
  },
  {
    id: 'culinary-recognition',
    title: 'Moroccan Cuisine Recognized in World Culinary Awards',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&h=400&fit=crop',
    date: 'March 8, 2025',
    category: 'Culinary',
    excerpt: "Traditional Moroccan dishes and cooking techniques have received international recognition at this year's World Culinary Awards.",
  },
  {
    id: 'archaeological-discovery',
    title: 'Major Archaeological Discovery in Atlas Mountains',
    image: 'https://images.unsplash.com/photo-1591288506352-c2717d8998bc?w=800&h=400&fit=crop',
    date: 'February 22, 2025',
    category: 'History',
    excerpt: 'Archaeologists have unearthed artifacts dating back to the Neolithic period, shedding new light on early human settlements in North Africa.',
  },
  {
    id: 'artisan-market',
    title: 'New Artisan Market Opens in Fes',
    image: 'https://images.unsplash.com/photo-1566935367436-b11aa25bb097?w=800&h=400&fit=crop',
    date: 'February 10, 2025',
    category: 'Culture',
    excerpt: 'A new market dedicated to showcasing and preserving traditional Moroccan crafts has opened in the historic city of Fes.',
  }
];

const categories = [
  'Tourism', 'Culture', 'Events', 'Transportation', 'Sustainability', 
  'Culinary', 'History', 'Adventure', 'Accommodations'
];

const NewsPage = () => {
  useEffect(() => {
    document.title = 'Latest News | Azoul Morocco';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-morocco-navy/5 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Morocco Travel News & Updates
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-700 mb-8"
              >
                Stay informed with the latest news, events, and travel updates from across Morocco
              </motion.p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3 overflow-hidden">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-morocco-sand/20 text-morocco-clay px-3 py-1 rounded-full text-sm font-medium">
                        {featuredNews.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredNews.date}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {featuredNews.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredNews.excerpt}
                    </p>
                    
                    <div className="flex items-center mb-6">
                      <img 
                        src={featuredNews.authorImage}
                        alt={featuredNews.author}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <span className="text-gray-700 font-medium">
                        {featuredNews.author}
                      </span>
                    </div>
                    
                    <Button asChild className="bg-morocco-clay hover:bg-morocco-clay/90 w-full sm:w-auto">
                      <Link to={`/news/${featuredNews.id}`}>
                        Read Full Article
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* News Articles */}
              <div className="md:w-3/4">
                <ScrollReveal>
                  <h2 className="text-2xl font-bold mb-8">Latest Updates</h2>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {newsItems.map((item, index) => (
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
                  ))}
                </div>
                
                <div className="flex justify-center mt-12">
                  <Button variant="outline" className="border-morocco-clay text-morocco-clay">
                    Load More News
                  </Button>
                </div>
              </div>
              
              {/* Sidebar */}
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
            </div>
          </div>
        </section>
      </div>
    </AnimatedTransition>
  );
};

export default NewsPage;
