import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, Calendar, Star, Users, Check, Info, Map } from 'lucide-react';

// Sample tour data
const tours = [
  {
    id: 'medina-tour',
    name: 'Marrakech Medina Insider Tour',
    tagline: "Explore the hidden treasures of Marrakech's historic medina",
    description: "Join our expert local guide for an immersive journey through the winding alleys of Marrakech's UNESCO-listed medina. Discover hidden architectural gems, visit artisan workshops, and experience the authentic daily life of this ancient walled city.",
    duration: '4 hours',
    price: 65,
    rating: 4.8,
    reviewCount: 246,
    location: 'Marrakech, Morocco',
    coverImage: 'https://images.unsplash.com/photo-1565689477302-9748b68a865a?w=1200&h=400&fit=crop',
    mainImage: 'https://images.unsplash.com/photo-1553102674-af685bb5fe40?w=600&h=400&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1553869895-5ea1b5a37f0e?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1545167496-c1e092d383a2?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1557680732-9edff72048a4?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1599982890963-3aabd60064d2?w=300&h=200&fit=crop',
    ],
    highlights: [
      'Explore hidden corners of the historic medina not found in guidebooks',
      'Visit traditional artisan workshops and learn about ancient crafts',
      'Sample authentic Moroccan street food from trusted local vendors',
      'Discover architectural treasures and photo-worthy spots',
      'Hear fascinating stories and historical context from an expert local guide'
    ],
    included: [
      'Expert local guide',
      'Small group experience (max 8 people)',
      'Food tastings from local vendors',
      'Bottled water',
      'Entry fees to selected artisan workshops'
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Additional food and drinks',
      'Gratuities (optional)',
      'Personal shopping expenses'
    ],
    schedule: [
      {
        time: '9:00 AM',
        activity: 'Meet at Jemaa el-Fnaa square near the olive vendors',
        description: 'Your guide will be holding an Azoul Morocco sign'
      },
      {
        time: '9:15 AM',
        activity: 'Begin exploration of the historic souks',
        description: 'Visit spice markets, textile stalls, and leather goods'
      },
      {
        time: '10:30 AM',
        activity: 'Traditional craft demonstrations',
        description: 'Visit workshops of coppersmiths, leather workers, and carpet weavers'
      },
      {
        time: '11:45 AM',
        activity: 'Street food tasting experience',
        description: 'Sample authentic Moroccan snacks, sweets, and mint tea'
      },
      {
        time: '12:30 PM',
        activity: 'Hidden architectural gems',
        description: 'Discover lesser-known riads, fountains, and historical buildings'
      },
      {
        time: '1:00 PM',
        activity: 'Tour conclusion',
        description: 'Return to Jemaa el-Fnaa with recommendations for lunch or further exploration'
      }
    ],
    guide: {
      id: 'hassan',
      name: 'Hassan El Ouazzani',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Born and raised in Marrakech, Hassan has 15 years of experience showing visitors the hidden treasures of his home city.',
      languages: ['English', 'Arabic', 'French', 'Spanish']
    },
    reviews: [
      {
        id: 1,
        name: 'Sarah J.',
        country: 'United States',
        date: 'March 15, 2023',
        rating: 5,
        text: 'This tour was the highlight of our trip to Marrakech! Hassan took us to places we never would have found on our own. The food tastings were delicious, and we learned so much about the history and culture of the medina.'
      },
      {
        id: 2,
        name: 'Thomas G.',
        country: 'United Kingdom',
        date: 'February 8, 2023',
        rating: 5,
        text: "Exceptional tour that goes well beyond the typical tourist experience. Our guide was knowledgeable and personable, and adjusted the pace to our group's interests. The artisan workshops were fascinating."
      },
      {
        id: 3,
        name: 'Maria L.',
        country: 'Spain',
        date: 'January 22, 2023',
        rating: 4,
        text: "Very informative tour with a friendly guide. We appreciated the small group size. The only reason for 4 stars instead of 5 was that it ran about 30 minutes longer than scheduled, which affected our afternoon plans."
      }
    ],
    faqs: [
      {
        question: 'Is this tour suitable for children?',
        answer: 'Yes, this tour is suitable for children aged 8 and above. The walking pace is moderate, and there are interesting activities that can engage younger visitors.'
      },
      {
        question: 'How much walking does this tour involve?',
        answer: 'This tour involves approximately 4 kilometers (2.5 miles) of walking through the medina. The terrain is mostly flat but includes narrow alleys and occasionally uneven surfaces.'
      },
      {
        question: 'Can dietary restrictions be accommodated for the food tastings?',
        answer: 'Yes, we can accommodate vegetarian, vegan, gluten-free, and halal dietary requirements. Please inform us of any food allergies or restrictions when booking.'
      },
      {
        question: 'What should I wear for this tour?',
        answer: 'We recommend comfortable walking shoes, lightweight clothing that covers shoulders and knees (to respect local customs), and a hat or scarf for sun protection. During summer months, sunscreen and water are essential.'
      }
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before the start time for a full refund. No refund for cancellations made less than 24 hours before the start time.',
  }
];

const TourDetailPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const tour = tours.find(t => t.id === tourId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (tour) {
      document.title = `${tour.name} | Azoul Morocco Tours`;
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
          {/* Hero Section with Cover Photo */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={tour.coverImage} 
              alt={`${tour.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.name}</h1>
                <p className="text-lg opacity-90">{tour.tagline}</p>
              </div>
            </div>
          </div>
          
          {/* Tour Info Section */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Content */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge className="bg-morocco-clay hover:bg-morocco-clay/80">{tour.duration}</Badge>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">{tour.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-gray-600">{tour.rating} ({tour.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">Small group</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex gap-4 mb-6">
                      <img 
                        src={tour.mainImage} 
                        alt={tour.name} 
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {tour.galleryImages.map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`${tour.name} gallery ${index + 1}`} 
                          className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg mb-6">{tour.description}</p>
                  </div>
                </div>
                
                {/* Tabs Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <Tabs defaultValue="highlights" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                      <TabsTrigger value="highlights">Highlights</TabsTrigger>
                      <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                      <TabsTrigger value="includes">Includes</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="highlights" className="space-y-6">
                      <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
                      <ul className="space-y-3">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 mr-3 text-morocco-clay flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="itinerary">
                      <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                      <div className="relative border-l-2 border-morocco-clay/30 pl-8 ml-2 space-y-8">
                        {tour.schedule.map((item, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-[40px] w-7 h-7 bg-white border-2 border-morocco-clay rounded-full flex items-center justify-center">
                              <Clock className="h-3.5 w-3.5 text-morocco-clay" />
                            </div>
                            <h3 className="text-lg font-semibold">{item.time} - {item.activity}</h3>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="includes">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                          <ul className="space-y-3">
                            {tour.included.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h2 className="text-2xl font-bold mb-4">Not Included</h2>
                          <ul className="space-y-3">
                            {tour.notIncluded.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="h-0.5 w-3 bg-red-500 mr-3 flex-shrink-0 mt-3"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-8 border-t">
                        <h2 className="text-2xl font-bold mb-4">Important Information</h2>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <Info className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-blue-700">
                                Please arrive at the meeting point 15 minutes before the tour start time. 
                                Wear comfortable shoes and bring water, especially during summer months.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-xl font-semibold mb-2">Cancellation Policy</h3>
                          <p className="text-gray-700">{tour.cancellationPolicy}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reviews">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Guest Reviews</h2>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                          <span className="text-xl font-bold">{tour.rating}</span>
                          <span className="text-gray-500 ml-2">({tour.reviewCount} reviews)</span>
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
                    {tour.faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Guide Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Your Guide</h2>
                  <div className="flex items-start gap-6">
                    <Avatar className="h-20 w-20 border-2 border-morocco-clay">
                      <AvatarImage src={tour.guide.photo} alt={tour.guide.name} />
                      <AvatarFallback>{tour.guide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{tour.guide.name}</h3>
                      <p className="text-gray-700 mb-3">{tour.guide.bio}</p>
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-1 text-morocco-clay" />
                        <span className="text-gray-600">{tour.guide.languages.join(', ')}</span>
                      </div>
                      <Button className="mt-4" variant="outline" asChild>
                        <Link to={`/guide/${tour.guide.id}`}>View Guide Profile</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Booking Widget */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <div className="mb-4 pb-4 border-b">
                    <h3 className="text-2xl font-bold text-morocco-clay">${tour.price}</h3>
                    <p className="text-gray-500">per person</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <div className="relative">
                        <input 
                          type="date"
                          id="date"
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-morocco-clay"
                        />
                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Participants
                      </label>
                      <select 
                        id="participants"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-morocco-clay"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        <option value="6">6 People</option>
                        <option value="7">7 People</option>
                        <option value="8">8 People</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-4">Book Now</Button>
                  <Button variant="outline" className="w-full">Check Availability</Button>
                  
                  <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                    <p className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      Free cancellation up to 24 hours in advance
                    </p>
                    <p className="flex items-center">
                      <Map className="h-4 w-4 mr-2" />
                      Meeting point: Jemaa el-Fnaa square
                    </p>
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

export default TourDetailPage;
