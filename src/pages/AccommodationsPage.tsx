
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Wifi, Coffee, Users, Bath, Star, BedDouble } from 'lucide-react';

// Sample data for accommodations
const accommodations = [
  {
    id: 'riad-yasmine',
    name: 'Riad Yasmine',
    type: 'riad',
    location: 'Marrakech',
    description: 'A stunning traditional riad with a famous courtyard pool, located in the heart of the Marrakech medina.',
    price: 150,
    rating: 4.9,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=800&h=500&fit=crop',
    amenities: ['Pool', 'Free WiFi', 'Breakfast Included', 'Air Conditioning', 'Rooftop Terrace'],
    rooms: 8,
    featured: true
  },
  {
    id: 'kasbah-tamadot',
    name: 'Kasbah Tamadot',
    type: 'luxury',
    location: 'Atlas Mountains',
    description: 'Sir Richard Branson\'s Moroccan retreat offering luxury accommodations with stunning mountain views.',
    price: 570,
    rating: 4.9,
    reviews: 176,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop',
    amenities: ['Infinity Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Mountain Views'],
    rooms: 28,
    featured: true
  },
  {
    id: 'desert-luxury-camp',
    name: 'Desert Luxury Camp',
    type: 'unique',
    location: 'Sahara Desert, Merzouga',
    description: 'Luxury camping in the Sahara Desert with private tents, gourmet dining, and stargazing experiences.',
    price: 280,
    rating: 4.8,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&h=500&fit=crop',
    amenities: ['Private Bathroom', 'Gourmet Dining', 'Camel Rides', 'Stargazing', 'Cultural Activities'],
    rooms: 12,
    featured: true
  },
  {
    id: 'riad-fes',
    name: 'Riad Fes',
    type: 'riad',
    location: 'Fes',
    description: 'Elegant riad combining traditional Moroccan architecture with modern luxury in the ancient medina of Fes.',
    price: 220,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=500&fit=crop',
    amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Concierge Service'],
    rooms: 15,
    featured: false
  },
  {
    id: 'lina-ryad-spa',
    name: 'Lina Ryad & Spa',
    type: 'riad',
    location: 'Chefchaouen',
    description: 'Charming riad in the blue city featuring a traditional hammam spa and panoramic terrace views.',
    price: 120,
    rating: 4.7,
    reviews: 132,
    image: 'https://images.unsplash.com/photo-1539758462369-43adaa19bc1f?w=800&h=500&fit=crop',
    amenities: ['Spa', 'Panoramic Terrace', 'Restaurant', 'Free WiFi', 'Air Conditioning'],
    rooms: 11,
    featured: false
  },
  {
    id: 'dar-ahlam',
    name: 'Dar Ahlam',
    type: 'unique',
    location: 'Ouarzazate',
    description: 'Exclusive desert castle offering bespoke experiences and personalized service in a stunning oasis setting.',
    price: 780,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1548759806-821a0ac382d6?w=800&h=500&fit=crop',
    amenities: ['Private Pool Suites', 'Customized Dining', 'Excursions', 'Gardens', 'Butler Service'],
    rooms: 14,
    featured: true
  },
];

const AccommodationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodations);
  
  useEffect(() => {
    document.title = 'Luxury Accommodations | Azoul Morocco';
    window.scrollTo(0, 0);
    
    if (activeTab === 'all') {
      setFilteredAccommodations(accommodations);
    } else {
      setFilteredAccommodations(accommodations.filter(acc => acc.type === activeTab));
    }
  }, [activeTab]);

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="bg-morocco-sand/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Luxury Accommodations in Morocco</h1>
                <p className="text-lg text-gray-700 mb-8">
                  Experience the magic of Morocco with our handpicked selection of stunning riads, luxury hotels, and unique stays that capture the essence of Moroccan hospitality.
                </p>
                <Button size="lg" className="bg-morocco-clay hover:bg-morocco-clay/90">
                  Explore All Stays
                </Button>
              </div>
            </div>
          </section>
          
          {/* Featured Accommodations */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">Featured Accommodations</h2>
              <p className="text-lg text-gray-600 mb-8">Our most sought-after places to stay</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodations.filter(acc => acc.featured).slice(0, 3).map((accommodation) => (
                  <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={accommodation.image} 
                        alt={accommodation.name}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                        {accommodation.location}
                      </div>
                      <div className="absolute top-4 right-4 bg-morocco-clay text-white rounded-full px-3 py-1 text-sm flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {accommodation.rating}
                      </div>
                    </div>
                    
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold mb-2">{accommodation.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{accommodation.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                          <span 
                            key={index} 
                            className="flex items-center bg-morocco-sand/20 text-morocco-clay text-xs px-2 py-1 rounded-full"
                          >
                            {amenity === 'Free WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                            {amenity === 'Breakfast Included' && <Coffee className="h-3 w-3 mr-1" />}
                            {amenity === 'Private Bathroom' && <Bath className="h-3 w-3 mr-1" />}
                            {amenity === 'Pool' && <BedDouble className="h-3 w-3 mr-1" />}
                            {amenity}
                          </span>
                        ))}
                        {accommodation.amenities.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{accommodation.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-morocco-clay font-bold text-xl">${accommodation.price}</span>
                          <span className="text-sm text-gray-500"> / night</span>
                        </div>
                        <span className="text-sm text-gray-500">{accommodation.reviews} reviews</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button asChild className="w-full">
                        <Link to={`/accommodation/${accommodation.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* All Accommodations */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">All Accommodations</h2>
              
              <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 sm:grid-cols-4 w-full max-w-md mx-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="riad">Riads</TabsTrigger>
                  <TabsTrigger value="luxury">Luxury</TabsTrigger>
                  <TabsTrigger value="unique">Unique</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAccommodations.map((accommodation) => (
                  <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5">
                        <img 
                          src={accommodation.image} 
                          alt={accommodation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-3/5 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{accommodation.name}</h3>
                          <div className="flex items-center bg-morocco-clay/10 text-morocco-clay px-2 py-1 rounded-full">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            {accommodation.rating}
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                          <span className="text-sm text-gray-500">{accommodation.location}</span>
                          <div className="mx-2 bg-gray-300 h-1 w-1 rounded-full"></div>
                          <BedDouble className="h-4 w-4 mr-1" />
                          <span className="text-sm text-gray-500">{accommodation.rooms} rooms</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {accommodation.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                            <span 
                              key={index} 
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                          {accommodation.amenities.length > 4 && (
                            <span className="text-xs text-gray-500">
                              +{accommodation.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-morocco-clay font-bold text-xl">${accommodation.price}</span>
                            <span className="text-sm text-gray-500"> / night</span>
                          </div>
                          <Button asChild size="sm">
                            <Link to={`/accommodation/${accommodation.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
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
                <h2 className="text-3xl font-bold mb-6">Customized Accommodation Packages</h2>
                <p className="text-lg mb-8">
                  Looking for a special stay? Let our experts create a custom accommodation package tailored to your preferences and budget.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-morocco-clay">
                    Contact a Specialist
                  </Button>
                  <Button className="bg-white text-morocco-clay hover:bg-gray-100">
                    Book Consultation
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

export default AccommodationsPage;
