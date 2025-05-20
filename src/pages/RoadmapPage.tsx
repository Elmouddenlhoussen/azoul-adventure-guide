import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Clock, Check, CalendarDays, Users, Star, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

// Import new components
import FeatureDetailModal from '@/components/roadmap/FeatureDetailModal';
import RoadmapStats from '@/components/roadmap/RoadmapStats';
import CategoryTags from '@/components/roadmap/CategoryTags';
import FeatureCard from '@/components/roadmap/FeatureCard';

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
    title: "Virtual Reality Tours",
    description: "Explore Morocco's most beautiful locations in immersive 360° virtual reality.",
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
const categoryLabels: Record<FeatureCategory, { label: string; icon: React.ComponentType<any> }> = {
  personalization: { label: 'Personalization', icon: Star },
  community: { label: 'Community', icon: Users },
  immersive: { label: 'Immersive Content', icon: Star },
  local: { label: 'Local Connection', icon: MessageSquare },
  travel: { label: 'Travel Tools', icon: CalendarDays },
  accessibility: { label: 'Accessibility', icon: Check },
  sustainability: { label: 'Sustainability', icon: Star }
};

// Status icons
const statusIcons: Record<FeatureStatus, React.ComponentType<any>> = {
  'planned': Clock,
  'in-progress': CalendarDays,
  'completed': Check
};

const RoadmapPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>(featuresData);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [votedFeatures, setVotedFeatures] = useState<string[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Feature Roadmap | Azoul';
    
    // Retrieve voted features from local storage
    const savedVotes = localStorage.getItem('votedFeatures');
    if (savedVotes) {
      setVotedFeatures(JSON.parse(savedVotes));
    }
  }, []);

  // Handle voting for a feature
  const handleVote = (featureId: string, e?: React.MouseEvent) => {
    // Stop propagation if called from button click inside card
    if (e) e.stopPropagation();
    
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

  // Open feature detail modal
  const openFeatureDetail = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  // Filter features based on active tab and category
  const filteredFeatures = features.filter(feature => {
    // Filter by tab (status)
    if (activeTab !== 'all' && feature.status !== activeTab) return false;
    
    // Filter by category
    if (activeCategory !== 'all' && feature.category !== activeCategory) return false;
    
    return true;
  });

  // Compute stats for RoadmapStats component
  const totalFeatures = features.length;
  const completedFeatures = features.filter(f => f.status === 'completed').length;
  const inProgressFeatures = features.filter(f => f.status === 'in-progress').length;
  const plannedFeatures = features.filter(f => f.status === 'planned').length;
  
  // Get most voted feature
  const mostVotedFeature = [...features].sort((a, b) => b.votes - a.votes)[0]?.title || '';

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

        {/* Progress statistics */}
        <RoadmapStats 
          totalFeatures={totalFeatures}
          completedFeatures={completedFeatures}
          inProgressFeatures={inProgressFeatures}
          plannedFeatures={plannedFeatures}
          mostVotedFeature={mostVotedFeature}
        />

        {/* Feature filtering */}
        <div className="mb-8">
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <div className="overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="planned">Planned</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
          
            {/* FIXED: Move TabsContent inside the Tabs component */}
            <TabsContent value="all" className="w-full mt-0">
              {filteredFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeatures.map((feature, index) => {
                    const CategoryInfo = categoryLabels[feature.category];
                    const StatusIcon = statusIcons[feature.status];
                    
                    return (
                      <FeatureCard 
                        key={feature.id}
                        feature={feature}
                        categoryLabel={CategoryInfo.label}
                        categoryIcon={CategoryInfo.icon}
                        statusIcon={StatusIcon}
                        hasVoted={votedFeatures.includes(feature.id)}
                        onClick={() => openFeatureDetail(feature)}
                        onVote={(e) => handleVote(feature.id, e)}
                        index={index}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No features found</h3>
                  <p className="text-muted-foreground">No features match the current filter.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="planned" className="w-full mt-0">
              {filteredFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeatures.map((feature, index) => {
                    const CategoryInfo = categoryLabels[feature.category];
                    const StatusIcon = statusIcons[feature.status];
                    
                    return (
                      <FeatureCard 
                        key={feature.id}
                        feature={feature}
                        categoryLabel={CategoryInfo.label}
                        categoryIcon={CategoryInfo.icon}
                        statusIcon={StatusIcon}
                        hasVoted={votedFeatures.includes(feature.id)}
                        onClick={() => openFeatureDetail(feature)}
                        onVote={(e) => handleVote(feature.id, e)}
                        index={index}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No features found</h3>
                  <p className="text-muted-foreground">No features match the current filter.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="in-progress" className="w-full mt-0">
              {filteredFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeatures.map((feature, index) => {
                    const CategoryInfo = categoryLabels[feature.category];
                    const StatusIcon = statusIcons[feature.status];
                    
                    return (
                      <FeatureCard 
                        key={feature.id}
                        feature={feature}
                        categoryLabel={CategoryInfo.label}
                        categoryIcon={CategoryInfo.icon}
                        statusIcon={StatusIcon}
                        hasVoted={votedFeatures.includes(feature.id)}
                        onClick={() => openFeatureDetail(feature)}
                        onVote={(e) => handleVote(feature.id, e)}
                        index={index}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No features found</h3>
                  <p className="text-muted-foreground">No features match the current filter.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="w-full mt-0">
              {filteredFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeatures.map((feature, index) => {
                    const CategoryInfo = categoryLabels[feature.category];
                    const StatusIcon = statusIcons[feature.status];
                    
                    return (
                      <FeatureCard 
                        key={feature.id}
                        feature={feature}
                        categoryLabel={CategoryInfo.label}
                        categoryIcon={CategoryInfo.icon}
                        statusIcon={StatusIcon}
                        hasVoted={votedFeatures.includes(feature.id)}
                        onClick={() => openFeatureDetail(feature)}
                        onVote={(e) => handleVote(feature.id, e)}
                        index={index}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No features found</h3>
                  <p className="text-muted-foreground">No features match the current filter.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Category filtering */}
          <CategoryTags 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
        
        <div className="mt-16 bg-muted/30 rounded-lg p-6 border">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-4">Suggest a Feature</h2>
              <p className="mb-6 md:mb-0 max-w-xl">Have an idea that would make Azoul even better? We'd love to hear about it! Your suggestions help us prioritize the most valuable features.</p>
            </div>
            <Button 
              className="bg-morocco-green hover:bg-morocco-green/90 min-w-[200px]"
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

        {/* Feature detail modal */}
        <FeatureDetailModal
          feature={selectedFeature}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onVote={handleVote}
          hasVoted={selectedFeature ? votedFeatures.includes(selectedFeature.id) : false}
        />
      </div>
    </AnimatedTransition>
  );
};

export default RoadmapPage;
