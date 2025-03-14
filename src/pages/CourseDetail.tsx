
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, CheckCircle, Play, Download, Calendar, Globe, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { CourseType } from '@/components/CourseCard';

// Placeholder data for course detail
const mockCourses: Record<string, CourseType & {
  fullDescription: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  modules: Array<{
    id: string;
    title: string;
    duration: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
      type: 'video' | 'reading' | 'quiz';
      preview?: boolean;
    }>;
  }>;
  materials: Array<{
    id: string;
    title: string;
    type: string;
    size?: string;
  }>;
  reviews: Array<{
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}> = {
  '1': {
    id: '1',
    title: 'Moroccan Arabic for Beginners',
    description: 'Learn the basics of Darija, the Moroccan dialect of Arabic, with practical everyday phrases and cultural context.',
    fullDescription: 'This comprehensive course introduces you to Darija, the Moroccan dialect of Arabic spoken by over 30 million people. Unlike Modern Standard Arabic, Darija has its own unique pronunciation, vocabulary, and expressions that are essential for anyone traveling to or living in Morocco. Through interactive lessons, dialogue practice, and cultural insights, you\'ll quickly develop the skills to navigate daily conversations, from greetings and introductions to shopping in souks and ordering in cafes.',
    instructor: 'Amina Belkadi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    duration: '4 weeks',
    level: 'Beginner',
    enrolled: 1240,
    rating: 4.8,
    price: 0,
    category: 'Language',
    language: 'English',
    whatYouWillLearn: [
      'Master essential greetings and everyday expressions in Darija',
      'Understand the basics of Moroccan Arabic pronunciation',
      'Navigate common situations like shopping, dining, and transportation',
      'Count numbers and tell time in Darija',
      'Appreciate cultural nuances and etiquette when speaking with locals',
      'Build a foundation for further Moroccan Arabic studies'
    ],
    prerequisites: [
      'No prior knowledge of Arabic required',
      'Basic English comprehension',
      'A desire to learn about Moroccan culture and language'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Darija',
        duration: '1 week',
        lessons: [
          {
            id: 'l1',
            title: 'Welcome & Course Overview',
            duration: '10 min',
            type: 'video',
            preview: true
          },
          {
            id: 'l2',
            title: 'The Moroccan Arabic Alphabet and Sounds',
            duration: '25 min',
            type: 'video',
            preview: true
          },
          {
            id: 'l3',
            title: 'Basic Pronunciation Guide',
            duration: '20 min',
            type: 'video'
          },
          {
            id: 'l4',
            title: 'Module 1 Quiz',
            duration: '15 min',
            type: 'quiz'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Greetings and Introductions',
        duration: '1 week',
        lessons: [
          {
            id: 'l5',
            title: 'Formal & Informal Greetings',
            duration: '22 min',
            type: 'video'
          },
          {
            id: 'l6',
            title: 'Introducing Yourself and Others',
            duration: '18 min',
            type: 'video'
          },
          {
            id: 'l7',
            title: 'Cultural Context: Moroccan Greeting Customs',
            duration: '12 min',
            type: 'reading'
          },
          {
            id: 'l8',
            title: 'Practice Dialogue: Meeting New People',
            duration: '15 min',
            type: 'video'
          },
          {
            id: 'l9',
            title: 'Module 2 Quiz',
            duration: '15 min',
            type: 'quiz'
          }
        ]
      },
      {
        id: 'm3',
        title: 'Everyday Phrases',
        duration: '1 week',
        lessons: [
          {
            id: 'l10',
            title: 'Essential Expressions',
            duration: '20 min',
            type: 'video'
          },
          {
            id: 'l11',
            title: 'Numbers and Time',
            duration: '25 min',
            type: 'video'
          },
          {
            id: 'l12',
            title: 'Shopping Vocabulary',
            duration: '18 min',
            type: 'video'
          },
          {
            id: 'l13',
            title: 'Restaurant and Food Terms',
            duration: '22 min',
            type: 'video'
          },
          {
            id: 'l14',
            title: 'Module 3 Quiz',
            duration: '15 min',
            type: 'quiz'
          }
        ]
      },
      {
        id: 'm4',
        title: 'Practical Conversations',
        duration: '1 week',
        lessons: [
          {
            id: 'l15',
            title: 'Navigating the Medina',
            duration: '20 min',
            type: 'video'
          },
          {
            id: 'l16',
            title: 'Taking a Taxi',
            duration: '15 min',
            type: 'video'
          },
          {
            id: 'l17',
            title: 'At the Hotel',
            duration: '18 min',
            type: 'video'
          },
          {
            id: 'l18',
            title: 'Final Course Project',
            duration: '30 min',
            type: 'reading'
          },
          {
            id: 'l19',
            title: 'Final Assessment',
            duration: '30 min',
            type: 'quiz'
          }
        ]
      }
    ],
    materials: [
      {
        id: 'mat1',
        title: 'Darija Phrasebook PDF',
        type: 'pdf',
        size: '2.4 MB'
      },
      {
        id: 'mat2',
        title: 'Pronunciation Audio Files',
        type: 'audio',
        size: '45 MB'
      },
      {
        id: 'mat3',
        title: 'Moroccan Arabic Flashcards',
        type: 'pdf',
        size: '1.8 MB'
      }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Sarah Johnson',
        rating: 5,
        date: '2023-04-15',
        comment: 'Excellent course! I\'m traveling to Morocco next month and this has given me the confidence to try speaking with locals. The instructor is engaging and the pace is perfect for beginners.'
      },
      {
        id: 'r2',
        userName: 'Michael Chen',
        rating: 4,
        date: '2023-03-22',
        comment: 'Very practical course with useful everyday phrases. I would have liked more listening exercises, but otherwise it\'s comprehensive and well-structured.'
      },
      {
        id: 'r3',
        userName: 'Emma Rodriguez',
        rating: 5,
        date: '2023-02-10',
        comment: 'I\'ve tried learning Arabic before but found it intimidating. This course breaks everything down into manageable chunks with clear examples. The cultural context provided with each lesson is fascinating!'
      }
    ]
  }
};

