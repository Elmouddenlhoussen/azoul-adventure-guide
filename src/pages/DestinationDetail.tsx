
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Users, MapPin, Star, ExternalLink } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DestinationData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  location: string;
  rating: number;
  duration: string;
  bestTime: string;
  groupSize: string;
  activities: string[];
  highlights: string[];
}

const destinations: Record<string, DestinationData> = {
  "marrakech": {
    id: "marrakech",
    title: "Marrakech",
    description: "Discover the vibrant markets, palaces, and gardens of this historic imperial city.",
    fullDescription: "Known as the 'Red City' for its ochre-colored walls, Marrakech is a cultural epicenter that offers a perfect blend of history, architecture, and vibrant street life. The city's heart is Jemaa el-Fnaa square, which transforms from a shopping hub during the day to an open-air theater of performers, storytellers, and food stalls at night. Explore the winding alleyways of the medina, visit the stunning Bahia Palace, and find peace in the Majorelle Garden, a botanical garden designed by the French painter Jacques Majorelle and later owned by Yves Saint Laurent.",
    image: "/images/marrakech.jpg",
    gallery: [
      "/images/marrakech-1.jpg",
      "/images/marrakech-2.jpg",
      "/images/marrakech-3.jpg"
    ],
    location: "Central Morocco",
    rating: 4.8,
    duration: "3-4 days",
    bestTime: "March to May, September to November",
    groupSize: "No restrictions",
    activities: ["Shopping in souks", "Historical tours", "Food tasting", "Hammam experience", "Garden visits"],
    highlights: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden", "Koutoubia Mosque", "El Badi Palace"]
  },
  "chefchaouen": {
    id: "chefchaouen",
    title: "Chefchaouen",
    description: "Explore the stunning blue city nestled in the Rif Mountains of northwest Morocco.",
    fullDescription: "Nestled in the Rif Mountains, Chefchaouen is famous for its blue-washed buildings that create a dreamlike atmosphere. This charming town offers a relaxed pace compared to Morocco's bustling cities. The blue-painted streets and buildings create a unique, photogenic environment that attracts artists and photographers from around the world. Explore the winding medina, hike in the surrounding mountains, or simply enjoy the laid-back café culture. The town also offers excellent shopping for local handicrafts, particularly woolen garments and woven blankets, as the region is known for its weaving industry.",
    image: "/images/chefchaouen.jpg",
    gallery: [
      "/images/chefchaouen-1.jpg",
      "/images/chefchaouen-2.jpg",
      "/images/chefchaouen-3.jpg"
    ],
    location: "Northern Morocco",
    rating: 4.7,
    duration: "2-3 days",
    bestTime: "April to June, September to October",
    groupSize: "No restrictions",
    activities: ["Photography walks", "Hiking", "Shopping for handicrafts", "Relaxing in cafés", "Museum visits"],
    highlights: ["Blue-washed Medina", "Kasbah Museum", "Ras El Ma (Water Source)", "Spanish Mosque viewpoint", "Plaza Uta el-Hammam"]
  },
  "sahara": {
    id: "sahara",
    title: "Sahara Desert",
    description: "Experience the magic of the Sahara with camel treks and nights under the stars.",
    fullDescription: "The Moroccan Sahara offers one of the most dramatic landscapes on earth, with endless golden dunes that change color throughout the day. Most desert excursions begin from the towns of Merzouga or M'Hamid, gateways to the renowned Erg Chebbi and Erg Chigaga dune systems. A typical desert experience includes camel trekking across the dunes, watching the sunset transform the landscape, drumming and dancing around a campfire, and spending the night in a traditional Berber tent under a blanket of stars. The silence and vastness of the desert create an unforgettable experience that connects visitors with both nature and traditional nomadic culture.",
    image: "/images/sahara.jpg",
    gallery: [
      "/images/sahara-1.jpg",
      "/images/sahara-2.jpg",
      "/images/sahara-3.jpg"
    ],
    location: "Southern Morocco",
    rating: 4.9,
    duration: "2-3 days",
    bestTime: "October to April",
    groupSize: "Small groups recommended",
    activities: ["Camel trekking", "Sandboarding", "Stargazing", "Berber cultural experiences", "4x4 desert tours"],
    highlights: ["Erg Chebbi dunes", "Erg Chigaga dunes", "Desert camps", "Nomadic villages", "Desert night sky"]
  },
  "fes": {
    id: "fes",
    title: "Fes",
    description: "Wander through the ancient medina, a UNESCO World Heritage site with over 9,000 streets.",
    fullDescription: "Fes (or Fez) is considered Morocco's cultural and spiritual capital, with its UNESCO-protected medina being the largest car-free urban area in the world. Founded in the 9th century, the city reached its height as a center of learning and commerce in the 13th and 14th centuries. Today, Fes maintains much of its historical character, particularly in Fes el-Bali, the oldest walled part of the city with its labyrinthine streets. Visitors can explore traditional tanneries where leather is still processed using methods unchanged for centuries, visit religious schools with stunning Islamic architecture, and experience a city where artisans continue to practice crafts as they have for generations.",
    image: "/images/fes.jpg",
    gallery: [
      "/images/fes-1.jpg",
      "/images/fes-2.jpg",
      "/images/fes-3.jpg"
    ],
    location: "Northern Morocco",
    rating: 4.6,
    duration: "2-3 days",
    bestTime: "March to May, September to November",
    groupSize: "Guide recommended for medina",
    activities: ["Medina exploration", "Cultural tours", "Traditional craft demonstrations", "Food tours", "Historical site visits"],
    highlights: ["Chouara Tannery", "Al-Qarawiyyin University and Mosque", "Bou Inania Madrasa", "Bab Boujloud (Blue Gate)", "Nejjarine Museum of Wooden Arts & Crafts"]
  }
};

const DestinationDetail = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const destination = destinations[destinationId || ''];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destinationId]);
  
  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Destination not found</h2>
          <p className="mb-4">The destination you're looking for doesn't exist or has been moved.</p>
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
          {/* Hero section */}
          <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
              <Link to="/" className="mb-auto text-white flex items-center hover:text-morocco-sand transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span>Back to destinations</span>
              </Link>
              
              <div className="mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{destination.title}</h1>
                <div className="flex items-center text-white/90 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{destination.location}</span>
                </div>
                
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(destination.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                  ))}
                  <span className="ml-2 text-white">{destination.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {destination.fullDescription}
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-morocco-sand flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-morocco-clay font-medium text-sm">{index + 1}</span>
                      </div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-2xl font-semibold mb-4">Activities</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {destination.activities.map((activity, index) => (
                    <span key={index} className="px-3 py-1 bg-morocco-sand/30 text-morocco-clay rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
                
                {/* Gallery */}
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {destination.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img 
                        src={image} 
                        alt={`${destination.title} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h3 className="text-xl font-semibold mb-4">Trip Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-morocco-clay mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Recommended Duration</p>
                        <p className="font-medium">{destination.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-morocco-clay mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Best Time to Visit</p>
                        <p className="font-medium">{destination.bestTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-morocco-clay mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Group Size</p>
                        <p className="font-medium">{destination.groupSize}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-morocco-clay text-white py-3 rounded-lg hover:bg-morocco-clay/90 transition-colors">
                      Plan Your Visit
                    </button>
                    
                    <button className="w-full border border-morocco-clay text-morocco-clay py-3 rounded-lg hover:bg-morocco-clay/10 transition-colors">
                      Save to Favorites
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <a 
                      href="#" 
                      className="text-morocco-terracotta hover:text-morocco-clay flex items-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Map
                    </a>
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

export default DestinationDetail;
