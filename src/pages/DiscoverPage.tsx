
import React, { useEffect } from 'react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Map, Book, Users, Utensils, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

const discoverCategories = [
  {
    id: 'cultural-experiences',
    title: 'Cultural Experiences',
    description: 'Immerse yourself in Morocco\'s rich cultural heritage',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-morocco-clay/10',
    iconColor: 'text-morocco-clay',
    link: '/feature/cultural-tours',
  },
  {
    id: 'local-cuisine',
    title: 'Local Cuisine',
    description: 'Taste authentic Moroccan flavors and culinary traditions',
    icon: <Utensils className="w-6 h-6" />,
    color: 'bg-morocco-gold/10',
    iconColor: 'text-morocco-gold',
    link: '/feature/food',
  },
  {
    id: 'historic-sites',
    title: 'Historic Sites',
    description: 'Explore ancient medinas, kasbahs, and archaeological wonders',
    icon: <Compass className="w-6 h-6" />,
    color: 'bg-morocco-terracotta/10',
    iconColor: 'text-morocco-terracotta',
    link: '/feature/history',
  },
  {
    id: 'natural-wonders',
    title: 'Natural Wonders',
    description: 'Discover Morocco\'s diverse landscapes from mountains to deserts',
    icon: <Map className="w-6 h-6" />,
    color: 'bg-green-600/10',
    iconColor: 'text-green-600',
    link: '/feature/nature',
  },
  {
    id: 'travel-guides',
    title: 'Travel Guides',
    description: 'Expert guides to help you navigate Morocco with ease',
    icon: <Book className="w-6 h-6" />,
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    link: '/feature/guides',
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Capture Morocco\'s most instagrammable places and moments',
    icon: <Camera className="w-6 h-6" />,
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    link: '/feature/photography',
  }
];

const recommendations = [
  {
    id: 1,
    title: 'Marrakech Medina Tour',
    image: 'https://images.unsplash.com/photo-1548018560-c7196d91a35f?w=800&h=500&fit=crop',
    description: 'Get lost in the winding streets of Marrakech\'s historic medina',
    category: 'Cultural Tour',
    link: '/tour/marrakech-medina',
  },
  {
    id: 2,
    title: 'Fes Craft Workshops',
    image: 'https://images.unsplash.com/photo-1563889958749-625da26ed355?w=800&h=500&fit=crop',
    description: 'Learn traditional crafts from master artisans in Fes',
    category: 'Workshop',
    link: '/tour/fes-crafts',
  },
  {
    id: 3,
    title: 'Atlas Mountains Hiking',
    image: 'https://images.unsplash.com/photo-1518869347397-ea3138243f50?w=800&h=500&fit=crop',
    description: 'Trek through breathtaking mountain landscapes and Berber villages',
    category: 'Adventure',
    link: '/tour/atlas-hiking',
  }
];

const DiscoverPage = () => {
  useEffect(() => {
    document.title = 'Discover Morocco | Azoul';
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-morocco-sand/20 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Discover the Magic of Morocco
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-700 mb-8"
              >
                From bustling medinas to serene desert landscapes, uncover Morocco's treasures with our curated guides and insider tips
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-morocco-clay hover:bg-morocco-clay/90">
                  <Link to="/feature/guides">
                    Start Exploring
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover Morocco through these carefully curated categories
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverCategories.map((category, index) => (
                <ScrollReveal key={category.id} delay={index * 0.1}>
                  <Link to={category.link}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className={`${category.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                          <span className={category.iconColor}>{category.icon}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Experiences */}
        <section className="py-16 bg-morocco-sand/10">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Recommended For You</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Personalized experiences based on traveler favorites
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.1}>
                  <Link to={item.link}>
                    <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden aspect-video">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 text-morocco-clay text-xs font-medium px-3 py-1 rounded-full">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-morocco-clay transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-morocco-clay font-medium text-sm">View Details</span>
                          <div className="w-5 h-0.5 bg-morocco-clay/70 transition-all duration-300 group-hover:w-8"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link to="/feature/suggestions">
                  View All Experiences
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="bg-morocco-clay py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Get Personalized Travel Recommendations</h2>
              <p className="text-lg mb-8 text-white/80">
                Subscribe to receive curated content based on your interests and travel style
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-morocco-clay">
                  Learn More
                </Button>
                <Button className="bg-white text-morocco-clay hover:bg-white/90">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AnimatedTransition>
  );
};

export default DiscoverPage;
