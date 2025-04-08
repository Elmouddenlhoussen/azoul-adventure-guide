
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Bath, Users, Utensils, AirVent, Bed, Coffee, Check, X } from 'lucide-react';

// Sample accommodation data
const accommodations = [
  {
    id: 'riad-al-andalous',
    name: 'Riad Al Andalous',
    tagline: 'Traditional Moroccan luxury in the heart of Marrakech',
    description: "Experience the charm of a traditional Moroccan riad with modern comforts. Riad Al Andalous offers an authentic stay with ornate architecture, a serene courtyard with plunge pool, and a rooftop terrace overlooking the medina. Just a 10-minute walk from the famous Jemaa el-Fnaa square, it's perfectly located for exploring Marrakech's historic attractions.",
    location: 'Marrakech, Morocco',
    address: '27 Derb Moulay Abdelkader, Medina, Marrakech 40000, Morocco',
    price: 120,
    rating: 4.8,
    reviewCount: 158,
    type: 'Riad',
    features: ['Free WiFi', 'Air conditioning', 'Swimming pool', 'Breakfast included', 'Airport transfers', 'Rooftop terrace', 'Daily housekeeping'],
    amenities: {
      roomFeatures: ['Air conditioning', 'Private bathroom', 'Free toiletries', 'Hairdryer', 'Safe', 'Premium bedding'],
      propertyAmenities: ['Swimming pool', 'Rooftop terrace', 'Restaurant', 'Room service', '24-hour front desk', 'Concierge service'],
      dining: ['Breakfast included', 'Restaurant on-site', 'Room service', 'Special diet menus on request']
    },
    rooms: [
      {
        name: 'Standard Room',
        price: 120,
        description: 'Traditional room featuring a queen-sized bed, private bathroom, and authentic Moroccan décor.',
        occupancy: '2 guests',
        beds: '1 Queen bed'
      },
      {
        name: 'Deluxe Room',
        price: 150,
        description: 'Spacious room with a king-sized bed, sitting area, private bathroom, and courtyard views.',
        occupancy: '2 guests',
        beds: '1 King bed'
      },
      {
        name: 'Family Suite',
        price: 220,
        description: 'Two connected rooms perfect for families, featuring a king-sized bed in one room and two twin beds in the other.',
        occupancy: '4 guests',
        beds: '1 King bed, 2 Twin beds'
      }
    ],
    mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=400&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1633847734607-9a2ab8ee3b83?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1532248339255-617b161a223c?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1604710063041-95c6e38bf025?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1584962118157-8629a8e721d7?w=300&h=200&fit=crop',
    ],
    reviews: [
      {
        id: 1,
        name: 'Emma W.',
        country: 'Canada',
        date: 'April 12, 2023',
        rating: 5,
        text: "This riad is absolutely stunning! The attention to detail in the decor is amazing, and the staff made us feel like family. Breakfast on the rooftop terrace was a highlight each morning. The location is perfect - quiet but close to all the main attractions."
      },
      {
        id: 2,
        name: 'Miguel S.',
        country: 'Spain',
        date: 'March 24, 2023',
        rating: 4,
        text: "Beautiful traditional riad with excellent service. The courtyard with the pool is a peaceful oasis after busy days in the medina. Rooms are comfortable and authentically decorated. Only small issue was occasional noise from the nearby mosque very early in the morning."
      },
      {
        id: 3,
        name: 'Laura P.',
        country: 'United Kingdom',
        date: 'February 18, 2023',
        rating: 5,
        text: "One of the best places we've stayed in Morocco. The staff arranged a wonderful private dinner for us in the courtyard. The room was spacious, beautifully decorated with local artisan work, and the bed was extremely comfortable. Highly recommend!"
      }
    ],
    policies: {
      checkIn: '2:00 PM - 10:00 PM',
      checkOut: 'Until 12:00 PM',
      cancellation: 'Free cancellation up to 7 days before arrival. Cancellations within 7 days of arrival are subject to a one-night charge.',
      children: 'Children of all ages are welcome.',
      pets: 'Pets are not allowed.',
      smoking: 'Smoking is not permitted inside the property.',
      payments: 'Accepts credit cards and cash.'
    },
    faqs: [
      {
        question: 'Is airport transfer available?',
        answer: 'Yes, we offer airport transfers for an additional fee of €20 each way. Please contact us in advance to arrange this service.'
      },
      {
        question: 'Can you accommodate special dietary requirements?',
        answer: 'Yes, our kitchen can accommodate vegetarian, vegan, gluten-free, and other dietary requirements with advance notice.'
      },
      {
        question: 'Is there parking available nearby?',
        answer: 'As we are located in the medina (car-free zone), there is no direct parking. However, there is a secure parking lot about a 5-minute walk from the riad, priced at €5 per day.'
      },
      {
        question: 'Do you offer excursions or tour services?',
        answer: 'Yes, our concierge can arrange guided tours, day trips to the Atlas Mountains, desert excursions, and other activities.'
      }
    ],
    nearby: ['Jemaa el-Fnaa square (10-minute walk)', 'Bahia Palace (15-minute walk)', 'Koutoubia Mosque (12-minute walk)', 'Majorelle Garden (30-minute walk or 10-minute taxi ride)']
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
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{accommodation.name}</h1>
                <p className="text-lg opacity-90">{accommodation.tagline}</p>
              </div>
            </div>
          </div>
          
          {/* Accommodation Info Section */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Content */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge className="bg-morocco-clay hover:bg-morocco-clay/80">{accommodation.type}</Badge>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">{accommodation.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-gray-600">{accommodation.rating} ({accommodation.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex gap-4 mb-6">
                      <img 
                        src={accommodation.mainImage} 
                        alt={accommodation.name} 
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {accommodation.galleryImages.map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`${accommodation.name} gallery ${index + 1}`} 
                          className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg mb-6">{accommodation.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 my-6">
                    {accommodation.features.map((feature, index) => (
                      <span key={index} className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                        <Check className="h-3.5 w-3.5 mr-1.5 text-morocco-clay" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tabs Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <Tabs defaultValue="rooms" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                      <TabsTrigger value="rooms">Rooms</TabsTrigger>
                      <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      <TabsTrigger value="policies">Policies</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="rooms" className="space-y-6">
                      <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
                      
                      <div className="space-y-6">
                        {accommodation.rooms.map((room, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                              <div className="md:col-span-2 p-6">
                                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {room.occupancy}
                                  </div>
                                  <div className="flex items-center">
                                    <Bed className="h-4 w-4 mr-1" />
                                    {room.beds}
                                  </div>
                                </div>
                                <p className="text-gray-700">{room.description}</p>
                              </div>
                              <div className="p-6 bg-gray-50 flex flex-col items-center justify-center border-l">
                                <p className="text-2xl font-bold text-morocco-clay">${room.price}</p>
                                <p className="text-gray-500 mb-4">per night</p>
                                <Button className="w-full">Book Now</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="amenities">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h2 className="text-xl font-bold mb-4 flex items-center">
                            <Bed className="h-5 w-5 mr-2 text-morocco-clay" />
                            Room Features
                          </h2>
                          <ul className="space-y-3">
                            {accommodation.amenities.roomFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-green-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h2 className="text-xl font-bold mb-4 flex items-center">
                            <Bath className="h-5 w-5 mr-2 text-morocco-clay" />
                            Property Amenities
                          </h2>
                          <ul className="space-y-3">
                            {accommodation.amenities.propertyAmenities.map((amenity, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-green-600" />
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h2 className="text-xl font-bold mb-4 flex items-center">
                            <Utensils className="h-5 w-5 mr-2 text-morocco-clay" />
                            Dining
                          </h2>
                          <ul className="space-y-3">
                            {accommodation.amenities.dining.map((item, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-green-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-8 border-t">
                        <h2 className="text-2xl font-bold mb-4">Nearby Attractions</h2>
                        <ul className="space-y-2">
                          {accommodation.nearby.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <MapPin className="h-4 w-4 mr-3 text-morocco-clay" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="policies">
                      <h2 className="text-2xl font-bold mb-6">Hotel Policies</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Check-in / Check-out</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Check-in Time</p>
                                <p>{accommodation.policies.checkIn}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Check-out Time</p>
                                <p>{accommodation.policies.checkOut}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
                            <p>{accommodation.policies.cancellation}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">House Rules</h3>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <div className="mt-0.5">
                                  {accommodation.policies.children.includes("welcome") ? 
                                    <Check className="h-4 w-4 mr-2 text-green-600" /> : 
                                    <X className="h-4 w-4 mr-2 text-red-600" />
                                  }
                                </div>
                                <div>
                                  <span className="font-medium">Children:</span> {accommodation.policies.children}
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mt-0.5">
                                  {accommodation.policies.pets.includes("allowed") ? 
                                    <Check className="h-4 w-4 mr-2 text-green-600" /> : 
                                    <X className="h-4 w-4 mr-2 text-red-600" />
                                  }
                                </div>
                                <div>
                                  <span className="font-medium">Pets:</span> {accommodation.policies.pets}
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mt-0.5">
                                  {accommodation.policies.smoking.includes("permitted") ? 
                                    <Check className="h-4 w-4 mr-2 text-green-600" /> : 
                                    <X className="h-4 w-4 mr-2 text-red-600" />
                                  }
                                </div>
                                <div>
                                  <span className="font-medium">Smoking:</span> {accommodation.policies.smoking}
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mt-0.5">
                                  <Check className="h-4 w-4 mr-2 text-green-600" /> 
                                </div>
                                <div>
                                  <span className="font-medium">Payments:</span> {accommodation.policies.payments}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
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
                      
                      <Button className="mt-6" variant="outline">
                        Show All Reviews
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* FAQ Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {accommodation.faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Booking Widget */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <div className="mb-4 pb-4 border-b">
                    <h3 className="text-2xl font-bold text-morocco-clay">${accommodation.price}</h3>
                    <p className="text-gray-500">per night</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
                          Check In
                        </label>
                        <input 
                          type="date"
                          id="check-in"
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-morocco-clay"
                        />
                      </div>
                      <div>
                        <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
                          Check Out
                        </label>
                        <input 
                          type="date"
                          id="check-out"
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-morocco-clay"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
                      <select 
                        id="guests"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-morocco-clay"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="room-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Room Type
                      </label>
                      <select 
                        id="room-type"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-morocco-clay"
                      >
                        {accommodation.rooms.map((room, index) => (
                          <option key={index} value={room.name.toLowerCase().replace(' ', '-')}>
                            {room.name} (${room.price}/night)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-4">Check Availability</Button>
                  <Button variant="outline" className="w-full">Contact Property</Button>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3">Property Highlights</h3>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-morocco-clay" />
                        <span className="text-sm">Free WiFi</span>
                      </div>
                      <div className="flex items-center">
                        <Coffee className="h-4 w-4 mr-2 text-morocco-clay" />
                        <span className="text-sm">Breakfast included</span>
                      </div>
                      <div className="flex items-center">
                        <AirVent className="h-4 w-4 mr-2 text-morocco-clay" />
                        <span className="text-sm">Air conditioning</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-morocco-clay" />
                        <span className="text-sm">Central location</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default AccommodationDetailPage;
