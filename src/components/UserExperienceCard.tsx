
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/hooks/use-language';

export type UserExperience = {
  id: string;
  title: string;
  content: string;
  location: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  postedAt: string;
  likes: number;
  comments: number;
};

interface UserExperienceCardProps {
  experience: UserExperience;
  index?: number;
}

const UserExperienceCard = ({ experience, index = 0 }: UserExperienceCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animation: 'fadeIn 0.5s ease-in-out forwards'
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={experience.imageUrl} 
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-xs font-medium rounded-full">
          {experience.location}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3 gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={experience.author.avatarUrl} alt={experience.author.name} />
            <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{experience.author.name}</span>
          <span className="text-xs text-gray-500 ml-auto">{experience.postedAt}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-morocco-clay transition-colors">
          {experience.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {experience.content}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-sm text-gray-500">
            <span>❤️ {experience.likes}</span>
            <span>💬 {experience.comments}</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-morocco-clay hover:text-morocco-clay/90">
            <Link to={`/experiences/${experience.id}`}>
              {t('read_more')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserExperienceCard;
