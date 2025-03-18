
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  featured: boolean;
}

export const features: Feature[] = [
  {
    id: "guides",
    title: "Expert Local Guides",
    description: "Connect with knowledgeable local guides for authentic experiences",
    icon: "Users",
    category: "Experience",
    featured: true
  },
  {
    id: "cultural-tours",
    title: "Cultural Tours",
    description: "Immerse yourself in Morocco's rich cultural heritage",
    icon: "Compass",
    category: "Tours",
    featured: true
  },
  {
    id: "accommodations",
    title: "Luxury Riads",
    description: "Stay in traditional Moroccan houses with modern amenities",
    icon: "Home",
    category: "Stay",
    featured: true
  }
];
