
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock search result data
const mockDestinations = [
  { id: 1, title: 'Marrakech', type: 'destination', image: '/images/marrakech.jpg', description: 'The Red City with vibrant souks and historic medina' },
  { id: 2, title: 'Chefchaouen', type: 'destination', image: '/images/chefchaouen.jpg', description: 'The Blue Pearl of Morocco nestled in the Rif Mountains' },
  { id: 3, title: 'Sahara Desert', type: 'destination', image: '/images/sahara.jpg', description: 'Experience the magic of golden dunes and starry nights' },
];

const mockEvents = [
  { id: 1, title: 'Moroccan Festival of Roses', type: 'event', date: 'May 2024', location: 'Kalaat M\'Gouna', description: 'Annual celebration of the rose harvest' },
  { id: 2, title: 'Gnaoua World Music Festival', type: 'event', date: 'June 2024', location: 'Essaouira', description: 'Traditional Gnaoua music and world music fusion' },
];

const mockExperiences = [
  { id: 1, title: 'Authentic Moroccan Cooking Class', type: 'experience', location: 'Fes', description: 'Learn to prepare traditional Moroccan dishes with local ingredients' },
  { id: 2, title: 'Atlas Mountains Trekking', type: 'experience', location: 'High Atlas', description: 'Guided hikes through stunning mountain landscapes and Berber villages' },
];

interface SearchResult {
  id: number;
  title: string;
  type: string;
  description: string;
  image?: string;
  location?: string;
  date?: string;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
    performSearch(query);
  };

  const performSearch = (searchQuery: string) => {
    setIsSearching(true);
    // In a real app, you would call your API here
    setTimeout(() => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      const lowerQuery = searchQuery.toLowerCase();
      const allResults = [
        ...mockDestinations,
        ...mockEvents,
        ...mockExperiences
      ].filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.description.toLowerCase().includes(lowerQuery)
      );
      
      setResults(allResults);
      setIsSearching(false);
    }, 800);
  };

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    setQuery(currentQuery);
    performSearch(currentQuery);
  }, [searchParams]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'destination':
        return <MapPin className="h-5 w-5 text-morocco-clay" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-morocco-clay" />;
      case 'experience':
        return <Globe className="h-5 w-5 text-morocco-clay" />;
      default:
        return null;
    }
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
              
              <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="Search destinations, events, experiences..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow border-morocco-sand/30 focus-visible:ring-morocco-terracotta"
                />
                <Button 
                  type="submit"
                  className="bg-morocco-clay hover:bg-morocco-clay/90"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>
              </form>
              
              {results.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-gray-600">Found {results.length} results for "{searchParams.get('q')}"</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result) => (
                      <motion.div
                        key={`${result.type}-${result.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-morocco-sand/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        {result.image && (
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={result.image} 
                              alt={result.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                            />
                          </div>
                        )}
                        
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {getResultIcon(result.type)}
                            <span className="text-sm font-medium uppercase text-gray-500">
                              {result.type}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-1">{result.title}</h3>
                          
                          {result.location && (
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {result.location}
                            </div>
                          )}
                          
                          {result.date && (
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {result.date}
                            </div>
                          )}
                          
                          <p className="text-gray-600 mt-2 text-sm">{result.description}</p>
                          
                          <Button 
                            variant="ghost" 
                            className="w-full mt-3 hover:bg-morocco-sand/10 text-morocco-clay"
                          >
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : isSearching ? (
                <div className="py-8 text-center">
                  <div className="animate-spin h-10 w-10 border-4 border-morocco-sand border-t-morocco-clay rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching...</p>
                </div>
              ) : searchParams.get('q') ? (
                <div className="py-8 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-medium text-gray-700 mb-2">No results found</h2>
                  <p className="text-gray-600">
                    We couldn't find any matches for "{searchParams.get('q')}". <br />
                    Try different keywords or browse our featured destinations.
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-medium text-gray-700 mb-2">Search for Morocco's treasures</h2>
                  <p className="text-gray-600">
                    Enter keywords to find destinations, events, and experiences
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default SearchResults;
