
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import DestinationCard from '@/components/DestinationCard';
import MapPreview from '@/components/MapPreview';
import ScrollReveal from '@/components/ScrollReveal';
import { features } from '@/data/features';
import { destinations } from '@/data/destinations';
import { Users, Compass, Home } from 'lucide-react';

const iconMap = {
  Users,
  Compass,
  Home,
};

const Index = () => {
  useEffect(() => {
    document.title = 'Azoul - Experience Morocco';
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the best of Morocco with our curated services and expert guidance
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
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-morocco-sand/10">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the most enchanting places Morocco has to offer
              </p>
            </div>
          </ScrollReveal>

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
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Morocco</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plan your journey with our interactive map
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
