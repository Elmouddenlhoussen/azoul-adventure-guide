
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CalendarDays, Compass, Home, Map, MessageSquare, Users } from "lucide-react";

const links = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Discover",
    href: "/discover",
    icon: Compass,
  },
  {
    title: "Tours",
    href: "/feature/cultural-tours",
    icon: Map,
  },
  {
    title: "Guides",
    href: "/feature/guides",
    icon: Users,
  },
  {
    title: "Booking",
    href: "/booking",
    icon: CalendarDays,
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    icon: MessageSquare,
  },
];

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const location = useLocation();
  
  return (
    <nav className={cn("flex items-center space-x-1 lg:space-x-2", className)}>
      {links.map((link) => {
        const isActive = location.pathname === link.href;
        const LinkIcon = link.icon;
        
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-morocco-sand/10 hover:text-foreground",
              isActive
                ? "bg-morocco-sand/10 text-foreground"
                : "text-muted-foreground"
            )}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
