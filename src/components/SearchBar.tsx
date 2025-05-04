
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsExpanded(false);
    }
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setSearchQuery('');
    }
  };

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {isExpanded && (
          <motion.form
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mr-2"
            onSubmit={handleSearch}
          >
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
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.form>
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
