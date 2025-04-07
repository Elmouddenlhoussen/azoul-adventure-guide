
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Clock, Users, Star, CheckCircle, X, Info } from 'lucide-react';

// Sample tour data
const tours = [
  {
    id: 'medina-food',
    title: 'Medina Food Tour',
    description: 'Explore the vibrant flavors of Morocco through a guided food tour in the ancient medina of Marrakech.',
    longDescription: `Discover the culinary secrets of Marrakech on this immersive food tour through the winding streets of the ancient medina. Led by our expert local guide Hassan, you'll taste your way through hidden food stalls, local bakeries, and spice markets that most tourists never discover.

This tour is designed for food enthusiasts who want to go beyond the surface and truly understand Moroccan cuisine and its cultural significance. Each tasting is accompanied by stories about the history, traditions, and people behind the food.

From sweet pastries to savory tagines, from street food to mint tea ceremonies, this experience will delight your taste buds while providing unique cultural insights. All food tastings are included in the price, giving you a complete culinary overview of Moroccan cuisine.

Our small group size ensures a personalized experience where you can interact with vendors, ask questions, and even learn some basic cooking techniques along the way.`,
    location: 'Marrakech',
    meetingPoint: 'Jemaa el-Fnaa Square, in front of Café de France',
    duration: '4 hours',
    groupSize: 'Small (max 8)',
    price: 65,
    rating: 4.9,
    reviews: 142,
    languages: ['English', 'French', 'Arabic'],
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=500&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
      'https://images.unsplash.com/photo-1517314687957-13af800de1c5?w=800',
      'https://images.unsplash.com/photo-1551632436-cbf6d5df0627?w=800',
      'https://images.unsplash.com/photo-1563305641-973faaa0e44e?w=800'
    ],
    included: [
      'All food tastings (equivalent to a full meal)',
      'Bottled water',
      'Tea and coffee',
      'Local guide',
      'Small group experience'
    ],
    notIncluded: [
      'Additional drinks',
      'Gratuities',
      'Hotel pickup and drop-off'
    ],
    highlights: [
      'Sample over 10 different Moroccan specialties',
      'Discover hidden food gems in the medina',
      'Learn about traditional cooking methods',
      'Meet local food vendors and artisans',
      'Small group size for a personalized experience'
    ],
    itinerary: [
      {
        time: '10:00 AM',
        activity: 'Meet at Jemaa el-Fnaa Square',
        description: 'Introduction to the tour and Moroccan food culture'
      },
      {
        time: '10:30 AM',
        activity: 'Visit local bakery',
        description: 'Taste traditional Moroccan bread and pastries'
      },
      {
        time: '11:15 AM',
        activity: 'Spice market exploration',
        description: 'Learn about essential Moroccan spices and their uses'
      },
      {
        time: '12:00 PM',
        activity: 'Street food tastings',
        description: 'Try popular Moroccan street foods like msemen and harcha'
      },
      {
        time: '1:00 PM',
        activity: 'Main course tasting',
        description: 'Sample traditional tagine at a local family-run restaurant'
      },
      {
        time: '1:45 PM',
        activity: 'Desserts and tea ceremony',
        description: 'Finish with sweet pastries and authentic mint tea'
      },
      {
        time: '2:00 PM',
        activity: 'Tour conclusion',
        description: 'Receive recommendations for restaurants and food shops'
      }
    ],
    guide: {
      id: 'hassan',
      name: 'Hassan El Ouazzani',
      bio: 'Food expert and certified tour guide with 15 years of experience',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    faqs: [
      {
        question: 'Are vegetarian options available?',
        answer: 'Yes, we can accommodate vegetarian diets. Please let us know in advance.'
      },
      {
        question: 'Is this tour suitable for children?',
        answer: 'The tour is suitable for children above 6 years, although some foods may be spicy.'
      },
      {
        question: 'How much walking is involved?',
        answer: 'The tour involves approximately 2-3 km of walking with multiple stops.'
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Emily R.',
        country: 'Canada',
        date: 'April 10, 2023',
        rating: 5,
        text: 'This food tour was the highlight of our trip! Hassan was knowledgeable and passionate about Moroccan cuisine. We visited places we never would have found on our own. The food was incredible and there was so much of it!'
      },
      {
        id: 2,
        name: 'Michael T.',
        country: 'Australia',
        date: 'March 22, 2023',
        rating: 5,
        text: 'A fantastic experience! The variety of foods we tried was impressive, and the small group size made it feel very personalized. I especially loved learning about the spices and traditional cooking methods.'
      },
      {
        id: 3,
        name: 'Sophia L.',
        country: 'United Kingdom',
        date: 'February 15, 2023',
        rating: 4,
        text: 'Great tour with delicious food tastings. Our guide was very informative. The only reason for 4 stars is that the tour ran a bit longer than scheduled, but honestly, it was because we were enjoying it so much!'
      }
    ],
    availableDates: [
      { date: '2023-05-15', spotsLeft: 6 },
      { date: '2023-05-16', spotsLeft: 4 },
      { date: '2023-05-17', spotsLeft: 8 },
      { date: '2023-05-18', spotsLeft: 3 },
      { date: '2023-05-19', spotsLeft: 5 }
    ]
  }
];

const TourDetailPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const tour = tours.find(t => t.id === tourId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (tour) {
      document.title = `${tour.title} | Azoul Morocco Tours`;
    }
  }, [tour]);
  
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tour not found</h2>
          <p className="mb-4">The tour you're looking for doesn't exist or has been moved.</p>
          <Link to="/feature/cultural-tours" className="text-morocco-clay hover:text-morocco-terracotta">
            Browse all tours
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
              src={tour.image} 
              alt={tour.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                    <span>{tour.rating} ({tour.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tour Gallery Thumbnails */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex overflow-x-auto gap-3 pb-3">
              {tour.galleryImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${tour.title} gallery ${index + 1}`} 
                  className="h-20 w-32 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
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
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="guide">Guide</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Tour Description</h2>
                      {tour.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                      ))}
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-morocco-clay shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-xl font-bold mb-3">What's Included</h2>
                        <ul className="space-y-2">
                          {tour.included.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-bold mb-3">What's Not Included</h2>
                        <ul className="space-y-2">
                          {tour.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <X className="h-5 w-5 mr-2 text-red-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-3">Important Information</h2>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <div className="flex">
                          <div className="shrink-0">
                            <Info className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">
                              Meeting Point: <span className="font-medium">{tour.meetingPoint}</span>
                            </p>
                            <p className="text-sm text-blue-700 mt-2">
                              Languages: <span className="font-medium">{tour.languages.join(', ')}</span>
                            </p>
                            <p className="text-sm text-blue-700 mt-2">
                              Group Size: <span className="font-medium">{tour.groupSize}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                      <div className="space-y-4">
                        {tour.faqs.map((faq, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold mb-2">{faq.question}</h3>
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="itinerary">
                    <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                    <div className="space-y-6">
                      {tour.itinerary.map((item, index) => (
                        <div key={index} className="relative pl-8 pb-6">
                          {index !== tour.itinerary.length - 1 && (
                            <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200" />
                          )}
                          <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-morocco-sand flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-morocco-clay font-bold">{item.time}</div>
                            <h3 className="text-lg font-bold">{item.activity}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="guide">
                    <h2 className="text-2xl font-bold mb-6">Your Guide</h2>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-morocco-sand/10 p-6 rounded-lg">
                      <div className="shrink-0">
                        <Avatar className="h-24 w-24 md:h-32 md:w-32">
                          <AvatarImage src={tour.guide.image} alt={tour.guide.name} />
                          <AvatarFallback>{tour.guide.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-center md:text-left">{tour.guide.name}</h3>
                        <p className="text-gray-600 mb-4 text-center md:text-left">{tour.guide.bio}</p>
                        
                        <Button asChild variant="outline">
                          <Link to={`/guide/${tour.guide.id}`}>
                            View Guide Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                        <span className="text-xl font-bold">{tour.rating}</span>
                        <span className="text-gray-500 ml-2">({tour.reviews.length} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {tour.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <p className="text-sm text-gray-500">{review.country}</p>
                              </div>
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
                    
                    <Button className="mt-6" variant="outline">Show All Reviews</Button>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-morocco-clay">${tour.price}</div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{tour.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group Size:</span>
                        <span className="font-medium">{tour.groupSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Languages:</span>
                        <span className="font-medium">{tour.languages.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Available Dates</h3>
                      <div className="space-y-2">
                        {tour.availableDates.map((availableDate, index) => (
                          <div 
                            key={index} 
                            className="flex justify-between items-center border p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-morocco-clay" />
                              <span>{availableDate.date}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">{availableDate.spotsLeft}</span> spots left
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full mb-3">Book Now</Button>
                    <Button variant="outline" className="w-full">Contact for Private Tour</Button>
                    
                    <div className="mt-6 text-sm text-gray-500">
                      <p className="flex items-center mb-2">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Free cancellation up to 24 hours before
                      </p>
                      <p className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Instant confirmation
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Need Help?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Have questions about this tour? Our travel specialists are here to help.
                    </p>
                    <Button variant="outline" className="w-full">Contact Us</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Similar Tours */}
          <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={`https://images.unsplash.com/photo-151772952${i * 1000}-877e73f2656f?w=400&h=200&fit=crop`}
                        alt={`Similar tour ${i}`}
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
                      <h3 className="font-bold mb-1">Another Amazing Tour {i}</h3>
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Marrakech</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>3 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-morocco-clay font-bold">${50 + i * 10}</span>
                          <span className="text-xs text-gray-500"> / person</span>
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

export default TourDetailPage;
