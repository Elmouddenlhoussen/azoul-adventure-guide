
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { UserExperience } from '@/components/UserExperienceCard';
import { useToast } from '@/hooks/use-toast';

// Sample experiences data - would come from an API in a real application
const sampleExperiences: UserExperience[] = [
  {
    id: '1',
    title: 'Magical Night in the Sahara Desert',
    content: 'Spending a night under the stars in the Sahara was an unforgettable experience. The silence, the vastness, and the stunning night sky made me feel so small yet so connected to the universe. We arrived by camel as the sun was setting, painting the dunes in golden hues. Our Berber guides prepared a traditional dinner, and we spent the evening around a campfire, listening to their music and stories about desert life. The temperature dropped dramatically at night, but wrapped in warm blankets on our mattress under the open sky, I witnessed the most incredible starscape I have ever seen. The Milky Way stretched clearly across the sky, and shooting stars appeared frequently. At dawn, we climbed the highest nearby dune to watch the sunrise transform the landscape once again. This experience gave me a profound appreciation for the desert and the people who have made their lives there for centuries.',
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
    content: "The ancient Fes Medina is like stepping back in time. The narrow alleys, artisan workshops, and hidden gems around every corner made for an adventure I will never forget.",
    location: 'Fes, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1548112129-b5cf67e9507a?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'David Chen',
      avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    postedAt: '1 week ago',
    likes: 89,
    comments: 24
  }
];

const ExperienceDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const [experience, setExperience] = useState<UserExperience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    setTimeout(() => {
      const foundExperience = sampleExperiences.find(exp => exp.id === id);
      setExperience(foundExperience || null);
      setIsLoading(false);
      
      if (foundExperience) {
        document.title = `${foundExperience.title} | Community Experiences`;
      }
    }, 500);
  }, [id]);
  
  const handleLike = () => {
    if (!experience) return;
    
    setLiked(!liked);
    if (!liked) {
      setExperience({
        ...experience,
        likes: experience.likes + 1
      });
      toast({
        title: "Experience liked",
        description: "You liked this experience!",
      });
    } else {
      setExperience({
        ...experience,
        likes: experience.likes - 1
      });
    }
  };
  
  if (isLoading) {
    return (
      <AnimatedTransition>
        <div className="min-h-screen py-16 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-morocco-clay rounded-full"></div>
        </div>
      </AnimatedTransition>
    );
  }
  
  if (!experience) {
    return (
      <AnimatedTransition>
        <div className="min-h-screen py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Experience Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The experience you are looking for does not exist or has been removed.
            </p>
            <Link to="/community/experiences">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Experiences
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedTransition>
    );
  }
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen pb-16">
        {/* Hero image */}
        <div 
          className="h-80 md:h-96 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${experience.imageUrl})` }}
        >
          <div className="bg-gradient-to-t from-black/60 to-transparent h-full w-full flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link 
                to="/community/experiences"
                className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Experiences
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{experience.title}</h1>
              <p className="text-white/90 text-lg">{experience.location}</p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mt-8">
            {/* Author */}
            <div className="flex items-center justify-between pb-6 border-b mb-8">
              <div className="flex items-center">
                <img 
                  src={experience.author.avatarUrl} 
                  alt={experience.author.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">{experience.author.name}</p>
                  <p className="text-sm text-muted-foreground">{experience.postedAt}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center ${liked ? 'text-red-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 mr-1 ${liked ? 'fill-current' : ''}`} />
                  {experience.likes}
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-1" />
                  {experience.comments}
                </Button>
                
                <Button variant="ghost" size="sm" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link copied",
                    description: "Experience link copied to clipboard",
                  });
                }}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="prose max-w-none mb-12">
              <p className="text-lg leading-relaxed whitespace-pre-line">{experience.content}</p>
            </div>
            
            {/* Comments section placeholder */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Comments ({experience.comments})</h2>
              <p className="text-muted-foreground">
                Comments section would be implemented here in a complete application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ExperienceDetailPage;