// Add other course data as needed

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  
  // In a real app, you would fetch this data from an API
  const course = mockCourses[courseId || '1'];
  
  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course not found</h1>
            <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/courses">
              <Button>Browse All Courses</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleEnroll = () => {
    toast({
      title: "Enrolled Successfully!",
      description: `You've been enrolled in "${course.title}". Start learning now!`,
    });
    setIsEnrolled(true);
  };
  
  // Calculate total course duration
  const totalLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.length, 0
  );
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          {/* Course Header */}
          <section className="bg-gradient-to-r from-morocco-sand/20 to-morocco-clay/10 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Course Image and Info */}
                <div className="md:w-2/3">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      className="w-full h-64 object-cover"
                    />
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="bg-morocco-sand/10 text-gray-700">
                          {course.category}
                        </Badge>
                        <Badge className={
                          course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {course.level}
                        </Badge>
                        {course.price === 0 && (
                          <Badge className="bg-morocco-clay text-white">Free</Badge>
                        )}
                      </div>
                      
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {course.title}
                      </h1>
                      
                      <p className="text-lg text-gray-600 mb-4">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{course.rating.toFixed(1)}</span>
                          <span className="text-gray-500 ml-1">({course.reviews.length} reviews)</span>
                        </div>
                        
                        <div className="flex items-center mr-4">
                          <Users className="h-5 w-5 text-gray-500 mr-1" />
                          <span>{course.enrolled.toLocaleString()} students</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-gray-500 mr-1" />
                          <span>{course.language}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <div className="mr-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>Last updated: March 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Purchase Card */}
                <div className="md:w-1/3 mt-6 md:mt-0">
                  <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    {course.price === 0 ? (
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-morocco-clay">Free</span>
                      </div>
                    ) : (
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-morocco-clay">${course.price.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {isEnrolled ? (
                      <div className="space-y-4">
                        <Link to={`/courses/${course.id}/learn`}>
                          <Button className="w-full bg-morocco-clay hover:bg-morocco-clay/90">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                          </Button>
                        </Link>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Course Progress</span>
                            <span className="font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                      </div>
                    ) : (
                      <Button 
                        onClick={handleEnroll} 
                        className="w-full bg-morocco-clay hover:bg-morocco-clay/90"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                    )}
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Course Duration</h3>
                          <p className="text-sm text-gray-600">{course.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <BookOpen className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Course Content</h3>
                          <p className="text-sm text-gray-600">{course.modules.length} modules • {totalLessons} lessons</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Includes</h3>
                          <ul className="text-sm text-gray-600 space-y-1 mt-1">
                            <li>Full lifetime access</li>
                            <li>Downloadable resources</li>
                            <li>Certificate of completion</li>
                            <li>Access on mobile and TV</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Course Content Tabs */}
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8 flex space-x-2 overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold mb-4">About This Course</h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {course.fullDescription}
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-morocco-clay mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
                      <ul className="space-y-2">
                        {course.prerequisites.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-morocco-clay mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-4">Course Materials</h2>
                      <div className="space-y-3">
                        {course.materials.map((material) => (
                          <div 
                            key={material.id}
                            className="flex items-center justify-between bg-morocco-sand/5 rounded-lg p-4 border border-morocco-sand/10"
                          >
                            <div className="flex items-center">
                              <Download className="h-5 w-5 text-morocco-clay mr-3" />
                              <div>
                                <h3 className="font-medium">{material.title}</h3>
                                <p className="text-sm text-gray-500">{material.type.toUpperCase()} • {material.size}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-morocco-clay border-morocco-clay hover:bg-morocco-clay/10">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="curriculum">
                  <div>
                    <h2 className="text-xl font-bold mb-6">Course Curriculum</h2>
                    <div className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        {course.modules.map((module, moduleIndex) => (
                          <AccordionItem key={module.id} value={module.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex justify-between items-center w-full pr-4">
                                <div className="text-left">
                                  <h3 className="font-medium">
                                    Module {moduleIndex + 1}: {module.title}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {module.duration} • {module.lessons.length} lessons
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 pt-2">
                                {module.lessons.map((lesson) => (
                                  <div 
                                    key={lesson.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-morocco-sand/5 transition-colors"
                                  >
                                    <div className="flex items-center">
                                      {lesson.type === 'video' ? (
                                        <Play className="h-4 w-4 text-morocco-clay mr-3" />
                                      ) : lesson.type === 'quiz' ? (
                                        <CheckCircle className="h-4 w-4 text-morocco-clay mr-3" />
                                      ) : (
                                        <BookOpen className="h-4 w-4 text-morocco-clay mr-3" />
                                      )}
                                      <div>
                                        <h4 className="text-sm font-medium">{lesson.title}</h4>
                                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                                      </div>
                                    </div>
                                    
                                    {lesson.preview && (
                                      <Badge variant="outline" className="text-morocco-clay border-morocco-clay">
                                        Preview
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor">
                  <div>
                    <h2 className="text-xl font-bold mb-6">About the Instructor</h2>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="https://i.pravatar.cc/150?img=36" />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{course.instructor}</h3>
                        <p className="text-gray-500 mb-3">Language Instructor & Cultural Expert</p>
                        
                        <div className="flex space-x-4 mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm">4.9 Instructor Rating</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm">1,457 Reviews</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm">5,280 Students</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          Amina Belkadi is a native Moroccan language instructor with over 10 years of experience teaching Darija to international students. Born and raised in Fes, she studied linguistics at Mohammed V University in Rabat and has worked with language schools, diplomatic missions, and cultural exchange programs throughout Morocco and abroad.
                        </p>
                        
                        <p className="text-gray-700">
                          Her teaching philosophy combines practical, everyday language with cultural context, helping students not just speak Darija but understand the nuances of Moroccan communication styles and customs. Amina is passionate about bridging cultural gaps and fostering international understanding through language education.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div>
                    <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                      <div className="md:w-1/3 bg-white rounded-xl p-6 border border-morocco-sand/20">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-morocco-clay mb-2">{course.rating.toFixed(1)}</div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">Course Rating • {course.reviews.length} Reviews</p>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = course.reviews.filter(r => Math.floor(r.rating) === star).length;
                            const percentage = course.reviews.length > 0 
                              ? Math.round((count / course.reviews.length) * 100) 
                              : 0;
                            
                            return (
                              <div key={star} className="flex items-center">
                                <div className="flex items-center w-12">
                                  <span className="text-sm font-medium mr-1">{star}</span>
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                </div>
                                <div className="w-full ml-2">
                                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-yellow-400 rounded-full" 
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <span className="ml-2 text-sm text-gray-500 w-12 text-right">
                                  {percentage}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 space-y-6">
                        {course.reviews.map((review) => (
                          <div key={review.id} className="border-b border-morocco-sand/10 pb-6 last:border-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={review.userAvatar || `https://i.pravatar.cc/150?u=${review.id}`} />
                                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{review.userName}</h4>
                                  <div className="flex items-center">
                                    <div className="flex mr-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {new Date(review.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default CourseDetail;
