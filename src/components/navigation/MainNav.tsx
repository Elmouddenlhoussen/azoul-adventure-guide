
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Globe, Calendar, Newspaper, MessageCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const navLinks = [
  { 
    name: 'Discover', 
    href: '/discover', 
    icon: <Compass className="h-4 w-4" />,
    description: 'Explore travel guides and authentic Moroccan experiences'
  },
  { 
    name: 'Experiences', 
    href: '/feature/suggestions', 
    icon: <Globe className="h-4 w-4" />,
    description: 'Find unique activities and local cultural experiences'
  },
  { 
    name: 'Events', 
    href: '/feature/events', 
    icon: <Calendar className="h-4 w-4" />,
    description: 'Browse upcoming festivals, celebrations and cultural events'
  },
  { 
    name: 'News', 
    href: '/news', 
    icon: <Newspaper className="h-4 w-4" />,
    description: 'Latest news, insights and updates from Morocco'
  },
  { 
    name: 'Destinations', 
    href: '/destination/marrakech', 
    icon: <MapPin className="h-4 w-4" />,
    description: 'Explore popular cities, hidden gems and natural wonders'
  },
  { 
    name: 'Chat', 
    href: '/feature/chat', 
    icon: <MessageCircle className="h-4 w-4" />,
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
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="space-x-1 md:space-x-2">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.name}>
            <HoverCard openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link 
                  to={link.href}
                  className={cn(
                    "flex items-center text-sm font-medium px-3 py-2 rounded-full transition-all relative group",
                    isActive(link.href)
                      ? "bg-gradient-to-r from-morocco-clay to-morocco-terracotta text-white shadow-md" 
                      : "text-gray-700 hover:bg-morocco-sand/30"
                  )}
                >
                  <span className="flex items-center">
                    <span className={cn(
                      "mr-1.5",
                      isActive(link.href) 
                        ? "text-white" 
                        : "text-morocco-terracotta"
                    )}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </span>
                  
                  {isActive(link.href) && (
                    <motion.span 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-morocco-terracotta to-morocco-clay -z-10"
                      layoutId="navbar-active"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-64 p-3 shadow-lg backdrop-blur-sm bg-white/90 border border-morocco-sand/20">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 p-2 rounded-full bg-morocco-sand/20">
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{link.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
