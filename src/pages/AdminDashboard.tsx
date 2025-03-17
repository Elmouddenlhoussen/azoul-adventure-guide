
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  BookOpen, 
  Users, 
  Mail, 
  Image, 
  BarChart,
  LogOut,
  Plus,
  AlertCircle,
  Save,
  Trash2,
  Settings,
  Pencil,
  Menu
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/admin/StatCard";
import { DestinationForm } from "@/components/admin/forms/DestinationForm";
import { FeatureForm } from "@/components/admin/forms/FeatureForm";
import { CourseForm } from "@/components/admin/forms/CourseForm";
import { UserForm } from "@/components/admin/forms/UserForm";
import { SubscriberForm } from "@/components/admin/forms/SubscriberForm";

// Helper function to close dialogs
const closeDialog = (selector: string) => {
  const closeButton = document.querySelector(selector) as HTMLButtonElement | null;
  if (closeButton) {
    closeButton.click();
  }
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for demo
  const [stats, setStats] = useState({
    visitors: { daily: 256, monthly: 7843 },
    subscribers: { count: 1234, growth: "+14.6%" },
    destinations: { count: 24, featured: 6 },
    features: { count: 18, categories: 5 }
  });
  
  const [destinations, setDestinations] = useState([
    { id: 1, title: "Marrakech", location: "Morocco", description: "A vibrant city known for its markets and culture", image: "https://images.unsplash.com/photo-1597212720452-0576ff58b32c", featured: true, visits: 543 },
    { id: 2, title: "Chefchaouen", location: "Morocco", description: "The blue city in the mountains", image: "https://images.unsplash.com/photo-1548018560-c7196548ed6d", featured: true, visits: 421 },
    { id: 3, title: "Fes", location: "Morocco", description: "Ancient medina and historical sites", image: "https://images.unsplash.com/photo-1570193825602-b86d19101838", featured: false, visits: 385 }
  ]);
  
  const [features, setFeatures] = useState([
    { id: 1, title: "Desert Safari", category: "Adventure", description: "Experience the Sahara desert with expert guides", image: "https://images.unsplash.com/photo-1536077295113-9bd404bdbfc1", featured: true },
    { id: 2, title: "Markets Tour", category: "Culture", description: "Explore traditional Moroccan souks", image: "https://images.unsplash.com/photo-1559734840-f9509ee5677f", featured: true }
  ]);
  
  const [courses, setCourses] = useState([
    { id: 1, title: "Morocco Photography", instructor: "John Smith", description: "Learn to capture the beauty of Morocco", price: "29.99", duration: "8", image: "https://images.unsplash.com/photo-1551655510-955bbd0c9898", students: 124 },
    { id: 2, title: "Arabic for Travelers", instructor: "Amina Hassan", description: "Essential Arabic phrases for your trip", price: "19.99", duration: "6", image: "https://images.unsplash.com/photo-1520256788229-d4640c632855", students: 86 }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", lastLogin: "2023-05-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", lastLogin: "2023-05-12" },
    { id: 3, name: "Admin", email: "admin@azoul.com", role: "admin", status: "active", lastLogin: "2023-05-18" }
  ]);

  const [subscribers, setSubscribers] = useState([
    { id: 1, email: "mark@example.com", status: "active", joinedDate: "2023-04-10" },
    { id: 2, email: "sarah@example.com", status: "active", joinedDate: "2023-04-15" },
    { id: 3, email: "alex@example.com", status: "unsubscribed", joinedDate: "2023-03-20" }
  ]);
  
  // Add new destination
  const handleAddDestination = (newDestination) => {
    const id = destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1;
    const destinationWithId = { 
      ...newDestination, 
      id, 
      visits: 0 
    };
    
    setDestinations([...destinations, destinationWithId]);
    setStats(prev => ({
      ...prev,
      destinations: {
        count: prev.destinations.count + 1,
        featured: newDestination.featured ? prev.destinations.featured + 1 : prev.destinations.featured
      }
    }));
    
    toast({
      title: "Destination added",
      description: `${newDestination.title} has been added successfully.`,
    });
    
    closeDialog(".destinations-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Edit destination
  const handleEditDestination = (id, updatedDestination) => {
    const wasFeaturedbefore = destinations.find(d => d.id === id)?.featured;
    
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, ...updatedDestination } : dest
    ));
    
    if (wasFeaturedbefore !== updatedDestination.featured) {
      setStats(prev => ({
        ...prev,
        destinations: {
          ...prev.destinations,
          featured: updatedDestination.featured 
            ? prev.destinations.featured + 1 
            : prev.destinations.featured - 1
        }
      }));
    }
    
    toast({
      title: "Destination updated",
      description: `${updatedDestination.title} has been updated successfully.`,
    });
    
    closeDialog(".destinations-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Delete destination
  const handleDeleteDestination = (id) => {
    const destToDelete = destinations.find(d => d.id === id);
    
    setDestinations(destinations.filter(dest => dest.id !== id));
    
    setStats(prev => ({
      ...prev,
      destinations: {
        count: prev.destinations.count - 1,
        featured: destToDelete?.featured ? prev.destinations.featured - 1 : prev.destinations.featured
      }
    }));
    
    toast({
      title: "Destination deleted",
      description: `${destToDelete?.title} has been deleted successfully.`,
      variant: "destructive",
    });
  };
  
  // Add new feature
  const handleAddFeature = (newFeature) => {
    const id = features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;
    const featureWithId = { ...newFeature, id };
    
    setFeatures([...features, featureWithId]);
    
    // Update stats
    const categories = new Set([...features, featureWithId].map(f => f.category));
    
    setStats(prev => ({
      ...prev,
      features: {
        count: prev.features.count + 1,
        categories: categories.size
      }
    }));
    
    toast({
      title: "Feature added",
      description: `${newFeature.title} has been added successfully.`,
    });
    
    closeDialog(".features-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Edit feature
  const handleEditFeature = (id, updatedFeature) => {
    setFeatures(features.map(feat => 
      feat.id === id ? { ...feat, ...updatedFeature } : feat
    ));
    
    // Update categories count if needed
    const categories = new Set(features.map(f => 
      f.id === id ? updatedFeature.category : f.category
    ));
    
    setStats(prev => ({
      ...prev,
      features: {
        ...prev.features,
        categories: categories.size
      }
    }));
    
    toast({
      title: "Feature updated",
      description: `${updatedFeature.title} has been updated successfully.`,
    });
    
    closeDialog(".features-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Delete feature
  const handleDeleteFeature = (id) => {
    const featureToDelete = features.find(f => f.id === id);
    const newFeatures = features.filter(feat => feat.id !== id);
    
    setFeatures(newFeatures);
    
    // Update categories count
    const categories = new Set(newFeatures.map(f => f.category));
    
    setStats(prev => ({
      ...prev,
      features: {
        count: prev.features.count - 1,
        categories: categories.size
      }
    }));
    
    toast({
      title: "Feature deleted",
      description: `${featureToDelete?.title} has been deleted successfully.`,
      variant: "destructive",
    });
  };
  
  // Add new course
  const handleAddCourse = (newCourse) => {
    const id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const courseWithId = { 
      ...newCourse, 
      id, 
      students: 0,
      price: newCourse.price,
      duration: newCourse.duration
    };
    
    setCourses([...courses, courseWithId]);
    
    toast({
      title: "Course added",
      description: `${newCourse.title} has been added successfully.`,
    });
    
    closeDialog(".courses-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Edit course
  const handleEditCourse = (id, updatedCourse) => {
    setCourses(courses.map(course => 
      course.id === id ? { 
        ...course, 
        ...updatedCourse,
        price: updatedCourse.price,
        duration: updatedCourse.duration
      } : course
    ));
    
    toast({
      title: "Course updated",
      description: `${updatedCourse.title} has been updated successfully.`,
    });
    
    closeDialog(".courses-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Delete course
  const handleDeleteCourse = (id) => {
    const courseToDelete = courses.find(c => c.id === id);
    
    setCourses(courses.filter(course => course.id !== id));
    
    toast({
      title: "Course deleted",
      description: `${courseToDelete?.title} has been deleted successfully.`,
      variant: "destructive",
    });
  };
  
  // Add new user
  const handleAddUser = (newUser) => {
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userWithId = {
      ...newUser,
      id,
      status: 'active',
      lastLogin: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, userWithId]);
    
    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully.`,
    });
    
    closeDialog(".users-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Edit user
  const handleEditUser = (id, updatedUser) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
    
    toast({
      title: "User updated",
      description: `${updatedUser.name} has been updated successfully.`,
    });
    
    closeDialog(".users-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Delete user
  const handleDeleteUser = (id) => {
    const userToDelete = users.find(u => u.id === id);
    
    // Prevent deleting current user
    if (userToDelete.email === user?.email) {
      toast({
        title: "Action not allowed",
        description: "You cannot delete your own account while logged in.",
        variant: "destructive",
      });
      return;
    }
    
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User deleted",
      description: `${userToDelete?.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };
  
  // Add new subscriber
  const handleAddSubscriber = (newSubscriber) => {
    const id = subscribers.length > 0 ? Math.max(...subscribers.map(s => s.id)) + 1 : 1;
    const subscriberWithId = {
      ...newSubscriber,
      id,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    setSubscribers([...subscribers, subscriberWithId]);
    setStats(prev => ({
      ...prev,
      subscribers: {
        count: prev.subscribers.count + 1,
        growth: prev.subscribers.growth // In a real app, this would be recalculated
      }
    }));
    
    toast({
      title: "Subscriber added",
      description: `${newSubscriber.email} has been added successfully.`,
    });
    
    closeDialog(".subscribers-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Edit subscriber
  const handleEditSubscriber = (id, updatedSubscriber) => {
    setSubscribers(subscribers.map(subscriber => 
      subscriber.id === id ? { ...subscriber, ...updatedSubscriber } : subscriber
    ));
    
    toast({
      title: "Subscriber updated",
      description: `${updatedSubscriber.email} has been updated successfully.`,
    });
    
    closeDialog(".subscribers-dialog[data-state='open'] [data-state='closed']");
  };
  
  // Delete subscriber
  const handleDeleteSubscriber = (id) => {
    const subscriberToDelete = subscribers.find(s => s.id === id);
    
    setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
    setStats(prev => ({
      ...prev,
      subscribers: {
        count: prev.subscribers.count - 1,
        growth: prev.subscribers.growth // In a real app, this would be recalculated
      }
    }));
    
    toast({
      title: "Subscriber deleted",
      description: `${subscriberToDelete?.email} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            
            {user && (
              <div className="text-sm text-muted-foreground">
                Logged in as <span className="font-semibold">{user.email}</span>
              </div>
            )}
          </div>
          
          <main className="p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard 
                    title="Daily Visitors" 
                    value={stats.visitors.daily} 
                    description={`${stats.visitors.monthly} this month`}
                    icon={Users}
                  />
                  <StatCard 
                    title="Subscribers" 
                    value={stats.subscribers.count} 
                    description={`${stats.subscribers.growth} growth in the last month`}
                    icon={Mail}
                  />
                  <StatCard 
                    title="Destinations" 
                    value={stats.destinations.count} 
                    description={`${stats.destinations.featured} featured destinations`}
                    icon={Map}
                  />
                  <StatCard 
                    title="Features" 
                    value={stats.features.count} 
                    description={`${stats.features.categories} different categories`}
                    icon={Compass}
                  />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest events on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New user registered</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-green-100 p-1">
                            <BookOpen className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New course enrollment</p>
                            <p className="text-xs text-muted-foreground">5 hours ago</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-purple-100 p-1">
                            <Map className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New destination added</p>
                            <p className="text-xs text-muted-foreground">Yesterday</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Destinations</CardTitle>
                      <CardDescription>Most visited places this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {destinations
                          .sort((a, b) => b.visits - a.visits)
                          .slice(0, 3)
                          .map(dest => (
                            <li key={dest.id} className="flex items-center justify-between">
                              <span className="text-sm font-medium">{dest.title}</span>
                              <span className="text-xs text-muted-foreground">{dest.visits} visits</span>
                            </li>
                          ))
                        }
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>System Notifications</CardTitle>
                      <CardDescription>Alerts and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Alert className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                          This is a demo admin panel. Data is not persisted.
                        </AlertDescription>
                      </Alert>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="destinations">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Destinations</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Destination
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Destination</DialogTitle>
                        <DialogDescription>
                          Add a new travel destination to the platform.
                        </DialogDescription>
                      </DialogHeader>
                      <DestinationForm 
                        onClose={() => closeDialog(".destinations-dialog[data-state='open'] [data-state='closed']")}
                        onSubmit={handleAddDestination}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Visits</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {destinations.map(dest => (
                        <TableRow key={dest.id}>
                          <TableCell className="font-medium">{dest.title}</TableCell>
                          <TableCell>{dest.location}</TableCell>
                          <TableCell>{dest.featured ? "Yes" : "No"}</TableCell>
                          <TableCell>{dest.visits}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Destination</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the destination.
                                  </DialogDescription>
                                </DialogHeader>
                                <DestinationForm 
                                  initialData={dest}
                                  onClose={() => closeDialog(".destinations-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(data) => handleEditDestination(dest.id, data)}
                                />
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteDestination(dest.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="features">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Features</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Feature
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Feature</DialogTitle>
                        <DialogDescription>
                          Add a new travel feature or activity to the platform.
                        </DialogDescription>
                      </DialogHeader>
                      <FeatureForm 
                        onClose={() => closeDialog(".features-dialog[data-state='open'] [data-state='closed']")}
                        onSubmit={handleAddFeature}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {features.map(feature => (
                        <TableRow key={feature.id}>
                          <TableCell className="font-medium">{feature.title}</TableCell>
                          <TableCell>{feature.category}</TableCell>
                          <TableCell>{feature.featured ? "Yes" : "No"}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Feature</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the feature.
                                  </DialogDescription>
                                </DialogHeader>
                                <FeatureForm 
                                  initialData={feature}
                                  onClose={() => closeDialog(".features-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(data) => handleEditFeature(feature.id, data)}
                                />
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteFeature(feature.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="courses">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Courses</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                        <DialogDescription>
                          Add a new learning course to the platform.
                        </DialogDescription>
                      </DialogHeader>
                      <CourseForm 
                        onClose={() => closeDialog(".courses-dialog[data-state='open'] [data-state='closed']")}
                        onSubmit={handleAddCourse}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map(course => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>${course.price}</TableCell>
                          <TableCell>{course.duration} hours</TableCell>
                          <TableCell>{course.students}</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Course</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the course.
                                  </DialogDescription>
                                </DialogHeader>
                                <CourseForm 
                                  initialData={course}
                                  onClose={() => closeDialog(".courses-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(data) => handleEditCourse(course.id, data)}
                                />
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Users</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Add a new user to the platform.
                        </DialogDescription>
                      </DialogHeader>
                      <UserForm 
                        onClose={() => closeDialog(".users-dialog[data-state='open'] [data-state='closed']")}
                        onSubmit={handleAddUser}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Tabs defaultValue="users" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="users">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map(user => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                              <TableCell>{user.lastLogin}</TableCell>
                              <TableCell className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit User</DialogTitle>
                                      <DialogDescription>
                                        Make changes to user information.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <UserForm 
                                      initialData={user}
                                      onClose={() => closeDialog(".users-dialog[data-state='open'] [data-state='closed']")}
                                      onSubmit={(data) => handleEditUser(user.id, data)}
                                    />
                                  </DialogContent>
                                </Dialog>
                                
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteUser(user.id)}
                                  disabled={user.email === user?.email}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="subscribers">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Email Subscribers</h2>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Subscriber
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Subscriber</DialogTitle>
                            <DialogDescription>
                              Add a new email subscriber to the platform.
                            </DialogDescription>
                          </DialogHeader>
                          <SubscriberForm 
                            onClose={() => closeDialog(".subscribers-dialog[data-state='open'] [data-state='closed']")}
                            onSubmit={handleAddSubscriber}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscribers.map(subscriber => (
                            <TableRow key={subscriber.id}>
                              <TableCell className="font-medium">{subscriber.email}</TableCell>
                              <TableCell>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  subscriber.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : subscriber.status === 'unsubscribed'
                                      ? 'bg-gray-100 text-gray-800'
                                      : 'bg-red-100 text-red-800'
                                }`}>
                                  {subscriber.status}
                                </span>
                              </TableCell>
                              <TableCell>{subscriber.joinedDate}</TableCell>
                              <TableCell className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Subscriber</DialogTitle>
                                      <DialogDescription>
                                        Update subscriber information.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <SubscriberForm 
                                      initialData={subscriber}
                                      onClose={() => closeDialog(".subscribers-dialog[data-state='open'] [data-state='closed']")}
                                      onSubmit={(data) => handleEditSubscriber(subscriber.id, data)}
                                    />
                                  </DialogContent>
                                </Dialog>
                                
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteSubscriber(subscriber.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
