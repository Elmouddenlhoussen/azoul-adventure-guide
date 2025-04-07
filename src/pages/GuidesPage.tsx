
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Languages, ArrowRight } from 'lucide-react';

// Sample data for guides
const guides = [
  {
    id: 'hassan',
    name: 'Hassan El Ouazzani',
    location: 'Marrakech',
    bio: 'With 15 years of experience guiding visitors through the vibrant souks and hidden gems of Marrakech.',
    specialties: ['Cultural Tours', 'Food Experiences', 'Historical Sites'],
    languages: ['English', 'Arabic', 'French', 'Spanish'],
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 'fatima',
    name: 'Fatima Zahra',
    location: 'Fes',
    bio: 'A native of Fes with deep knowledge of traditional crafts and the ancient medina\'s 9,000 alleys.',
    specialties: ['Handicrafts', 'Medina Navigation', 'Photography Tours'],
    languages: ['English', 'Arabic', 'French'],
    rating: 4.8,
    reviews: 103,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 'youssef',
    name: 'Youssef Benjelloun',
    location: 'Chefchaouen',
    bio: 'Born and raised in the Blue City, offering unique insights into this photogenic mountain town.',
    specialties: ['Hiking', 'Photography', 'Local Cuisine'],
    languages: ['English', 'Arabic', 'Spanish'],
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop'
  },
  {
    id: 'amina',
    name: 'Amina Tazi',
    location: 'Essaouira',
    bio: 'Passionate about coastal history and culture, with special knowledge of music and art scenes.',
    specialties: ['Music Festivals', 'Water Sports', 'Art Tours'],
    languages: ['English', 'Arabic', 'French'],
    rating: 4.8,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
  },
  {
    id: 'karim',
    name: 'Karim Alaoui',
    location: 'Merzouga',
    bio: 'Desert expert with Berber heritage, offering authentic Sahara experiences and stargazing tours.',
    specialties: ['Desert Safaris', 'Astronomy', 'Berber Culture'],
    languages: ['English', 'Arabic', 'Berber', 'French'],
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
  },
  {
    id: 'leila',
    name: 'Leila Bennani',
    location: 'Rabat',
    bio: 'History and architecture specialist focusing on Morocco\'s capital and its blend of modern and ancient.',
    specialties: ['Government Buildings', 'Coastal Tours', 'Museums'],
    languages: ['English', 'Arabic', 'French', 'German'],
    rating: 4.6,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop'
  }
];

const GuidesPage = () => {
  useEffect(() => {
    document.title = 'Expert Local Guides | Azoul Morocco';
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect With Expert Local Guides</h1>
                <p className="text-lg text-gray-700 mb-8">
                  Experience Morocco through the eyes of passionate locals who know their cities inside and out. Our carefully vetted guides offer personalized experiences that go beyond the typical tourist trail.
                </p>
                <Button size="lg" className="bg-morocco-clay hover:bg-morocco-clay/90">
                  Find Your Perfect Guide
                </Button>
              </div>
            </div>
          </section>
          
          {/* Guides Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Guides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative h-48 bg-gray-200">
                        {/* Guide location badge */}
                        <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                          {guide.location}
                        </div>
                        
                        {/* Guide rating badge */}
                        <div className="absolute top-4 right-4 bg-morocco-clay text-white rounded-full px-3 py-1 text-sm flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          {guide.rating}
                        </div>
                        
                        {/* Guide avatar */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                          <Avatar className="h-24 w-24 border-4 border-white">
                            <AvatarImage src={guide.image} alt={guide.name} />
                            <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-16 pb-4">
                      <h3 className="text-xl font-bold text-center mb-2">{guide.name}</h3>
                      
                      <div className="flex justify-center items-center text-sm text-gray-500 mb-4">
                        <Languages className="h-4 w-4 mr-1" />
                        <span>{guide.languages.slice(0, 2).join(', ')}{guide.languages.length > 2 ? ' + ' + (guide.languages.length - 2) : ''}</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm text-center mb-4">{guide.bio}</p>
                      
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {guide.specialties.map((specialty, index) => (
                          <span 
                            key={index} 
                            className="bg-morocco-sand/20 text-morocco-clay text-xs px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 flex justify-center">
                      <Button asChild className="w-full" variant="outline">
                        <Link to={`/guide/${guide.id}`}>
                          View Profile <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="bg-morocco-clay text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Become a Guide</h2>
                <p className="text-lg mb-8">
                  Are you passionate about sharing your culture and knowledge of Morocco? Join our community of expert guides and connect with travelers from around the world.
                </p>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-morocco-clay">
                  Apply Now
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default GuidesPage;
