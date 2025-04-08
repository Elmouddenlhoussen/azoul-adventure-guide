
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Star, Wifi, Coffee, Utensils, Users, Bath, ParkingSquare, PhoneCall, Mail, ExternalLink } from 'lucide-react';

// Sample accommodation data
const accommodations = [
  {
    id: 'riad-marrakech',
    name: 'Riad Al Andalous',
    location: 'Marrakech',
    description: "Experience authentic Moroccan hospitality at this beautiful riad located in the heart of Marrakech's historic medina.",
    about: "Nestled within the ancient walls of Marrakech's medina, Riad Al Andalous offers an oasis of tranquility just steps from the bustling souks and Jemaa el-Fnaa square.\n\nThis traditional Moroccan house has been meticulously restored to showcase its original architectural features while providing modern comforts. Built around a central courtyard with a refreshing plunge pool, the riad features hand-crafted zellige tiles, carved cedar wood, and ornate plasterwork throughout.\n\nEach of our seven uniquely decorated rooms combines authentic Moroccan design with contemporary amenities. Guests can enjoy our rooftop terrace with panoramic views of the medina and Atlas Mountains, perfect for breakfast or evening relaxation under the stars.\n\nOur attentive staff provides personalized service to ensure an unforgettable stay, offering local insights and arranging experiences from cooking classes to desert excursions.",
    features: ['Rooftop Terrace', 'Plunge Pool', 'Free WiFi', 'Breakfast Included', 'Airport Transfer Available', 'Concierge Service'],
    amenities: ['Air Conditioning', 'En-suite Bathrooms', 'Traditional Hammam', 'Restaurant', 'Room Service', '24-Hour Reception'],
    price: 120,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1520904740785-e5199d0b4038?w=1200&h=400&fit=crop',
    rooms: [
      {
        id: 'standard-room',
        name: 'Standard Room',
        price: 120,
        size: '25m²',
        beds: '1 Queen Bed',
        occupancy: '2 Guests',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop'
      },
      {
        id: 'deluxe-room',
        name: 'Deluxe Room',
        price: 160,
        size: '35m²',
        beds: '1 King Bed',
        occupancy: '2 Guests',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop'
      },
      {
        id: 'suite',
        name: 'Royal Suite',
        price: 220,
        size: '50m²',
        beds: '1 King Bed',
        occupancy: '2 Adults + 1 Child',
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=300&h=200&fit=crop'
      }
    ],
    reviews: [
      {
        id: 1,
        name: "David M.",
        country: "United Kingdom",
        date: "April 2, 2023",
        rating: 5,
        text: "This riad exceeded our expectations. The attention to detail in the decor, the friendly and helpful staff, and the amazing breakfast on the rooftop terrace made our stay in Marrakech truly special."
      },
      {
        id: 2,
        name: "Sophie L.",
        country: "France",
        date: "March 15, 2023",
        rating: 4,
        text: "Beautiful traditional riad with comfortable rooms and excellent service. The location is perfect - quiet but just minutes from the main square and souks."
      },
      {
        id: 3,
        name: "Michael T.",
        country: "United States",
        date: "February 28, 2023",
        rating: 5,
        text: "An amazing place to stay! The architecture and design are stunning, and the staff went above and beyond to make our stay memorable. Would definitely return."
      }
    ],
    availability: ["April", "May", "June", "September", "October", "November"],
    contact: {
      email: "info@riadalandalous.com",
      phone: "+212 524 378 565",
      website: "www.riadalandalous.com"
    }
  }
];

