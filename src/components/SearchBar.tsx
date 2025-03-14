
import { useState } from 'react';
import { motion } from 'framer-motion';
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
      // Navigate to search results page with query
      navigate(`/feature/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
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
      <motion.form
        initial={false}
        animate={{
          width: isExpanded ? 'auto' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`overflow-hidden flex items-center ${isExpanded ? 'mr-2' : 'mr-0'}`}
        onSubmit={handleSearch}
      >
        <Input
          type="text"
          placeholder="Search destinations, guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-40 md:w-64 h-9 bg-morocco-sand/10 border-morocco-sand/20 focus-visible:ring-morocco-terracotta text-sm placeholder:text-gray-500`}
        />
        {isExpanded && searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-12 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.form>

      <Button
        type={isExpanded ? "submit" : "button"}
        onClick={toggleSearch}
        variant="ghost"
        size="icon"
        className={`rounded-full p-2 ${
          isExpanded 
            ? 'bg-morocco-clay text-white hover:bg-morocco-clay/90' 
            : 'bg-morocco-sand/10 text-morocco-clay hover:bg-morocco-sand/30'
        } transition-colors`}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
