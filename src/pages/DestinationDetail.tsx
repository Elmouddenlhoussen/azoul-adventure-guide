
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Destination, getDestinationById } from '@/data/destinations';

// Sample data for destinations with string IDs
const fallbackDestinations: Record<string, Destination> = {
  "marrakech": {
    id: "marrakech",
    title: "Marrakech",
    description: "Known as the Red City, Marrakech is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with maze-like alleys where thriving souks sell traditional textiles, pottery and jewelry.",
    location: "Central Morocco",
    image: "/images/destinations/marrakech.jpg",
    rating: 4.8,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  "fes": {
    id: "fes",
    title: "Fes",
    description: "Fes is a northeastern Moroccan city often referred to as the country's cultural capital. It's primarily known for its Fes El Bali walled medina, with medieval architecture, vibrant souks and old-world atmosphere.",
    location: "Northern Morocco",
    image: "/images/destinations/fes.jpg",
    rating: 4.7,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  "chefchaouen": {
    id: "chefchaouen",
    title: "Chefchaouen",
    description: "Chefchaouen, the blue pearl of Morocco, is a city with a rich history and a unique charm. Known for its striking blue-washed buildings of the old town, this mountain city offers a relaxed atmosphere and stunning views.",
    location: "Northwest Morocco",
    image: "/images/destinations/chefchaouen.jpg",
    rating: 4.6,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

const DestinationDetail = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDestination = async () => {
      if (!destinationId) return;
      
      setLoading(true);
      try {
        // First try to get from the database
        const dbDestination = await getDestinationById(destinationId);
        
        if (dbDestination) {
          setDestination(dbDestination);
        } else if (fallbackDestinations[destinationId]) {
          // If not in database, use our hardcoded fallback
          setDestination(fallbackDestinations[destinationId]);
        } else {
          setError("Destination not found");
        }
      } catch (err) {
        console.error("Error fetching destination by ID:", err);
        
        // If there's an error (like invalid UUID format), check fallbacks
        if (fallbackDestinations[destinationId]) {
          setDestination(fallbackDestinations[destinationId]);
        } else {
          setError("Error loading destination");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [destinationId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mt-32"></div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The destination you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="flex items-center">
          <Link to="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-morocco-clay hover:text-morocco-terracotta mb-6">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to home</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src={destination.image} 
                  alt={destination.title} 
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.title}</h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center text-morocco-clay">
                  <span className="text-sm font-medium">{destination.rating}</span>
                  <div className="ml-1">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`inline-block ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                </div>
                <span className="mx-2">•</span>
                <span className="text-sm text-muted-foreground">{destination.location}</span>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About {destination.title}</h2>
                <p className="text-muted-foreground mb-6">{destination.description}</p>
                
                <div className="bg-morocco-sand/10 p-6 rounded-lg my-8">
                  <h3 className="text-lg font-medium mb-4">Highlights</h3>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>Explore the vibrant markets and historic sites</li>
                    <li>Experience authentic Moroccan cuisine</li>
                    <li>Connect with local artisans and culture</li>
                    <li>Discover hidden gems with our expert guides</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Plan Your Visit</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="bg-morocco-sand/20 p-2 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-morocco-clay">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Best Time to Visit</p>
                      <p className="text-xs text-muted-foreground">March to May, September to November</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-morocco-sand/20 p-2 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-morocco-clay">
                        <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
                        <path d="M15 3v6h6"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Language</p>
                      <p className="text-xs text-muted-foreground">Arabic, Berber, French</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-morocco-sand/20 p-2 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-morocco-clay">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Local Time</p>
                      <p className="text-xs text-muted-foreground">GMT+1</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-morocco-clay hover:bg-morocco-clay/90 mb-3">
                  Book a Tour
                </Button>
                
                <Button variant="outline" className="w-full">
                  Find Accommodation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default DestinationDetail;
