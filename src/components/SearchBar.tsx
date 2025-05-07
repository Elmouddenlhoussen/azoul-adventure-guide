
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Calendar, Compass } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

// Mock suggestions data - in a real app, this would come from an API
const searchSuggestions = {
  destinations: [
    { id: 'marrakech', title: 'Marrakech', type: 'City', icon: MapPin },
    { id: 'fes', title: 'Fes', type: 'City', icon: MapPin },
    { id: 'chefchaouen', title: 'Chefchaouen', type: 'City', icon: MapPin },
  ],
  experiences: [
    { id: 'desert-tour', title: 'Sahara Desert Tour', type: 'Experience', icon: Compass },
    { id: 'cooking-class', title: 'Moroccan Cooking Class', type: 'Activity', icon: Calendar },
  ]
};

interface SearchSuggestion {
  id: string;
  title: string;
  type: string;
  icon: React.ElementType;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsExpanded(false);
      setShowSuggestions(false);
    }
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'City') {
      navigate(`/destination/${suggestion.id}`);
    } else {
      navigate(`/feature/${suggestion.id}`);
    }
    setSearchQuery('');
    setIsExpanded(false);
    setShowSuggestions(false);
  };

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allSuggestions = [
      ...searchSuggestions.destinations,
      ...searchSuggestions.experiences
    ];
    
    const filtered = allSuggestions.filter(
      suggestion => suggestion.title.toLowerCase().includes(query)
    );
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery]);

  return (
    <div className="relative flex items-center z-20" ref={searchRef}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mr-2"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 md:w-64 h-9 pl-3 pr-8 rounded-full bg-morocco-sand/10 border-morocco-sand/30 focus-visible:ring-morocco-clay shadow-inner"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-morocco-sand/20"
                  >
                    <div className="py-1 max-h-64 overflow-auto">
                      {filteredSuggestions.map((suggestion) => {
                        const Icon = suggestion.icon;
                        return (
                          <div
                            key={suggestion.id}
                            className="px-3 py-2 cursor-pointer hover:bg-morocco-sand/10 flex items-center gap-2"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <div className="p-1 rounded-full bg-morocco-clay/10">
                              <Icon className="h-3.5 w-3.5 text-morocco-clay" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{suggestion.title}</p>
                              <p className="text-xs text-gray-500">{suggestion.type}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type={isExpanded && searchQuery.trim() ? "submit" : "button"}
        onClick={isExpanded && searchQuery.trim() ? handleSearch : toggleSearch}
        variant="ghost"
        size="icon"
        className={`rounded-full p-2 ${
          isExpanded 
            ? 'bg-morocco-clay text-white hover:bg-morocco-terracotta' 
            : 'bg-morocco-sand/20 text-morocco-clay hover:bg-morocco-sand/40'
        } transition-all shadow-sm hover:shadow`}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
};

export default SearchBar;
