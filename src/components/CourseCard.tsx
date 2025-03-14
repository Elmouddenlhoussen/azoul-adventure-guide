
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface CourseType {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnailUrl: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolled: number;
  rating: number;
  price: number;
  progress?: number;
  category: string;
  language: string;
}

interface CourseCardProps {
  course: CourseType;
  variant?: 'default' | 'enrolled';
}

const CourseCard = ({ course, variant = 'default' }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col border-morocco-sand/20 hover:border-morocco-clay/30 transition-colors">
        <div className="relative">
          <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            className="w-full h-48 object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <Badge className={`absolute top-2 right-2 ${getLevelColor(course.level)}`}>
            {course.level}
          </Badge>
          {course.price === 0 ? (
            <Badge className="absolute top-2 left-2 bg-morocco-clay text-white">
              Free
            </Badge>
          ) : null}
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-morocco-sand/10 text-gray-700 hover:bg-morocco-sand/20">
              {course.category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            </div>
          </div>
          <CardTitle className="text-lg mt-2 line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="text-xs">by {course.instructor}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{course.enrolled.toLocaleString()} students</span>
            </div>
          </div>
          
          {variant === 'enrolled' && course.progress !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0">
          {variant === 'default' ? (
            <div className="w-full flex justify-between items-center">
              <span className="font-bold text-morocco-clay text-lg">
                {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
              </span>
              <Link to={`/courses/${course.id}`} className="w-auto">
                <Button size="sm" className="bg-morocco-clay hover:bg-morocco-clay/90">
                  <BookOpen className="h-4 w-4 mr-1" />
                  View Course
                </Button>
              </Link>
            </div>
          ) : (
            <Link to={`/courses/${course.id}`} className="w-full">
              <Button variant="outline" className="w-full border-morocco-clay text-morocco-clay hover:bg-morocco-clay/10">
                Continue Learning
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
