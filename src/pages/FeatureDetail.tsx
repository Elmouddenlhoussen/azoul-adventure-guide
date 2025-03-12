
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FeatureData {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

// This will be replaced with actual content for each feature
const features: Record<string, FeatureData> = {
  "map": {
    id: "map",
    title: "Interactive Map",
    description: "Explore Morocco with our detailed interactive map showing destinations, routes, and attractions.",
    content: (
      <div className="space-y-6">
        <p>Our interactive map is currently under development. Soon you'll be able to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Explore all regions of Morocco</li>
          <li>Find attractions, restaurants, and accommodations</li>
          <li>Get directions and estimated travel times</li>
          <li>Create custom routes and itineraries</li>
          <li>Save favorite locations</li>
        </ul>
        <div className="bg-morocco-sand/30 p-4 rounded-lg">
          <p className="text-morocco-clay font-medium">Coming soon!</p>
          <p className="text-sm">Our development team is working hard to bring you this feature.</p>
        </div>
      </div>
    )
  },
  "suggestions": {
    id: "suggestions",
    title: "Smart Suggestions",
    description: "Receive personalized recommendations based on your interests and preferences.",
    content: (
      <div className="space-y-6">
        <p>Our AI-powered suggestion engine analyzes your preferences and browsing history to recommend the perfect Moroccan experiences for you.</p>
        <h3 className="text-xl font-medium">How it works:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create an account and tell us about your interests</li>
          <li>Browse destinations and experiences on Azoul</li>
          <li>Our AI learns from your interactions</li>
          <li>Receive personalized recommendations</li>
        </ol>
        <div className="bg-morocco-sand/30 p-4 rounded-lg">
          <p className="text-morocco-clay font-medium">Did you know?</p>
          <p className="text-sm">Our suggestion algorithm considers over 200 factors including season, budget, and travel style to make the perfect recommendations.</p>
        </div>
      </div>
    )
  },
  "chat": {
    id: "chat",
    title: "Chat Assistant",
    description: "Get instant answers to your questions from our AI-powered travel assistant.",
    content: (
      <div className="space-y-6">
        <p>Meet Azoul, your personal Moroccan travel assistant! Available 24/7 to answer your questions about:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Local customs and etiquette</li>
          <li>Transportation options</li>
          <li>Restaurant recommendations</li>
          <li>Language assistance</li>
          <li>Emergency information</li>
        </ul>
        <div className="p-6 border rounded-xl">
          <div className="flex items-start mb-4">
            <div className="bg-morocco-clay w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3">A</div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <p>Marhaba! I'm Azoul, your Moroccan travel companion. How can I help you today?</p>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Ask me anything about Morocco..."
              className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-morocco-clay"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-morocco-clay text-white p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  },
  "events": {
    id: "events",
    title: "Cultural Events",
    description: "Stay updated on local festivals, concerts, and cultural events happening during your visit.",
    content: (
      <div className="space-y-6">
        <p>Morocco has a rich calendar of cultural events throughout the year. Plan your trip to coincide with these unforgettable experiences:</p>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border rounded-lg overflow-hidden">
            <img src="/images/festival-1.jpg" alt="Festival" className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="text-xs font-medium bg-morocco-sand/50 text-morocco-clay px-2 py-1 rounded-full">June 2023</span>
              <h3 className="font-medium mt-2">Gnaoua World Music Festival</h3>
              <p className="text-sm text-gray-600">Essaouira</p>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <img src="/images/festival-2.jpg" alt="Festival" className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="text-xs font-medium bg-morocco-sand/50 text-morocco-clay px-2 py-1 rounded-full">July 2023</span>
              <h3 className="font-medium mt-2">Festival of World Sacred Music</h3>
              <p className="text-sm text-gray-600">Fes</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm">Our events calendar is constantly updated with the latest cultural festivals, concerts, and local celebrations.</p>
      </div>
    )
  },
  "guides": {
    id: "guides",
    title: "Travel Guides",
    description: "Access comprehensive guides with insider tips on each destination.",
    content: (
      <div className="space-y-6">
        <p>Our comprehensive travel guides are written by local experts and seasoned travelers to give you the most authentic Moroccan experience.</p>
        
        <h3 className="text-xl font-medium">Popular Guides:</h3>
        
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="border rounded-lg overflow-hidden">
            <img src="/images/guide-1.jpg" alt="Guide" className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">First-Time Visitor's Guide to Morocco</h3>
              <p className="text-sm text-gray-600 mt-1">Everything you need to know for your first trip</p>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <img src="/images/guide-2.jpg" alt="Guide" className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">Moroccan Cuisine: A Food Lover's Guide</h3>
              <p className="text-sm text-gray-600 mt-1">Discover the flavors of Morocco</p>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <img src="/images/guide-3.jpg" alt="Guide" className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">Morocco on a Budget</h3>
              <p className="text-sm text-gray-600 mt-1">How to experience the best for less</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm">Each guide includes detailed information on attractions, local customs, transportation, accommodation options, and insider tips you won't find elsewhere.</p>
      </div>
    )
  },
  "language": {
    id: "language",
    title: "Language Support",
    description: "Learn essential phrases in Moroccan Arabic and navigate language barriers with ease.",
    content: (
      <div className="space-y-6">
        <p>Learning a few key phrases in Darija (Moroccan Arabic) can enhance your experience and show respect for the local culture.</p>
        
        <h3 className="text-xl font-medium">Essential Phrases:</h3>
        
        <div className="grid gap-3">
          <div className="bg-white shadow-sm rounded-lg p-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Hello</p>
                <p className="text-sm text-gray-600">Greeting</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-morocco-clay">Salam</p>
                <p className="text-sm text-gray-600">سلام</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Thank you</p>
                <p className="text-sm text-gray-600">Gratitude</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-morocco-clay">Shukran</p>
                <p className="text-sm text-gray-600">شكرا</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Yes/No</p>
                <p className="text-sm text-gray-600">Basic response</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-morocco-clay">Iyeh/La</p>
                <p className="text-sm text-gray-600">إيه / لا</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-morocco-sand/30 p-4 rounded-lg">
          <p className="text-morocco-clay font-medium">Premium Language Courses</p>
          <p className="text-sm">Upgrade to access our comprehensive language courses with audio pronunciation guides and interactive learning tools.</p>
        </div>
      </div>
    )
  },
};

const FeatureDetail = () => {
  const { featureId } = useParams<{ featureId: string }>();
  const feature = features[featureId || ''];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [featureId]);
  
  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Feature not found</h2>
          <p className="mb-4">The feature you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="text-morocco-clay hover:text-morocco-terracotta">
            Return to home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AnimatedTransition variant="slideUp">
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/" className="inline-flex items-center text-morocco-clay hover:text-morocco-terracotta mb-6">
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Back to home</span>
            </Link>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{feature.title}</h1>
              <p className="text-lg text-gray-600">{feature.description}</p>
            </div>
            
            {feature.content}
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default FeatureDetail;