const AccommodationDetailPage = () => {
  const { accommodationId } = useParams<{ accommodationId: string }>();
  const accommodation = accommodations.find(a => a.id === accommodationId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (accommodation) {
      document.title = `${accommodation.name} | Azoul Morocco Accommodations`;
    }
  }, [accommodation]);
  
  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Accommodation not found</h2>
          <p className="mb-4">The accommodation you're looking for doesn't exist or has been moved.</p>
          <Link to="/feature/accommodations" className="text-morocco-clay hover:text-morocco-terracotta">
            Browse all accommodations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section with Cover Photo */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={accommodation.coverImage} 
              alt={`${accommodation.name} cover`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          {/* Accommodation Info Section */}
          <div className="container mx-auto px-4 -mt-20 relative z-10">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold mb-2">{accommodation.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">{accommodation.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-gray-600">{accommodation.rating} ({accommodation.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{accommodation.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {accommodation.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="bg-morocco-sand/20 text-morocco-clay text-xs px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="shrink-0 flex flex-col gap-3 md:w-64">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-morocco-clay mb-1">${accommodation.price}</p>
                    <p className="text-sm text-gray-500 mb-4">per night</p>
                    <Button className="w-full mb-2">Book Now</Button>
                    <Button variant="outline" className="w-full">Check Availability</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">About {accommodation.name}</h2>
                {accommodation.about.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700">{paragraph}</p>
                ))}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-morocco-sand/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Amenities</h3>
                    <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                      {accommodation.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          {amenity.includes("WiFi") && <Wifi className="h-4 w-4 mr-2 text-morocco-clay" />}
                          {amenity.includes("Breakfast") && <Coffee className="h-4 w-4 mr-2 text-morocco-clay" />}
                          {amenity.includes("Restaurant") && <Utensils className="h-4 w-4 mr-2 text-morocco-clay" />}
                          {amenity.includes("Bathroom") && <Bath className="h-4 w-4 mr-2 text-morocco-clay" />}
                          {amenity.includes("Parking") && <ParkingSquare className="h-4 w-4 mr-2 text-morocco-clay" />}
                          {!amenity.includes("WiFi") && 
                           !amenity.includes("Breakfast") && 
                           !amenity.includes("Restaurant") && 
                           !amenity.includes("Bathroom") && 
                           !amenity.includes("Parking") && 
                           <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2"></span>}
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-morocco-sand/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <PhoneCall className="h-5 w-5 mr-3 text-morocco-clay shrink-0 mt-0.5" />
                        <span>{accommodation.contact.phone}</span>
                      </li>
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-morocco-clay shrink-0 mt-0.5" />
                        <span>{accommodation.contact.email}</span>
                      </li>
                      <li className="flex items-start">
                        <ExternalLink className="h-5 w-5 mr-3 text-morocco-clay shrink-0 mt-0.5" />
                        <a href={`https://${accommodation.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-morocco-clay hover:underline">
                          {accommodation.contact.website}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Availability</h3>
                  <p className="mb-4">The accommodation is available during these months:</p>
                  <div className="flex flex-wrap gap-2">
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                      <span
                        key={month}
                        className={`px-3 py-1 rounded-full text-sm ${
                          accommodation.availability.includes(month)
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rooms">
                <h2 className="text-2xl font-bold mb-6">Rooms at {accommodation.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accommodation.rooms.map((room) => (
                    <Card key={room.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={room.image} 
                          alt={room.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {room.occupancy}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="inline-block w-4 mr-2">🛏️</span>
                            {room.beds}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="inline-block w-4 mr-2">📏</span>
                            {room.size}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-morocco-clay text-xl font-bold">${room.price}/night</span>
                          <Button>Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Guest Reviews</h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                    <span className="text-xl font-bold">{accommodation.rating}</span>
                    <span className="text-gray-500 ml-2">({accommodation.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {accommodation.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.country}</p>
                        </div>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{review.date}</p>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-6" variant="outline">Show All Reviews</Button>
              </TabsContent>
              
              <TabsContent value="location">
                <h2 className="text-2xl font-bold mb-6">Location</h2>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-96 mb-8">
                  {/* Map placeholder - in real project would use Google Maps or similar */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">Interactive map would be displayed here</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Address</h3>
                    <p className="text-gray-700 mb-6">
                      123 Derb El Cadi, Rue Riad Zitoun El Kdim<br />
                      Medina, Marrakech 40000<br />
                      Morocco
                    </p>
                    
                    <h3 className="text-xl font-bold mb-4">Nearby Attractions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2 mt-2"></span>
                        <span>Jemaa el-Fnaa Square (5-minute walk)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2 mt-2"></span>
                        <span>Bahia Palace (10-minute walk)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2 mt-2"></span>
                        <span>Souks (8-minute walk)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2 mt-2"></span>
                        <span>Koutoubia Mosque (15-minute walk)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Getting There</h3>
                    <ul className="space-y-4">
                      <li>
                        <p className="font-medium mb-1">From Marrakech Menara Airport (RAK)</p>
                        <p className="text-gray-700">20-minute drive (7.5 km). Airport transfers available for an additional fee.</p>
                      </li>
                      <li>
                        <p className="font-medium mb-1">From Marrakech Train Station</p>
                        <p className="text-gray-700">15-minute drive (3.5 km). Taxis readily available.</p>
                      </li>
                      <li>
                        <p className="font-medium mb-1">Parking</p>
                        <p className="text-gray-700">No on-site parking. Public parking available at Jemaa el-Fnaa (7-minute walk).</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* CTA Section */}
          <section className="bg-morocco-clay text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Experience {accommodation.name}?</h2>
                <p className="text-lg mb-8">
                  Book your stay now and immerse yourself in authentic Moroccan hospitality at this beautiful {accommodation.location} accommodation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-morocco-clay">
                    View All Rooms
                  </Button>
                  <Button className="bg-white text-morocco-clay hover:bg-gray-100">
                    Book Now
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

export default AccommodationDetailPage;
