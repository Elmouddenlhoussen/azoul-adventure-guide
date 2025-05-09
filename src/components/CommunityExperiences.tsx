
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserExperienceCard, { UserExperience } from './UserExperienceCard';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/hooks/use-language';

// Sample user experiences data
const sampleExperiences: UserExperience[] = [
  {
    id: '1',
    title: 'Magical Night in the Sahara Desert',
    content: 'Spending a night under the stars in the Sahara was an unforgettable experience. The silence, the vastness, and the stunning night sky made me feel so small yet so connected to the universe.',
    location: 'Merzouga, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Sarah Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/62.jpg'
    },
    postedAt: '2 days ago',
    likes: 124,
    comments: 18
  },
  {
    id: '2',
    title: 'Getting Lost in Fes Medina',
    content: "The ancient Fes Medina is like stepping back in time. The narrow alleys, artisan workshops, and hidden gems around every corner made for an adventure I will never forget.",
    location: 'Fes, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1548112129-b5cf67e9507a?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'David Chen',
      avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    postedAt: '1 week ago',
    likes: 89,
    comments: 24
  },
  {
    id: '3',
    title: 'Cooking Class in Marrakech',
    content: "Learning to make authentic Moroccan tagine from a local chef was the highlight of my trip. The spices, techniques, and stories shared made the food taste even better!",
    location: 'Marrakech, Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=800&h=500&auto=format&fit=crop',
    author: {
      name: 'Emma Wilson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    postedAt: '3 weeks ago',
    likes: 156,
    comments: 31
  }
];

const CommunityExperiences = () => {
  const [experiences] = useState<UserExperience[]>(sampleExperiences);
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-morocco-sand/5">
      <div className="container px-4 mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('community_experiences')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('community_experiences_desc')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <UserExperienceCard 
              key={experience.id} 
              experience={experience} 
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-morocco-clay hover:bg-morocco-clay/90">
            <Link to="/community/share">
              {t('share_your_experience')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="ml-4">
            <Link to="/community/experiences">
              {t('view_all_experiences')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityExperiences;
