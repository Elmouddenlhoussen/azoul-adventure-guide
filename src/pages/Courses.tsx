
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, BookOpen, GraduationCap, SlidersHorizontal, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import CourseCard, { CourseType } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Placeholder data for courses
const mockCourses: CourseType[] = [
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
    category: 'Language',
    language: 'English',
  },
  {
    id: '2',
    title: 'Moroccan Cuisine Masterclass',
    description: 'Discover the secrets of authentic Moroccan cooking with our comprehensive guide to traditional recipes and techniques.',
    instructor: 'Hamid Moussa',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    duration: '6 weeks',
    level: 'Intermediate',
    enrolled: 856,
    rating: 4.7,
    price: 49.99,
    category: 'Cooking',
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
    category: 'Culture',
    language: 'English',
  },
  {
    id: '4',
    title: 'Photography in Morocco',
    description: 'Master the art of capturing Morocco\'s diverse landscapes, from desert dunes to bustling medinas and mountain villages.',
    instructor: 'Jamal Hassan',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    duration: '8 weeks',
    level: 'Advanced',
    enrolled: 412,
    rating: 4.6,
    price: 79.99,
    category: 'Photography',
    language: 'English',
  },
  {
    id: '5',
    title: 'History of Moroccan Architecture',
    description: 'Explore the rich architectural heritage of Morocco, from ancient medinas to imperial cities and contemporary designs.',
    instructor: 'Mohammed El Fassi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    duration: '7 weeks',
    level: 'Intermediate',
    enrolled: 528,
    rating: 4.7,
    price: 59.99,
    category: 'Architecture',
    language: 'English',
  },
  {
    id: '6',
    title: 'Moroccan Pottery and Ceramics',
    description: 'Learn traditional Moroccan pottery techniques and create your own pieces inspired by centuries of craftsmanship.',
    instructor: 'Nadia Bouzid',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    duration: '6 weeks',
    level: 'Beginner',
    enrolled: 347,
    rating: 4.5,
    price: 45.99,
    category: 'Crafts',
    language: 'English',
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');

  const categories = Array.from(new Set(mockCourses.map(course => course.category)));

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category] 
        : prev.filter(c => c !== category)
    );
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
    
    const matchesCategory = selectedCategories.length > 0 
      ? selectedCategories.includes(course.category) 
      : true;
    
    const matchesPrice = priceRange === 'all' ? true : 
                         priceRange === 'free' ? course.price === 0 :
                         priceRange === 'paid' ? course.price > 0 : true;
    
    return matchesSearch && matchesLevel && matchesCategory && matchesPrice;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case 'popular':
        return b.enrolled - a.enrolled;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-morocco-sand/20 to-morocco-clay/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                  Discover Moroccan Culture and Language
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-600 mb-8"
                >
                  Explore our curated courses to deepen your understanding of Morocco's rich heritage, cuisine, and languages.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center max-w-2xl mx-auto"
                >
                  <div className="relative w-full mb-4 sm:mb-0 sm:mr-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search for courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-morocco-sand/20 focus-visible:ring-morocco-terracotta"
                    />
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Filter Courses</SheetTitle>
                        <SheetDescription>
                          Refine your course results
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4 space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Category</h3>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center">
                                <Checkbox 
                                  id={`category-${category}`}
                                  checked={selectedCategories.includes(category)}
                                  onCheckedChange={(checked) => 
                                    handleCategoryChange(category, checked as boolean)
                                  }
                                  className="data-[state=checked]:bg-morocco-clay data-[state=checked]:border-morocco-clay"
                                />
                                <Label 
                                  htmlFor={`category-${category}`}
                                  className="ml-2 text-sm font-normal"
                                >
                                  {category}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Level</h3>
                          <Select 
                            value={selectedLevel} 
                            onValueChange={setSelectedLevel}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="All Levels" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All Levels</SelectItem>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Price</h3>
                          <Select 
                            value={priceRange} 
                            onValueChange={setPriceRange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="All Prices" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Prices</SelectItem>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            onClick={() => {
                              setSelectedLevel('');
                              setSelectedCategories([]);
                              setPriceRange('all');
                            }}
                            variant="outline" 
                            className="w-full"
                          >
                            Reset Filters
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </motion.div>
              </div>
              
              {/* Featured stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="rounded-full bg-morocco-sand/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-morocco-clay" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">20+</h3>
                  <p className="text-gray-600">Courses Available</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="rounded-full bg-morocco-sand/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-6 w-6 text-morocco-clay" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">5,000+</h3>
                  <p className="text-gray-600">Students Enrolled</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="rounded-full bg-morocco-sand/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-morocco-clay" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Courses Section */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                  Available Courses {filteredCourses.length > 0 ? `(${filteredCourses.length})` : ''}
                </h2>
                
                <div className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500" />
                  <Select 
                    value={selectedSort} 
                    onValueChange={setSelectedSort}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default Courses;
