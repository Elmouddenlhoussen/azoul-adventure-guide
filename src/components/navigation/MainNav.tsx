
import { Link, useLocation } from 'react-router-dom';
import { Compass, Globe, Calendar, Newspaper, MessageCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";

const navLinks = [
  { 
    name: 'Discover', 
    href: '/discover', 
    icon: <Compass className="h-4 w-4 mr-1" />,
    description: 'Explore travel guides and authentic Moroccan experiences'
  },
  { 
    name: 'Experiences', 
    href: '/feature/suggestions', 
    icon: <Globe className="h-4 w-4 mr-1" />,
    description: 'Find unique activities and local cultural experiences'
  },
  { 
    name: 'Events', 
    href: '/feature/events', 
    icon: <Calendar className="h-4 w-4 mr-1" />,
    description: 'Browse upcoming festivals, celebrations and cultural events'
  },
  { 
    name: 'News', 
    href: '/news', 
    icon: <Newspaper className="h-4 w-4 mr-1" />,
    description: 'Latest news, insights and updates from Morocco'
  },
  { 
    name: 'Destinations', 
    href: '/destination/marrakech', 
    icon: <MapPin className="h-4 w-4 mr-1" />,
    description: 'Explore popular cities, hidden gems and natural wonders'
  },
  { 
    name: 'Chat', 
    href: '/feature/chat', 
    icon: <MessageCircle className="h-4 w-4 mr-1" />,
    description: 'Get personalized travel recommendations from our AI'
  },
];

export function MainNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.name}>
            <Link 
              to={link.href}
              className={cn(
                "flex items-center text-sm font-medium px-4 py-2 rounded-full transition-all relative group",
                isActive(link.href)
                  ? "bg-morocco-sand/30 text-morocco-clay" 
                  : "text-gray-800 hover:bg-morocco-sand/20"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
              
              {isActive(link.href) && (
                <motion.span 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-morocco-gold to-morocco-clay"
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
