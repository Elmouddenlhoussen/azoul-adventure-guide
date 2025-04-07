
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Calendar, Star } from 'lucide-react';

// Sample data for tours
const tours = [
  {
    id: 'medina-food',
    title: 'Medina Food Tour',
    description: 'Explore the vibrant flavors of Morocco through a guided food tour in the ancient medina of Marrakech.',
    location: 'Marrakech',
    duration: '4 hours',
    groupSize: 'Small (max 8)',
    price: 65,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: 'crafts-workshop',
    title: 'Traditional Crafts Workshop',
    description: 'Learn the ancient art of Moroccan craftsmanship with local artisans in the historic city of Fes.',
    location: 'Fes',
    duration: '3 hours',
    groupSize: 'Small (max 6)',
    price: 45,
    rating: 4.8,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: 'desert-music',
    title: 'Desert Music Experience',
    description: 'Immerse yourself in traditional Berber music under the stars in the Sahara Desert.',
    location: 'Merzouga',
    duration: '1 evening',
    groupSize: 'Medium (max 15)',
    price: 85,
    rating: 4.9,
    reviews: 104,
    image: 'https://images.unsplash.com/photo-1511185307590-3c29c11275ca?w=800&h=500&fit=crop',
    featured: false,
  },
  {
    id: 'tea-ceremony',
    title: 'Traditional Tea Ceremony',
    description: 'Learn the art of Moroccan mint tea preparation and its cultural significance.',
    location: 'Rabat',
    duration: '2 hours',
    groupSize: 'Small (max 8)',
    price: 35,
    rating: 4.7,
    reviews: 63,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&h=500&fit=crop',
    featured: false,
  },
  {
    id: 'blue-city',
    title: 'Blue City Photography Tour',
    description: 'Capture the stunning blue architecture of Chefchaouen with guidance from a professional photographer.',
    location: 'Chefchaouen',
    duration: '3 hours',
    groupSize: 'Small (max 6)',
    price: 50,
    rating: 4.8,
    reviews: 91,
    image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c408c7?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: 'berber-village',
    title: 'Berber Village Experience',
    description: 'Visit remote Berber villages in the Atlas Mountains and experience their traditional way of life.',
    location: 'High Atlas',
    duration: 'Full day',
    groupSize: 'Small (max 8)',
    price: 95,
    rating: 4.9,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1548018560-c7196d91a35f?w=800&h=500&fit=crop',
    featured: false,
  },
];

const CulturalToursPage = () => {
  useEffect(() => {
    document.title = 'Cultural Tours | Azoul Morocco';
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="bg-morocco-sand/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Cultural Tours of Morocco</h1>
                <p className="text-lg text-gray-700 mb-8">
                  Immerse yourself in Morocco's rich cultural heritage through our curated tours led by knowledgeable local guides. Experience traditional crafts, music, cuisine, and more.
                </p>
                <Button size="lg" className="bg-morocco-clay hover:bg-morocco-clay/90">
                  Browse All Tours
                </Button>
              </div>
            </div>
          </section>
          
          {/* Featured Tours */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">Featured Experiences</h2>
              <p className="text-lg text-gray-600 mb-8">Our most popular cultural experiences</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.filter(tour => tour.featured).map((tour) => (
                  <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                          {tour.location}
                        </div>
                        <div className="absolute top-4 right-4 bg-morocco-clay text-white rounded-full px-3 py-1 text-sm flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          {tour.rating}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          {tour.groupSize}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-morocco-clay font-bold text-xl">${tour.price}</span>
                        <span className="text-sm text-gray-500">per person</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button asChild className="w-full">
                        <Link to={`/tour/${tour.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* All Tours */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">All Cultural Experiences</h2>
              <p className="text-lg text-gray-600 mb-8">Discover our complete range of authentic cultural tours</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tours.map((tour) => (
                  <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                          <span className="text-sm text-gray-500">{tour.location}</span>
                          <div className="mx-2 bg-gray-300 h-1 w-1 rounded-full"></div>
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          <span className="text-sm text-gray-500">{tour.rating} ({tour.reviews} reviews)</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {tour.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              {tour.groupSize}
                            </div>
                          </div>
                          <span className="text-morocco-clay font-bold">${tour.price}</span>
                        </div>
                        
                        <Button asChild size="sm">
                          <Link to={`/tour/${tour.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="bg-morocco-clay text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Custom Cultural Experiences</h2>
                <p className="text-lg mb-8">
                  Looking for something specific? Our team can create personalized cultural experiences tailored to your interests and schedule.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-morocco-clay">
                    Contact Us
                  </Button>
                  <Button className="bg-white text-morocco-clay hover:bg-gray-100">
                    Plan My Trip
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default CulturalToursPage;
