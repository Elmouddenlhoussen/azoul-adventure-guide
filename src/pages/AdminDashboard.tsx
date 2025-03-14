
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  
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
        <div className="px-6 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => navigate('/')}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit Admin Panel
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

const DestinationForm = ({ onClose }) => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Destination title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="City, Country" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Write a description" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" placeholder="https://example.com/image.jpg" />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="featured" />
        <Label htmlFor="featured">Featured destination</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Destination</Button>
      </DialogFooter>
    </form>
  );
};

const FeatureForm = ({ onClose }) => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Feature title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" placeholder="Category" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Write a description" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" placeholder="https://example.com/image.jpg" />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="featured" />
        <Label htmlFor="featured">Featured item</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Feature</Button>
      </DialogFooter>
    </form>
  );
};

const CourseForm = ({ onClose }) => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Course title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input id="instructor" placeholder="Instructor name" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Write a description" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" placeholder="29.99" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours)</Label>
          <Input id="duration" placeholder="8" type="number" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" placeholder="https://example.com/image.jpg" />
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Course</Button>
      </DialogFooter>
    </form>
  );
};

const AdminDashboard = () => {
  // Mock data for demo
  const [stats, setStats] = useState({
    visitors: { daily: 256, monthly: 7843 },
    subscribers: { count: 1234, growth: "+14.6%" },
    destinations: { count: 24, featured: 6 },
    features: { count: 18, categories: 5 }
  });
  
  const [destinations, setDestinations] = useState([
    { id: 1, title: "Marrakech", location: "Morocco", featured: true, visits: 543 },
    { id: 2, title: "Chefchaouen", location: "Morocco", featured: true, visits: 421 },
    { id: 3, title: "Fes", location: "Morocco", featured: false, visits: 385 }
  ]);
  
  const [features, setFeatures] = useState([
    { id: 1, title: "Desert Safari", category: "Adventure", featured: true },
    { id: 2, title: "Markets Tour", category: "Culture", featured: true }
  ]);
  
  const [courses, setCourses] = useState([
    { id: 1, title: "Morocco Photography", instructor: "John Smith", price: 29.99, students: 124 },
    { id: 2, title: "Arabic for Travelers", instructor: "Amina Hassan", price: 19.99, students: 86 }
  ]);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
            <SidebarTrigger />
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
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
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Destination</DialogTitle>
                      <DialogDescription>
                        Create a new destination for your travel website.
                      </DialogDescription>
                    </DialogHeader>
                    <DestinationForm onClose={() => document.querySelector("[data-state='open']")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))} />
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
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
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
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Feature</DialogTitle>
                      <DialogDescription>
                        Create a new feature for your travel website.
                      </DialogDescription>
                    </DialogHeader>
                    <FeatureForm onClose={() => document.querySelector("[data-state='open']")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))} />
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
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
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
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Course</DialogTitle>
                      <DialogDescription>
                        Create a new course for your travel website.
                      </DialogDescription>
                    </DialogHeader>
                    <CourseForm onClose={() => document.querySelector("[data-state='open']")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))} />
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
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
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
