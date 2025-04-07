
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Star, CheckCircle, Wifi, Coffee, Bath, Utensils, Phone, Mail } from 'lucide-react';

// Sample accommodation data
const accommodations = [
  {
    id: 'riad-yasmine',
    name: 'Riad Yasmine',
    type: 'riad',
    location: 'Marrakech',
    address: '209 Rue Ank Jemel, Bab Taghzoute, Marrakech 40000',
    description: 'A stunning traditional riad with a famous courtyard pool, located in the heart of the Marrakech medina.',
    longDescription: `Riad Yasmine is a traditional Moroccan house centrally located in the heart of the Marrakech medina, just a 10-minute walk from the famous Jemaa el-Fnaa square.

This boutique hotel features 8 uniquely decorated rooms surrounding a picturesque central courtyard with its Instagram-famous geometric pool adorned with traditional Moroccan tiles. The riad beautifully combines authentic Moroccan architecture with modern comforts, creating a tranquil oasis in the bustling city.

Each room is elegantly decorated with handcrafted furniture, luxurious fabrics, and traditional Moroccan elements. Guests can enjoy a refreshing dip in the courtyard pool, relax on the rooftop terrace with panoramic views of Marrakech and the Atlas Mountains, or indulge in traditional Moroccan cuisine at the on-site restaurant.

The riad offers a range of services including airport transfers, guided tours, cooking classes, and spa treatments. The attentive staff is dedicated to ensuring a memorable stay, with personalized service that caters to your every need.

Riad Yasmine provides the perfect blend of luxury, authenticity, and tranquility for an unforgettable Moroccan experience.`,
    price: 150,
    rating: 4.9,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=800&h=500&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1520222390785-55feddfcbf77?w=800',
      'https://images.unsplash.com/photo-1560184909-ad5d9546cdb4?w=800',
      'https://images.unsplash.com/photo-1558524399-9815fbc7d85f?w=800',
      'https://images.unsplash.com/photo-1601751839329-a6bbe9b6b311?w=800'
    ],
    amenities: [
      'Swimming Pool', 
      'Free WiFi', 
      'Breakfast Included', 
      'Air Conditioning', 
      'Rooftop Terrace',
      'Restaurant',
      'Airport Shuttle',
      'Concierge Service',
      'Room Service',
      'Spa Services'
    ],
    rooms: [
      {
        name: 'Standard Double Room',
        description: 'Cozy room with a queen-sized bed, traditional decor, and a private bathroom.',
        price: 150,
        capacity: '2 guests',
        size: '25 m²',
        amenities: ['Air Conditioning', 'Private Bathroom', 'Free WiFi', 'Safe'],
        image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&h=300&fit=crop'
      },
      {
        name: 'Deluxe Room',
        description: 'Spacious room with a king-sized bed, sitting area, and courtyard view.',
        price: 200,
        capacity: '2 guests',
        size: '35 m²',
        amenities: ['Air Conditioning', 'Private Bathroom', 'Free WiFi', 'Safe', 'Sitting Area'],
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop'
      },
      {
        name: 'Suite',
        description: 'Luxurious suite with a king-sized bed, separate sitting area, and premium amenities.',
        price: 250,
        capacity: '3 guests',
        size: '45 m²',
        amenities: ['Air Conditioning', 'Private Bathroom', 'Free WiFi', 'Safe', 'Sitting Area', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&h=300&fit=crop'
      }
    ],
    dining: {
      restaurant: {
        name: 'Le Restaurant',
        description: 'Authentic Moroccan cuisine using fresh local ingredients.',
        specialties: ['Moroccan Tagine', 'Couscous', 'Pastilla'],
        hours: '7:00 AM - 10:00 PM'
      },
      breakfast: {
        description: 'Complimentary breakfast includes fresh pastries, fruits, yogurt, eggs, and Moroccan specialties.',
        hours: '7:00 AM - 10:30 AM'
      }
    },
    activities: [
      {
        name: 'Cooking Class',
        description: 'Learn to prepare traditional Moroccan dishes with our chef.',
        price: 60,
        duration: '3 hours'
      },
      {
        name: 'Spa Treatment',
        description: 'Traditional hammam and massage treatments.',
        price: 80,
        duration: '1.5 hours'
      },
      {
        name: 'City Tour',
        description: 'Guided tour of Marrakech's main attractions.',
        price: 45,
        duration: '4 hours'
      }
    ],
    nearbyAttractions: [
      {
        name: 'Jemaa el-Fnaa Square',
        distance: '10 minutes walking',
        description: 'Famous market square and UNESCO World Heritage site.'
      },
      {
        name: 'Bahia Palace',
        distance: '15 minutes walking',
        description: '19th-century palace known for its stunning architecture.'
      },
      {
        name: 'Majorelle Garden',
        distance: '10 minutes by taxi',
        description: 'Botanical garden and artist's landscape garden.'
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Laura M.',
        country: 'United States',
        date: 'April 15, 2023',
        rating: 5,
        text: 'Absolutely stunning riad! The courtyard with the pool is even more beautiful in person. Staff was incredibly attentive and the food was delicious. Our room was spacious and immaculately clean. Highly recommend!'
      },
      {
        id: 2,
        name: 'James W.',
        country: 'United Kingdom',
        date: 'March 22, 2023',
        rating: 5,
        text: 'A beautiful oasis in the bustling medina. The decor is amazing, breakfast on the terrace was a highlight every morning, and the staff went above and beyond to make our stay special.'
      },
      {
        id: 3,
        name: 'Sophia G.',
        country: 'Canada',
        date: 'February 18, 2023',
        rating: 4,
        text: 'Gorgeous riad with excellent service. The location is perfect for exploring the medina. Only small issue was that our room was a bit dark, but it was still beautifully decorated and comfortable.'
      }
    ],
    contact: {
      phone: '+212 524 37 87 95',
      email: 'info@riadyasmine.com',
      website: 'www.riadyasmine.com',
      socialMedia: {
        instagram: '@riad_yasmine',
        facebook: 'RiadYasmineMarrakech'
      }
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
          {/* Hero Section with Gallery */}
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img 
              src={accommodation.image} 
              alt={accommodation.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{accommodation.name}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{accommodation.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                    <span>{accommodation.rating} ({accommodation.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Accommodation Gallery Thumbnails */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex overflow-x-auto gap-3 pb-3">
              {accommodation.galleryImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${accommodation.name} gallery ${index + 1}`} 
                  className="h-24 w-40 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                />
              ))}
            </div>
          </div>
          
          {/* Main Content with Sidebar */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rooms">Rooms</TabsTrigger>
                    <TabsTrigger value="dining">Dining</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{accommodation.name}</h2>
                      {accommodation.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                      ))}
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {accommodation.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-morocco-clay" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Location</h2>
                      <div className="bg-gray-100 p-4 rounded-md mb-4">
                        <p className="text-gray-700">
                          <MapPin className="h-4 w-4 inline mr-2 text-morocco-clay" />
                          {accommodation.address}
                        </p>
                      </div>
                      <div className="aspect-[16/9] bg-gray-200 rounded-md">
                        {/* Placeholder for map - would typically be a Google Maps or similar embed */}
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-gray-500">Map view loading...</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Nearby Attractions</h2>
                      <div className="space-y-4">
                        {accommodation.nearbyAttractions.map((attraction, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-bold mb-1">{attraction.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{attraction.distance}</p>
                            <p className="text-gray-700">{attraction.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Activities</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accommodation.activities.map((activity, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h3 className="font-bold mb-1">{activity.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {activity.duration} • ${activity.price} per person
                              </p>
                              <p className="text-gray-700 text-sm">{activity.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rooms">
                    <h2 className="text-2xl font-bold mb-6">Rooms & Suites</h2>
                    <div className="space-y-8">
                      {accommodation.rooms.map((room, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 border-b pb-6">
                          <div className="md:w-1/3">
                            <img 
                              src={room.image} 
                              alt={room.name}
                              className="w-full h-48 object-cover rounded-md"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold">{room.name}</h3>
                              <div>
                                <span className="text-morocco-clay font-bold">${room.price}</span>
                                <span className="text-gray-500"> / night</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-4">{room.description}</p>
                            
                            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Capacity:</span> {room.capacity}
                              </div>
                              <div>
                                <span className="font-medium">Size:</span> {room.size}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {room.amenities.map((amenity, i) => (
                                <span 
                                  key={i} 
                                  className="bg-morocco-sand/20 text-morocco-clay text-xs px-2 py-1 rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            
                            <Button>Book Now</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dining">
                    <h2 className="text-2xl font-bold mb-6">Dining Experience</h2>
                    
                    <div className="mb-8">
                      <div className="bg-morocco-sand/10 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                          <Utensils className="h-5 w-5 mr-2 text-morocco-clay" />
                          {accommodation.dining.restaurant.name}
                        </h3>
                        <p className="text-gray-700 mb-4">{accommodation.dining.restaurant.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {accommodation.dining.restaurant.specialties.map((specialty, index) => (
                              <span 
                                key={index} 
                                className="bg-white text-morocco-clay text-sm px-3 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Hours: </span>
                          {accommodation.dining.restaurant.hours}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-morocco-sand/10 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                          <Coffee className="h-5 w-5 mr-2 text-morocco-clay" />
                          Breakfast
                        </h3>
                        <p className="text-gray-700 mb-4">{accommodation.dining.breakfast.description}</p>
                        
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Hours: </span>
                          {accommodation.dining.breakfast.hours}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                        <span className="text-xl font-bold">{accommodation.rating}</span>
                        <span className="text-gray-500 ml-2">({accommodation.reviews.length} reviews)</span>
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
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{review.date}</p>
                          <p className="text-gray-700">{review.text}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="mt-6" variant="outline">Write a Review</Button>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-morocco-clay">${accommodation.price}</div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <label className="text-sm text-gray-600 mb-1 block">Check-in</label>
                          <input
                            type="date"
                            className="w-full border rounded-md p-2"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-sm text-gray-600 mb-1 block">Check-out</label>
                          <input
                            type="date"
                            className="w-full border rounded-md p-2"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Guests</label>
                        <select className="w-full border rounded-md p-2">
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Room Type</label>
                        <select className="w-full border rounded-md p-2">
                          {accommodation.rooms.map((room, index) => (
                            <option key={index} value={room.name}>
                              {room.name} - ${room.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6">Check Availability</Button>
                    
                    <div className="mt-6 text-sm text-gray-500 space-y-2">
                      <p className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Free cancellation up to 48 hours before
                      </p>
                      <p className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        No prepayment needed
                      </p>
                      <p className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Best price guarantee
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-morocco-clay" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">{accommodation.contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-morocco-clay" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">{accommodation.contact.email}</p>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" className="w-full">Send Message</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Similar Accommodations */}
          <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Similar Accommodations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={`https://images.unsplash.com/photo-154879075${i * 1000}-c4d54a0e7a5?w=400&h=200&fit=crop`}
                        alt={`Similar accommodation ${i}`}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <div className="flex items-center px-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="ml-1 text-xs font-medium">4.{7 + i}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">Beautiful Riad {i}</h3>
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Marrakech</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-morocco-clay font-bold">${120 + i * 20}</span>
                          <span className="text-xs text-gray-500"> / night</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-morocco-clay">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
