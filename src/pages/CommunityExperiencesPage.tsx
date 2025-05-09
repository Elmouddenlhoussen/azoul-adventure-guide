
import { useState, useEffect } from 'react';
import AnimatedTransition from '@/components/AnimatedTransition';
import ScrollReveal from '@/components/ScrollReveal';
import UserExperienceCard, { UserExperience } from '@/components/UserExperienceCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Sample user experiences data - in a real app, this would come from an API
const sampleExperiences: UserExperience[] = [
  {
    id: '1',
    title: 'Magical Night in the Sahara Desert',
    content: 'Spending a night under the stars in the Sahara was an unforgettable experience. The silence, the vastness, and the stunning night sky made me feel so small yet so connected to the universe.',
    location: 'Merzouga, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Sarah Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/62.jpg'
    },
    postedAt: '2 days ago',
    likes: 124,
    comments: 18
  },
  {
    id: '2',
    title: 'Getting Lost in Fes Medina',
    content: 'The ancient Fes Medina is like stepping back in time. The narrow alleys, artisan workshops, and hidden gems around every corner made for an adventure I'll never forget.',
    location: 'Fes, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1548112129-b5cf67e9507a?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'David Chen',
      avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    postedAt: '1 week ago',
    likes: 89,
    comments: 24
  },
  {
    id: '3',
    title: 'Cooking Class in Marrakech',
    content: 'Learning to make authentic Moroccan tagine from a local chef was the highlight of my trip. The spices, techniques, and stories shared made the food taste even better!',
    location: 'Marrakech, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Emma Wilson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    postedAt: '3 weeks ago',
    likes: 156,
    comments: 31
  },
  {
    id: '4',
    title: 'Hiking in the Atlas Mountains',
    content: 'The trek through Toubkal National Park was challenging but absolutely worth it. The views from the summit were breathtaking, and the Berber villages along the way gave us a glimpse into traditional mountain life.',
    location: 'Atlas Mountains, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Michael Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    postedAt: '1 month ago',
    likes: 201,
    comments: 47
  },
  {
    id: '5',
    title: 'Blue Magic of Chefchaouen',
    content: 'Walking through the blue streets of Chefchaouen felt like being in a dream. Every corner was a perfect photo opportunity, and the locals were so friendly and welcoming.',
    location: 'Chefchaouen, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Julia Martinez',
      avatarUrl: 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    postedAt: '2 months ago',
    likes: 312,
    comments: 58
  },
  {
    id: '6',
    title: 'Surfing in Taghazout',
    content: 'Catching waves in Taghazout was an incredible experience. The surf culture there is so laid-back, and the sunset sessions on the beach were pure magic.',
    location: 'Taghazout, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1621068893813-f330b9155fa7?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Ryan Cooper',
      avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    postedAt: '2 months ago',
    likes: 187,
    comments: 32
  }
];

const CommunityExperiencesPage = () => {
  const [experiences, setExperiences] = useState<UserExperience[]>(sampleExperiences);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExperiences, setFilteredExperiences] = useState<UserExperience[]>(experiences);
  
  useEffect(() => {
    document.title = 'Community Experiences | Azoul';
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = experiences.filter(exp => 
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExperiences(filtered);
    } else {
      setFilteredExperiences(experiences);
    }
  }, [searchTerm, experiences]);

  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-morocco-sand/20 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Experiences</h1>
              <p className="text-lg text-gray-700 mb-8">
                Discover authentic stories, tips, and recommendations shared by fellow travelers who have explored Morocco
              </p>
              
              <div className="flex items-center max-w-xl mx-auto">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search experiences by title, content or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Experiences Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">{filteredExperiences.length} Experiences</h2>
              <Button asChild className="bg-morocco-clay hover:bg-morocco-clay/90">
                <Link to="/community/share">Share Your Experience</Link>
              </Button>
            </div>
            
            {filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredExperiences.map((experience, index) => (
                  <ScrollReveal key={experience.id} delay={index * 0.1}>
                    <UserExperienceCard experience={experience} index={index} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No experiences match your search.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </AnimatedTransition>
  );
};

export default CommunityExperiencesPage;
