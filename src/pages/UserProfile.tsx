
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Edit, 
  Settings, 
  LogOut, 
  Bookmark 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import CourseCard, { CourseType } from '@/components/CourseCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    location: 'New York, USA',
    joinedDate: 'January 2023',
    bio: 'Passionate traveler with a love for exploring new cultures and cuisines. Always planning my next adventure to Morocco!',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80'
  };

  // Mock enrolled courses data
  const enrolledCourses: CourseType[] = [
    {
      id: '1',
      title: 'Moroccan Arabic for Beginners',
      description: 'Learn the basics of Darija, the Moroccan dialect of Arabic, with practical everyday phrases and cultural context.',
      instructor: 'Amina Belkadi',
      thumbnailUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
      duration: '4 weeks',
      level: 'Beginner',
      enrolled: 1240,
      rating: 4.8,
      price: 0,
      progress: 65,
      category: 'Language',
      language: 'English',
    },
    {
      id: '3',
      title: 'Berber Culture and Heritage',
      description: 'An immersive exploration of the indigenous Amazigh (Berber) culture, traditions, art, and history in Morocco.',
      instructor: 'Fatima Ait',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      duration: '5 weeks',
      level: 'Beginner',
      enrolled: 623,
      rating: 4.9,
      price: 39.99,
      progress: 30,
      category: 'Culture',
      language: 'English',
    },
  ];

  // Mock saved destinations
  const savedDestinations = [
    { id: '1', name: 'Marrakech', image: 'https://images.unsplash.com/photo-1597212720452-12440c6f8080?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80' },
    { id: '2', name: 'Fes', image: 'https://images.unsplash.com/photo-1548114138-68d43709c18d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80' },
    { id: '3', name: 'Chefchaouen', image: 'https://images.unsplash.com/photo-1553606501-6b6510204cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80' },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would handle actual logout logic
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/4"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-gray-500 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {user.location}
                      </p>
                      <p className="text-gray-500 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" /> Joined {user.joinedDate}
                      </p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <nav className="space-y-2">
                      <Button 
                        variant={activeTab === 'profile' ? "default" : "ghost"} 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('profile')}
                      >
                        <User className="h-4 w-4 mr-2" /> Profile
                      </Button>
                      <Button 
                        variant={activeTab === 'courses' ? "default" : "ghost"} 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('courses')}
                      >
                        <BookOpen className="h-4 w-4 mr-2" /> My Courses
                      </Button>
                      <Button 
                        variant={activeTab === 'saved' ? "default" : "ghost"} 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('saved')}
                      >
                        <Bookmark className="h-4 w-4 mr-2" /> Saved Places
                      </Button>
                      <Button 
                        variant={activeTab === 'settings' ? "default" : "ghost"} 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('settings')}
                      >
                        <Settings className="h-4 w-4 mr-2" /> Settings
                      </Button>
                      
                      <Separator className="my-4" />
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-3/4"
              >
                {activeTab === 'profile' && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Profile Information</CardTitle>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Edit className="h-4 w-4 mr-2" /> Edit Profile
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="text-lg">{user.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p className="text-lg flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {user.email}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <p className="text-lg flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {user.location}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">About</h3>
                          <p className="text-base">{user.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === 'courses' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enrolledCourses.map(course => (
                        <CourseCard key={course.id} course={course} variant="enrolled" />
                      ))}
                    </div>
                    
                    {enrolledCourses.length === 0 && (
                      <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No enrolled courses</h3>
                        <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
                        <Button className="bg-morocco-clay hover:bg-morocco-clay/90">Browse Courses</Button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'saved' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Saved Places</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {savedDestinations.map(destination => (
                        <Card key={destination.id} className="overflow-hidden group">
                          <div className="relative h-40">
                            <img
                              src={destination.image}
                              alt={destination.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">{destination.name}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {savedDestinations.length === 0 && (
                      <div className="text-center py-12">
                        <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No saved places</h3>
                        <p className="text-gray-500 mb-4">You haven't saved any places yet</p>
                        <Button className="bg-morocco-clay hover:bg-morocco-clay/90">Explore Destinations</Button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account preferences and settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 mb-4">Settings content would go here. For demonstration purposes, this section is not fully implemented.</p>
                      <Button className="bg-morocco-clay hover:bg-morocco-clay/90">Save Changes</Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default UserProfile;
