
import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import DestinationCard from '@/components/DestinationCard';
import MapPreview from '@/components/MapPreview';
import ScrollReveal from '@/components/ScrollReveal';
import SmartSuggestions from '@/components/SmartSuggestions';
import { features } from '@/data/features';
import { getFeaturedDestinations, Destination } from '@/data/destinations';
import { Users, Compass, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

const iconMap = {
  Users,
  Compass,
  Home,
};

const Index = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Azoul - Experience Morocco';
  }, []);

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true);
      const data = await getFeaturedDestinations();
      setDestinations(data);
      setLoading(false);
    };
    
    loadDestinations();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('discover_services')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('experience_best')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={iconMap[feature.icon as keyof typeof iconMap]}
                index={index}
                href={`/feature/${feature.id}`}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-morocco-clay hover:bg-morocco-clay/90">
              <Link to="/feature/cultural-tours">
                {t('explore_all')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Smart Suggestions Section */}
      <section className="py-20 bg-morocco-sand/20">
        <SmartSuggestions />
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-morocco-sand/10">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('popular_destinations')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('enchanting_places')}
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={destination.id}
                  title={destination.title}
                  description={destination.description}
                  image={destination.image}
                  location={destination.location}
                  href={`/destination/${destination.id}`}
                  index={index}
                />
              ))}
              {destinations.length === 0 && (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No featured destinations found.</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/destination/marrakech">
                {t('view_all')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('explore')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('interactive_map')}
              </p>
            </div>
          </ScrollReveal>

          <MapPreview />
        </div>
      </section>
    </div>
  );
};

export default Index;
