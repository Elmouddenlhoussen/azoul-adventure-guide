
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Search, MapPin, Calendar, Compass, Utensils, Camera } from 'lucide-react';

// Mock search data - in a real app, this would come from an API or database
const searchData = {
  destinations: [
    { id: 'marrakech', title: 'Marrakech', description: 'The Red City with vibrant souks', icon: MapPin, path: '/destination/marrakech' },
    { id: 'fes', title: 'Fes', description: 'Ancient medina and tanneries', icon: MapPin, path: '/destination/fes' },
    { id: 'chefchaouen', title: 'Chefchaouen', description: 'The Blue Pearl of Morocco', icon: MapPin, path: '/destination/chefchaouen' },
  ],
  experiences: [
    { id: 'desert-tour', title: 'Sahara Desert Tour', description: 'Camel trekking and stargazing', icon: Compass, path: '/feature/desert-tour' },
    { id: 'cooking-class', title: 'Moroccan Cooking Class', description: 'Learn to prepare tagine and couscous', icon: Utensils, path: '/feature/cooking-class' },
    { id: 'photography-tour', title: 'Photography Tour', description: 'Capture Morocco\'s most scenic spots', icon: Camera, path: '/feature/photography-tour' },
  ],
  events: [
    { id: 'rose-festival', title: 'Festival of Roses', description: 'Annual celebration in Kalaat M\'Gouna', icon: Calendar, path: '/event/rose-festival' },
    { id: 'music-festival', title: 'Gnaoua World Music Festival', description: 'Traditional and fusion music in Essaouira', icon: Calendar, path: '/event/music-festival' },
  ]
};

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandSearch = ({ open, onOpenChange }: CommandSearchProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Search destinations, experiences..." 
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Destinations">
            {searchData.destinations.map((item) => (
              <CommandItem 
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.path)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-morocco-sand/20">
                    <item.icon className="h-4 w-4 text-morocco-clay" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandGroup heading="Experiences">
            {searchData.experiences.map((item) => (
              <CommandItem 
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.path)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-morocco-terracotta/10">
                    <item.icon className="h-4 w-4 text-morocco-terracotta" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandGroup heading="Events">
            {searchData.events.map((item) => (
              <CommandItem 
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.path)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-blue-500/10">
                    <item.icon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default CommandSearch;
