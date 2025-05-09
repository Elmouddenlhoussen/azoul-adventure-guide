
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedTransition from '@/components/AnimatedTransition';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Heart, MessageCircle, Share, ChevronLeft } from 'lucide-react';
import { UserExperience } from '@/components/UserExperienceCard';

// Sample user experiences data - in a real app, this would come from an API
const sampleExperiences: UserExperience[] = [
  {
    id: '1',
    title: 'Magical Night in the Sahara Desert',
    content: 'Spending a night under the stars in the Sahara was an unforgettable experience. The silence, the vastness, and the stunning night sky made me feel so small yet so connected to the universe.\n\nOur group arrived at the desert camp in the late afternoon, just as the sun was beginning to set over the dunes. The golden light cast long shadows across the sand, creating a surreal landscape that felt like another planet. We were greeted with traditional Moroccan mint tea and dates before being assigned our tents.\n\nAfter settling in, we rode camels into the desert to watch the sunset from the top of a tall dune. The colors were absolutely breathtaking - oranges, pinks, and purples painted across the sky and reflecting off the sand. Our guide told us stories of desert life and the nomadic traditions that have existed here for centuries.\n\nOnce darkness fell, the temperature dropped quickly, and we gathered around a campfire for a delicious tagine dinner. The local Berber guides played traditional music on drums and strings, encouraging us to dance and sing along. But the real magic happened after dinner when everyone quieted down.\n\nLying on carpets spread across the sand, we gazed up at the clearest, most star-filled sky I've ever seen. With no light pollution for miles, the Milky Way was clearly visible, stretching across the entire sky like a glittering river. Shooting stars appeared every few minutes, prompting excited whispers from the group. Our guide pointed out constellations and planets, explaining how desert travelers have used them for navigation for thousands of years.\n\nI stayed up much later than everyone else, unable to tear myself away from the celestial show above. The absolute silence of the desert at night is something I\'ll never forget - no cars, no electricity, no distant city hum, just the occasional soft sound of sand shifting in the gentle breeze.\n\nIf you visit Morocco, spending at least one night in the Sahara is an absolute must. Just be sure to bring warm clothes for the night, as the temperature difference between day and night can be extreme!',
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
    content: 'The ancient Fes Medina is like stepping back in time. The narrow alleys, artisan workshops, and hidden gems around every corner made for an adventure I'll never forget.\n\nNavigating the labyrinthine streets of Fes Medina was both terrifying and exhilarating. With over 9,000 narrow lanes and dead ends, getting lost isn\'t just possible – it\'s inevitable! But that\'s where the magic happens.\n\nI started my day with a local guide who showed me the main attractions: the famous tanneries with their rainbow-colored dye pits, the Al-Qarawiyyin University (the oldest continuously operating university in the world), and some of the magnificent madrasas with their intricate tile work and carved cedar. But after lunch, I decided to venture off on my own.\n\nWithout the pressure of following a schedule, I was free to wander wherever my curiosity led me. I discovered tiny workshops where artisans practiced crafts unchanged for centuries – one elderly man was carving intricate designs into cedar wood using tools that looked as ancient as the medina itself. He invited me in for tea and, despite our language barrier, showed me his craft with such pride.\n\nIn another alley, I found a small bakery where local women were bringing their homemade bread to be baked in a communal oven. The baker noticed my interest and offered me a piece of fresh bread – still warm and unlike anything I\'ve tasted before.\n\nYes, I got thoroughly lost. My phone\'s GPS was useless in the narrow passages where signals couldn\'t penetrate the thick medina walls. But each time I thought I should feel worried, I\'d encounter a friendly local who would point me in the right direction, or better yet, to another hidden gem I wouldn\'t have found otherwise.\n\nAs the afternoon wore on, I found myself in a quiet residential area away from the tourist paths. Children played in small courtyards, and the calls to prayer echoed beautifully through the maze of buildings. An elderly woman noticed me looking a bit disoriented and, without a word, motioned for me to follow her. She led me through several twisting passages before pointing to a main thoroughfare I recognized.\n\nTip for fellow travelers: Embrace getting lost in the Fes Medina, but remember landmarks rather than trying to remember the route. And if you really need to find your way back, locals are incredibly helpful – just be prepared to possibly tip a dirham or two if someone goes out of their way to guide you.',
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
  // More experiences would be added here
];

// Sample comments data - in a real app, this would come from an API
const sampleComments = [
  {
    id: '1',
    experienceId: '1',
    author: {
      name: 'Julia Martinez',
      avatarUrl: 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    content: 'I had a similar experience in Merzouga last year! The stargazing was incredible. Did you stay with Ahmed\'s camp by any chance?',
    postedAt: '1 day ago'
  },
  {
    id: '2',
    experienceId: '1',
    author: {
      name: 'Michael Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    content: 'Great post! What time of year did you go? I\'m planning a trip and wondering about the temperature.',
    postedAt: '1 day ago'
  },
  {
    id: '3',
    experienceId: '1',
    author: {
      name: 'Emma Wilson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    content: 'Your description of the night sky makes me want to book a trip right now! Did you bring professional camera equipment for those star photos?',
    postedAt: '12 hours ago'
  }
];

const ExperienceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<UserExperience | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call to get experience details
    setLoading(true);
    
    const foundExperience = sampleExperiences.find(exp => exp.id === id);
    if (foundExperience) {
      setExperience(foundExperience);
      document.title = `${foundExperience.title} | Azoul Community`;
      
      // Simulate getting comments
      const experienceComments = sampleComments.filter(comment => comment.experienceId === id);
      setComments(experienceComments);
    }
    
    setLoading(false);
  }, [id]);
  
  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      if (experience) {
        setExperience({
          ...experience,
          likes: experience.likes - 1
        });
      }
    } else {
      setIsLiked(true);
      if (experience) {
        setExperience({
          ...experience,
          likes: experience.likes + 1
        });
      }
      toast({
        title: "Experience liked!",
        description: "Your appreciation has been recorded",
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this experience with your friends",
    });
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    // In a real app, this would send the comment to an API
    const newComment = {
      id: `new-${Date.now()}`,
      experienceId: id,
      author: {
        name: "You",
        avatarUrl: ""
      },
      content: commentText,
      postedAt: "Just now"
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
    
    if (experience) {
      setExperience({
        ...experience,
        comments: experience.comments + 1
      });
    }
    
    toast({
      title: "Comment added!",
      description: "Your comment has been posted",
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Experience Not Found</h1>
        <p className="mb-8">The experience you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/community/experiences">Back to All Experiences</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen pb-16">
        {/* Hero Image */}
        <div className="w-full h-[50vh] relative">
          <img 
            src={experience.imageUrl} 
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              <Link to="/community/experiences" className="inline-flex items-center text-white hover:text-morocco-sand mb-4">
                <ChevronLeft size={20} /> Back to Experiences
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{experience.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={experience.author.avatarUrl} alt={experience.author.name} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <span>{experience.author.name}</span>
                </div>
                <span className="text-sm opacity-80">{experience.postedAt}</span>
                <span className="text-sm opacity-80">{experience.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mt-8">
            <ScrollReveal>
              {/* Experience Content */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="prose max-w-none">
                  {experience.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-lg">{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-6">
                    <button 
                      className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                      onClick={handleLike}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{experience.likes} likes</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500">
                      <MessageCircle className="h-5 w-5" />
                      <span>{experience.comments} comments</span>
                    </button>
                  </div>
                  <button 
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                    onClick={handleShare}
                  >
                    <Share className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
                
                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="mb-8">
                  <Textarea 
                    placeholder="Add your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="mb-4"
                  />
                  <Button 
                    type="submit"
                    className="bg-morocco-clay hover:bg-morocco-clay/90"
                    disabled={!commentText.trim()}
                  >
                    Post Comment
                  </Button>
                </form>
                
                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{comment.author.name}</div>
                          <div className="text-xs text-gray-500">{comment.postedAt}</div>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                  
                  {comments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ExperienceDetailPage;
