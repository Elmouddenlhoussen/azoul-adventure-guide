
export interface Destination {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: "marrakech",
    title: "Marrakech",
    description: "Discover the vibrant culture and rich history of the Red City",
    image: "https://images.unsplash.com/photo-1539020140153-e69ed81792c6",
    location: "Marrakech, Morocco",
    rating: 4.8,
    featured: true
  },
  {
    id: "fes",
    title: "Fes",
    description: "Explore the oldest medieval city in the world",
    image: "https://images.unsplash.com/photo-1548019979-6fedb53d9946",
    location: "Fes, Morocco",
    rating: 4.7,
    featured: true
  },
  {
    id: "sahara",
    title: "Sahara Desert",
    description: "Experience the magic of the golden dunes under starlit skies",
    image: "https://images.unsplash.com/photo-1548234955-bc46f1d2b54c",
    location: "Merzouga, Morocco",
    rating: 4.9,
    featured: true
  }
];
