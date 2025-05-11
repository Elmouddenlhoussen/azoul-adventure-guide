
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Clock, Check, CalendarDays, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

// Feature status types
type FeatureStatus = 'planned' | 'in-progress' | 'completed';

// Feature category types
type FeatureCategory = 
  | 'personalization' 
  | 'community' 
  | 'immersive' 
  | 'local' 
  | 'travel' 
  | 'accessibility' 
  | 'sustainability';

// Feature interface
interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  category: FeatureCategory;
  votes: number;
  progress: number;
  estimatedCompletion?: string;
}

// Feature data
const featuresData: Feature[] = [
  {
    id: 'feature-1',
    title: 'Personalized Recommendations',
    description: 'Smart recommendations based on your preferences, past visits, and browsing behavior.',
    status: 'in-progress',
    category: 'personalization',
    votes: 156,
    progress: 65,
    estimatedCompletion: 'June 2025'
  },
  {
    id: 'feature-2',
    title: 'Community Reviews & Photos',
    description: 'Share your Morocco experiences and view authentic content from other travelers.',
    status: 'planned',
    category: 'community',
    votes: 203,
    progress: 15,
    estimatedCompletion: 'August 2025'
  },
  {
    id: 'feature-3',
    title: 'Virtual Reality Tours',
    description: 'Explore Morocco's most beautiful locations in immersive 360° virtual reality.',
    status: 'planned',
    category: 'immersive',
    votes: 189,
    progress: 10,
    estimatedCompletion: 'October 2025'
  },
  {
    id: 'feature-4',
    title: 'Connect with Locals',
    description: 'Direct messaging with verified local guides, artisans, and hosts.',
    status: 'in-progress',
    category: 'local',
    votes: 176,
    progress: 40,
    estimatedCompletion: 'July 2025'
  },
  {
    id: 'feature-5',
    title: 'Interactive Trip Planner',
    description: 'Build custom itineraries with our drag-and-drop trip planning tool.',
    status: 'planned',
    category: 'travel',
    votes: 247,
    progress: 5,
    estimatedCompletion: 'September 2025'
  },
  {
    id: 'feature-6',
    title: 'Accessibility Filters',
    description: 'Find accommodations and experiences that meet specific accessibility needs.',
    status: 'in-progress',
    category: 'accessibility',
    votes: 132,
    progress: 75,
    estimatedCompletion: 'May 2025'
  },
  {
    id: 'feature-7',
    title: 'Eco-Tourism Certification',
    description: 'Easily identify environmentally responsible tours and accommodations.',
    status: 'completed',
    category: 'sustainability',
    votes: 167,
    progress: 100
  },
  {
    id: 'feature-8',
    title: 'Traveler Forums',
    description: 'Connect with other travelers to ask questions and share advice.',
    status: 'planned',
    category: 'community',
    votes: 178,
    progress: 20,
    estimatedCompletion: 'August 2025'
  },
  {
    id: 'feature-9',
    title: 'Cultural Exchange Program',
    description: 'Participate in homestays and cultural workshops with Moroccan families.',
    status: 'planned',
    category: 'local',
    votes: 143,
    progress: 30,
    estimatedCompletion: 'November 2025'
  }
];

// Category labels and icons
const categoryLabels: Record<FeatureCategory, { label: string; icon: React.ComponentType }> = {
  personalization: { label: 'Personalization', icon: Star },
  community: { label: 'Community', icon: Users },
  immersive: { label: 'Immersive Content', icon: Star },
  local: { label: 'Local Connection', icon: MessageSquare },
  travel: { label: 'Travel Tools', icon: CalendarDays },
  accessibility: { label: 'Accessibility', icon: Check },
  sustainability: { label: 'Sustainability', icon: Star }
};

// Status icons
const statusIcons: Record<FeatureStatus, React.ComponentType> = {
  'planned': Clock,
  'in-progress': CalendarDays,
  'completed': Check
};

const RoadmapPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>(featuresData);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [votedFeatures, setVotedFeatures] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Feature Roadmap | Azoul';
    
    // Retrieve voted features from local storage
    const savedVotes = localStorage.getItem('votedFeatures');
    if (savedVotes) {
      setVotedFeatures(JSON.parse(savedVotes));
    }
  }, []);

  // Handle voting for a feature
  const handleVote = (featureId: string) => {
    // Check if already voted
    if (votedFeatures.includes(featureId)) {
      toast({
        title: "Already voted",
        description: "You've already voted for this feature.",
        variant: "default",
      });
      return;
    }

    // Update vote count
    setFeatures(prevFeatures => 
      prevFeatures.map(feature => 
        feature.id === featureId 
          ? { ...feature, votes: feature.votes + 1 } 
          : feature
      )
    );
    
    // Add to voted features
    const newVotedFeatures = [...votedFeatures, featureId];
    setVotedFeatures(newVotedFeatures);
    
    // Save to local storage
    localStorage.setItem('votedFeatures', JSON.stringify(newVotedFeatures));
    
    toast({
      title: "Vote recorded",
      description: "Thank you for your feedback!",
      variant: "default",
    });
  };

  // Filter features based on active tab
  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => {
        if (activeTab === 'planned') return feature.status === 'planned';
        if (activeTab === 'in-progress') return feature.status === 'in-progress';
        if (activeTab === 'completed') return feature.status === 'completed';
        return feature.category === activeTab;
      });

  return (
    <AnimatedTransition>
      <div className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Azoul Feature Roadmap
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're constantly improving our platform to provide you with the best Morocco travel experience. 
            Vote for features you'd like to see implemented next, and stay tuned for updates!
          </motion.p>
        </div>

        <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="personalization">Personalization</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="travel">Travel Tools</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature) => {
                const StatusIcon = statusIcons[feature.status];
                const CategoryInfo = categoryLabels[feature.category];
                const CategoryIcon = CategoryInfo.icon;
                
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`p-1.5 rounded-full 
                              ${feature.status === 'completed' ? 'bg-green-100' : 
                                feature.status === 'in-progress' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                              <StatusIcon className={`h-4 w-4 
                                ${feature.status === 'completed' ? 'text-green-600' : 
                                  feature.status === 'in-progress' ? 'text-blue-600' : 'text-amber-600'}`} />
                            </div>
                            <span className="text-sm font-medium capitalize">
                              {feature.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 bg-muted/50 px-2 py-1 rounded text-sm">
                            <CategoryIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{CategoryInfo.label}</span>
                          </div>
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{feature.progress}%</span>
                            </div>
                            <Progress value={feature.progress} className="h-2" />
                          </div>
                          {feature.estimatedCompletion && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                              <span>Estimated: {feature.estimatedCompletion}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 mt-auto">
                          <div className="flex items-center text-sm">
                            <ThumbsUp className="h-4 w-4 mr-1.5 text-morocco-green" />
                            <span>{feature.votes} votes</span>
                          </div>
                          <Button
                            size="sm"
                            variant={votedFeatures.includes(feature.id) ? "outline" : "default"}
                            className={votedFeatures.includes(feature.id) ? "" : "bg-morocco-clay hover:bg-morocco-clay/90"}
                            onClick={() => handleVote(feature.id)}
                            disabled={votedFeatures.includes(feature.id)}
                          >
                            {votedFeatures.includes(feature.id) ? "Voted" : "Vote"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            
            {filteredFeatures.length === 0 && (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No features found</h3>
                <p className="text-muted-foreground">No features match the current filter.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-muted/30 rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4">Suggest a Feature</h2>
          <p className="mb-6">Have an idea that would make Azoul even better? We'd love to hear about it!</p>
          <Button 
            className="bg-morocco-green hover:bg-morocco-green/90"
            onClick={() => {
              toast({
                title: "Feature suggestion",
                description: "Feature suggestion form coming soon! Thank you for your interest.",
              });
            }}
          >
            Suggest a Feature
          </Button>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default RoadmapPage;
