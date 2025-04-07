
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Languages, Calendar, Star, Award, PhoneCall, Mail, Clock } from 'lucide-react';

// Sample guide data
const guides = [
  {
    id: 'hassan',
    name: 'Hassan El Ouazzani',
    location: 'Marrakech',
    bio: 'With 15 years of experience guiding visitors through the vibrant souks and hidden gems of Marrakech.',
    about: "I was born and raised in Marrakech, where my family has lived for generations. After studying tourism and history at university, I decided to share my passion for my hometown with visitors from around the world.\n\nOver the past 15 years, I've guided thousands of travelers through the labyrinthine medina, helping them discover hidden gems that most tourists never see. I specialize in cultural and historical tours, with particular expertise in traditional crafts and Moroccan cuisine.\n\nMy goal with every tour is to provide not just sightseeing, but a deeper understanding of Moroccan culture, traditions, and daily life. I speak fluent English, Arabic, French, and Spanish, allowing me to connect with a wide range of travelers.\n\nWhen I'm not guiding tours, I enjoy photography, cooking traditional Moroccan dishes, and exploring new areas of my country to expand my knowledge.",
    specialties: ['Cultural Tours', 'Food Experiences', 'Historical Sites', 'Photography Walks', 'Artisan Workshops'],
    languages: ['English', 'Arabic', 'French', 'Spanish'],
    experience: '15 years',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1539721972319-f0e80a00d424?w=1200&h=400&fit=crop',
    tours: [
      {
        id: 'medina-tour',
        name: 'Marrakech Medina Insider Tour',
        duration: '4 hours',
        price: 65,
        image: 'https://images.unsplash.com/photo-1553102674-af685bb5fe40?w=300&h=200&fit=crop'
      },
      {
        id: 'food-tour',
        name: 'Marrakech Street Food Adventure',
        duration: '3 hours',
        price: 55,
        image: 'https://images.unsplash.com/photo-1535400255456-34aa5a2b5132?w=300&h=200&fit=crop'
      },
      {
        id: 'artisan-tour',
        name: 'Artisan Workshop Experience',
        duration: '5 hours',
        price: 80,
        image: 'https://images.unsplash.com/photo-1531579311925-adca8c452941?w=300&h=200&fit=crop'
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sarah J.',
        country: 'United States',
        date: 'March 15, 2023',
        rating: 5,
        text: 'Hassan was an excellent guide! His knowledge of Marrakech is incredible, and he took us to places we never would have found on our own. Highly recommended!'
      },
      {
        id: 2,
        name: 'Thomas G.',
        country: 'United Kingdom',
        date: 'February 8, 2023',
        rating: 5,
        text: 'Our day with Hassan was the highlight of our trip to Morocco. He is personable, knowledgeable, and adapted the tour to our interests. The food tour was amazing!'
      },
      {
        id: 3,
        name: 'Maria L.',
        country: 'Spain',
        date: 'January 22, 2023',
        rating: 4,
        text: "Great experience overall. Hassan's insights into local culture made our visit much more meaningful. The only reason for 4 stars instead of 5 was that the tour ran a bit longer than scheduled."
      }
    ],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    contact: {
      email: 'hassan@azoulmorocco.com',
      phone: '+212 612 345 678'
    }
  }
];

const GuideDetailPage = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const guide = guides.find(g => g.id === guideId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (guide) {
      document.title = `${guide.name} | Azoul Morocco Guides`;
    }
  }, [guide]);
  
  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Guide not found</h2>
          <p className="mb-4">The guide you're looking for doesn't exist or has been moved.</p>
          <Link to="/feature/guides" className="text-morocco-clay hover:text-morocco-terracotta">
            Browse all guides
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
              src={guide.coverImage} 
              alt={`${guide.name} cover`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          {/* Guide Info Section */}
          <div className="container mx-auto px-4 -mt-20 relative z-10">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="shrink-0">
                  <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-md">
                    <AvatarImage src={guide.image} alt={guide.name} />
                    <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{guide.name}</h1>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">{guide.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Languages className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">{guide.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-morocco-clay" />
                      <span className="text-gray-600">{guide.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="text-gray-600">{guide.rating} ({guide.reviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{guide.bio}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    {guide.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="bg-morocco-sand/20 text-morocco-clay text-xs px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="shrink-0 flex flex-col gap-3">
                  <Button className="w-full">Book a Tour</Button>
                  <Button variant="outline" className="w-full">Contact</Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="tours">Tours</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">About {guide.name}</h2>
                {guide.about.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700">{paragraph}</p>
                ))}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-morocco-sand/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-morocco-clay" />
                      Specialties
                    </h3>
                    <ul className="space-y-2">
                      {guide.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2"></span>
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-morocco-sand/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Languages className="h-5 w-5 mr-2 text-morocco-clay" />
                      Languages
                    </h3>
                    <ul className="space-y-2">
                      {guide.languages.map((language, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 bg-morocco-clay rounded-full mr-2"></span>
                          {language}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-morocco-clay" />
                      <span>{guide.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneCall className="h-5 w-5 mr-2 text-morocco-clay" />
                      <span>{guide.contact.phone}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tours">
                <h2 className="text-2xl font-bold mb-6">Tours with {guide.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guide.tours.map((tour) => (
                    <Card key={tour.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={tour.image} 
                          alt={tour.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Clock className="h-4 w-4 mr-2" />
                          {tour.duration}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-morocco-clay text-xl font-bold">${tour.price}</span>
                          <Button asChild>
                            <Link to={`/tour/${tour.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                    <span className="text-xl font-bold">{guide.rating}</span>
                    <span className="text-gray-500 ml-2">({guide.reviews.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {guide.reviews.map((review) => (
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
              
              <TabsContent value="availability">
                <h2 className="text-2xl font-bold mb-6">Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Regular Schedule</h3>
                    <div className="bg-morocco-sand/10 rounded-lg p-6">
                      <div className="space-y-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <div key={day} className="flex justify-between items-center">
                            <span>{day}</span>
                            {guide.availability.includes(day) ? (
                              <span className="text-green-600 font-medium">Available</span>
                            ) : (
                              <span className="text-red-600 font-medium">Unavailable</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Book a Time</h3>
                    <div className="bg-morocco-sand/10 rounded-lg p-6">
                      <p className="mb-4">Select a date and time to book a tour with {guide.name}:</p>
                      <Button className="w-full mb-4">Check Calendar</Button>
                      <p className="text-sm text-gray-500">
                        Note: Booking is subject to availability. Please contact us at least 48 hours in advance for custom tour arrangements.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* CTA Section */}
          <section className="bg-morocco-clay text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Explore with {guide.name}?</h2>
                <p className="text-lg mb-8">
                  Book your personalized tour experience now and discover Morocco through the eyes of a knowledgeable local guide.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-morocco-clay">
                    View All Tours
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

export default GuideDetailPage;
