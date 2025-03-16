
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
  AlertCircle
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

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleExitAdmin = () => {
    navigate('/');
  };
  
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, onClick: () => {} },
    { label: "Destinations", icon: Map, onClick: () => {} },
    { label: "Features", icon: Compass, onClick: () => {} },
    { label: "Courses", icon: BookOpen, onClick: () => {} },
    { label: "Users", icon: Users, onClick: () => {} },
    { label: "Subscribers", icon: Mail, onClick: () => {} },
    { label: "Media", icon: Image, onClick: () => {} },
    { label: "Analytics", icon: BarChart, onClick: () => {} },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="mb-8 px-6 pt-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage your travel site</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-6 py-4 space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={handleExitAdmin}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit Admin Panel
          </Button>
          
          <Button 
            variant="destructive" 
            className="w-full justify-start" 
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

// Placeholder components for demo data
const StatCard = ({ title, value, description, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const DestinationForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    featured: initialData?.featured || false
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSwitchChange = (checked) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            placeholder="Destination title" 
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            placeholder="City, Country" 
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Write a description" 
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          placeholder="https://example.com/image.jpg" 
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="featured" 
          checked={formData.featured}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="featured">Featured destination</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Destination</Button>
      </DialogFooter>
    </form>
  );
};

const FeatureForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    featured: initialData?.featured || false
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSwitchChange = (checked) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            placeholder="Feature title" 
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            placeholder="Category" 
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Write a description" 
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          placeholder="https://example.com/image.jpg" 
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="featured" 
          checked={formData.featured}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="featured">Featured item</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Feature</Button>
      </DialogFooter>
    </form>
  );
};

const CourseForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    instructor: initialData?.instructor || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    duration: initialData?.duration || '',
    image: initialData?.image || ''
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            placeholder="Course title" 
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input 
            id="instructor" 
            placeholder="Instructor name" 
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Write a description" 
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input 
            id="price" 
            placeholder="29.99" 
            type="number" 
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours)</Label>
          <Input 
            id="duration" 
            placeholder="8" 
            type="number"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          placeholder="https://example.com/image.jpg" 
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Course</Button>
      </DialogFooter>
    </form>
  );
};

const UserForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || 'user',
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleRoleChange = (e) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          placeholder="User name" 
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          placeholder="user@example.com" 
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={formData.role}
          onChange={handleRoleChange}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save User</Button>
      </DialogFooter>
    </form>
  );
};

const SubscriberForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    status: initialData?.status || 'active',
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleStatusChange = (e) => {
    setFormData(prev => ({ ...prev, status: e.target.value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          placeholder="subscriber@example.com" 
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={formData.status}
          onChange={handleStatusChange}
          required
        >
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
          <option value="bounced">Bounced</option>
        </select>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Subscriber</Button>
      </DialogFooter>
    </form>
  );
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
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
    { id: 1, title: "Morocco Photography", instructor: "John Smith", description: "Learn to capture the beauty of Morocco", price: 29.99, duration: 8, image: "https://images.unsplash.com/photo-1551655510-955bbd0c9898", students: 124 },
    { id: 2, title: "Arabic for Travelers", instructor: "Amina Hassan", description: "Essential Arabic phrases for your trip", price: 19.99, duration: 6, image: "https://images.unsplash.com/photo-1520256788229-d4640c632855", students: 86 }
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
      price: parseFloat(newCourse.price),
      duration: parseInt(newCourse.duration)
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
        price: parseFloat(updatedCourse.price),
        duration: parseInt(updatedCourse.duration)
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
  
  // Dialog state for all content types
  const [editingItem, setEditingItem] = useState({
    destination: null,
    feature: null,
    course: null,
    user: null,
    subscriber: null
  });
  
  // Helper function to close dialog with proper typing
  const closeDialog = (selector: string) => {
    const closeButton = document.querySelector(selector) as HTMLElement | null;
    if (closeButton) {
      closeButton.click();
    }
  };

  // Initialize the dashboard
  useEffect(() => {
    // This would be replaced with real API calls in a production app
    console.log("Admin dashboard initialized");
  }, []);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <SidebarTrigger />
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                  title="Total Visitors" 
                  value={stats.visitors.monthly.toLocaleString()} 
                  description={`+${stats.visitors.daily} today`}
                  icon={Users}
                />
                <StatCard 
                  title="Subscribers" 
                  value={stats.subscribers.count.toLocaleString()} 
                  description={`${stats.subscribers.growth} from last month`}
                  icon={Mail}
                />
                <StatCard 
                  title="Total Destinations" 
                  value={stats.destinations.count} 
                  description={`${stats.destinations.featured} featured`}
                  icon={Map}
                />
                <StatCard 
                  title="Features" 
                  value={stats.features.count} 
                  description={`${stats.features.categories} categories`}
                  icon={Compass}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Destinations</CardTitle>
                    <CardDescription>Most visited places this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Destination</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead className="text-right">Visits</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {destinations
                          .sort((a, b) => b.visits - a.visits)
                          .slice(0, 5)
                          .map(destination => (
                            <TableRow key={destination.id}>
                              <TableCell className="font-medium">{destination.title}</TableCell>
                              <TableCell>{destination.location}</TableCell>
                              <TableCell className="text-right">{destination.visits}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Courses</CardTitle>
                    <CardDescription>Courses with the most students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Instructor</TableHead>
                          <TableHead className="text-right">Students</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses
                          .sort((a, b) => b.students - a.students)
                          .map(course => (
                            <TableRow key={course.id}>
                              <TableCell className="font-medium">{course.title}</TableCell>
                              <TableCell>{course.instructor}</TableCell>
                              <TableCell className="text-right">{course.students}</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="destinations" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Destinations</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Destination
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="destinations-dialog">
                    <DialogHeader>
                      <DialogTitle>Add New Destination</DialogTitle>
                      <DialogDescription>
                        Create a new destination for your travel website.
                      </DialogDescription>
                    </DialogHeader>
                    <DestinationForm 
                      onClose={() => closeDialog(".destinations-dialog[data-state='open'] [data-state='closed']")} 
                      onSubmit={handleAddDestination}
                    />
                    <DialogClose className="hidden" />
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="pt-6">
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
                      {destinations.map(destination => (
                        <TableRow key={destination.id}>
                          <TableCell className="font-medium">{destination.title}</TableCell>
                          <TableCell>{destination.location}</TableCell>
                          <TableCell>{destination.featured ? "Yes" : "No"}</TableCell>
                          <TableCell>{destination.visits}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingItem({...editingItem, destination})}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="destinations-dialog">
                                <DialogHeader>
                                  <DialogTitle>Edit Destination</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the destination details.
                                  </DialogDescription>
                                </DialogHeader>
                                <DestinationForm 
                                  initialData={editingItem.destination}
                                  onClose={() => closeDialog(".destinations-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(updatedData) => handleEditDestination(destination.id, updatedData)}
                                />
                                <DialogClose className="hidden" />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDeleteDestination(destination.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Features</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Feature
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="features-dialog">
                    <DialogHeader>
                      <DialogTitle>Add New Feature</DialogTitle>
                      <DialogDescription>
                        Create a new feature for your travel website.
                      </DialogDescription>
                    </DialogHeader>
                    <FeatureForm 
                      onClose={() => closeDialog(".features-dialog[data-state='open'] [data-state='closed']")}
                      onSubmit={handleAddFeature}
                    />
                    <DialogClose className="hidden" />
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="pt-6">
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
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingItem({...editingItem, feature})}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="features-dialog">
                                <DialogHeader>
                                  <DialogTitle>Edit Feature</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the feature details.
                                  </DialogDescription>
                                </DialogHeader>
                                <FeatureForm 
                                  initialData={editingItem.feature}
                                  onClose={() => closeDialog(".features-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(updatedData) => handleEditFeature(feature.id, updatedData)}
                                />
                                <DialogClose className="hidden" />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDeleteFeature(feature.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Courses</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="courses-dialog">
                    <DialogHeader>
                      <DialogTitle>Add New Course</DialogTitle>
                      <DialogDescription>
                        Create a new course for your travel website.
                      </DialogDescription>
                    </DialogHeader>
                    <CourseForm 
                      onClose={() => closeDialog(".courses-dialog[data-state='open'] [data-state='closed']")}
                      onSubmit={handleAddCourse}
                    />
                    <DialogClose className="hidden" />
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Price</TableHead>
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
                          <TableCell>{course.students}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingItem({...editingItem, course})}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="courses-dialog">
                                <DialogHeader>
                                  <DialogTitle>Edit Course</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the course details.
                                  </DialogDescription>
                                </DialogHeader>
                                <CourseForm 
                                  initialData={editingItem.course}
                                  onClose={() => closeDialog(".courses-dialog[data-state='open'] [data-state='closed']")} 
                                  onSubmit={(updatedData) => handleEditCourse(course.id, updatedData)}
                                />
                                <DialogClose className="hidden" />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Users</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="users-dialog">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account.
                      </DialogDescription>
                    </DialogHeader>
                    <UserForm 
                      onClose={() => closeDialog(".users-dialog[data-state='open'] [data-state='closed']")}
                      onSubmit={handleAddUser}
                    />
                    <DialogClose className="hidden" />
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="pt-6">
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
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingItem({...editingItem, user})}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="users-dialog">
                                <DialogHeader>
                                  <DialogTitle>Edit User</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the user details.
                                  </DialogDescription>
                                </DialogHeader>
                                <UserForm 
                                  initialData={editingItem.user}
                                  onClose={() => closeDialog(".users-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(updatedData) => handleEditUser(user.id, updatedData)}
                                />
                                <DialogClose className="hidden" />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscribers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Subscribers</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Subscriber
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="subscribers-dialog">
                    <DialogHeader>
                      <DialogTitle>Add New Subscriber</DialogTitle>
                      <DialogDescription>
                        Add a new email subscriber to your newsletter.
                      </DialogDescription>
                    </DialogHeader>
                    <SubscriberForm 
                      onClose={() => closeDialog(".subscribers-dialog[data-state='open'] [data-state='closed']")}
                      onSubmit={handleAddSubscriber}
                    />
                    <DialogClose className="hidden" />
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="pt-6">
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
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              subscriber.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : subscriber.status === 'unsubscribed'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {subscriber.status}
                            </span>
                          </TableCell>
                          <TableCell>{subscriber.joinedDate}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingItem({...editingItem, subscriber})}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="subscribers-dialog">
                                <DialogHeader>
                                  <DialogTitle>Edit Subscriber</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the subscriber details.
                                  </DialogDescription>
                                </DialogHeader>
                                <SubscriberForm 
                                  initialData={editingItem.subscriber}
                                  onClose={() => closeDialog(".subscribers-dialog[data-state='open'] [data-state='closed']")}
                                  onSubmit={(updatedData) => handleEditSubscriber(subscriber.id, updatedData)}
                                />
                                <DialogClose className="hidden" />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDeleteSubscriber(subscriber.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
