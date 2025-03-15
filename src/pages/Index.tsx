
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DestinationCard from '@/components/DestinationCard';
import FeatureCard from '@/components/FeatureCard';
import MapPreview from '@/components/MapPreview';
import SmartSuggestions from '@/components/SmartSuggestions';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import ScrollReveal from '@/components/ScrollReveal';
import { initScrollAnimations } from '@/utils/scrollAnimations';
import { Globe, Compass, MessageCircle, Calendar, MapPin, Search } from 'lucide-react';

const Index = () => {
  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Initialize scroll animations
    const cleanup = initScrollAnimations();
    
    return cleanup;
  }, []);

  const destinations = [
    {
      title: 'Marrakech',
      description: 'Discover the vibrant markets, palaces, and gardens of this historic imperial city.',
      image: '/images/marrakech.jpg',
      location: 'Central Morocco',
      href: '/destination/marrakech',
    },
    {
      title: 'Chefchaouen',
      description: 'Explore the stunning blue city nestled in the Rif Mountains of northwest Morocco.',
      image: '/images/chefchaouen.jpg',
      location: 'Northern Morocco',
      href: '/destination/chefchaouen',
    },
    {
      title: 'Sahara Desert',
      description: 'Experience the magic of the Sahara with camel treks and nights under the stars.',
      image: '/images/sahara.jpg',
      location: 'Southern Morocco',
      href: '/destination/sahara',
    },
    {
      title: 'Fes',
      description: 'Wander through the ancient medina, a UNESCO World Heritage site with over 9,000 streets.',
      image: '/images/fes.jpg',
      location: 'Northern Morocco',
      href: '/destination/fes',
    },
  ];

  const features = [
    {
      title: 'Interactive Map',
      description: 'Explore Morocco with our detailed interactive map showing destinations, routes, and attractions.',
      icon: MapPin,
      href: '/feature/map',
    },
    {
      title: 'Smart Suggestions',
      description: 'Receive personalized recommendations based on your interests and preferences.',
      icon: Search,
      href: '/feature/suggestions',
    },
    {
      title: 'Chat Assistant',
      description: 'Get instant answers to your questions from our AI-powered travel assistant.',
      icon: MessageCircle,
      href: '/feature/chat',
    },
    {
      title: 'Cultural Events',
      description: 'Stay updated on local festivals, concerts, and cultural events happening during your visit.',
      icon: Calendar,
      href: '/feature/events',
    },
    {
      title: 'Travel Guides',
      description: 'Access comprehensive guides with insider tips on each destination.',
      icon: Compass,
      href: '/feature/guides',
    },
    {
      title: 'Language Support',
      description: 'Learn essential phrases in Moroccan Arabic and navigate language barriers with ease.',
      icon: Globe,
      href: '/feature/language',
    },
  ];

  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        <Header />
        <Hero />

        {/* Destinations Section */}
        <section className="section-container">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-12">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle mx-auto">
                Explore Morocco's most iconic locations, from ancient medinas to breathtaking landscapes
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
            {destinations.map((destination, index) => (
              <div key={destination.title} className="stagger-item">
                <DestinationCard
                  title={destination.title}
                  description={destination.description}
                  image={destination.image}
                  location={destination.location}
                  href={destination.href}
                  index={index}
                />
              </div>
            ))}
          </div>

          <ScrollReveal variant="fadeIn" delay={0.4}>
            <div className="mt-12 text-center">
              <Link to="/destination/marrakech" className="px-6 py-3 bg-morocco-clay text-white rounded-full font-medium hover:bg-morocco-clay/90 transition-colors inline-block">
                View All Destinations
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-morocco-sand/30">
          <div className="section-container">
            <ScrollReveal variant="slideUp">
              <div className="text-center mb-12">
                <h2 className="section-title">Why Choose Azoul</h2>
                <p className="section-subtitle mx-auto">
                  We've designed Azoul to make your Moroccan adventure seamless and unforgettable
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
              {features.map((feature, index) => (
                <div key={feature.title} className="stagger-item">
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    index={index}
                    href={feature.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-container">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-12">
              <h2 className="section-title">Explore Morocco</h2>
              <p className="section-subtitle mx-auto">
                Navigate through Morocco's diverse regions and plan your journey with our interactive map
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.2}>
            <MapPreview />
          </ScrollReveal>
        </section>

        {/* Smart Suggestions Section */}
        <SmartSuggestions />

        {/* Call to Action */}
        <section className="relative py-20 bg-morocco-navy text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{ 
              backgroundImage: "url('/images/pattern.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}></div>
          </div>
          
          <div className="relative section-container">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal variant="fadeIn">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Experience the Magic of Morocco?
                </h2>
              </ScrollReveal>
              
              <ScrollReveal variant="fadeIn" delay={0.1}>
                <p className="text-lg text-white/80 mb-8">
                  Start planning your unforgettable Moroccan adventure today with Azoul as your trusted guide.
                </p>
              </ScrollReveal>
              
              <ScrollReveal variant="slideUp" delay={0.2}>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/destination/marrakech" className="px-6 py-3 bg-white text-morocco-navy rounded-full font-medium hover:bg-white/90 transition-colors inline-block">
                    Start Exploring
                  </Link>
                  <Link to="/feature/chat" className="px-6 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors inline-block">
                    Chat with Azoul
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default Index;
