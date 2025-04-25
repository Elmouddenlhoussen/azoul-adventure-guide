
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExperienceSelection } from '@/types/booking';
import { experienceService, Experience } from '@/services/experienceService';
import { useToast } from '@/hooks/use-toast';

interface SelectExperienceProps {
  selectedExperience: ExperienceSelection | null;
  onSelect: (experience: ExperienceSelection) => void;
  onNext: () => void;
}

const SelectExperience: React.FC<SelectExperienceProps> = ({
  selectedExperience,
  onSelect,
  onNext,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await experienceService.getExperiences();
        setExperiences(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        toast({
          title: "Error loading experiences",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, [toast]);

  const handleSelect = (experience: Experience) => {
    onSelect({
      id: experience.id,
      type: experience.type,
      title: experience.title,
      price: experience.price,
      image: experience.image_url || '',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-morocco-clay"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 mb-4">Failed to load experiences: {error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Your Experience</h2>
        <p className="text-gray-600 mb-6">
          Choose from our curated selection of Moroccan experiences
        </p>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p>No experiences available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <Card
              key={experience.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedExperience?.id === experience.id
                  ? 'ring-2 ring-morocco-clay shadow-md'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleSelect(experience)}
            >
              <div className="aspect-video relative mb-4">
                {experience.image_url ? (
                  <img
                    src={experience.image_url}
                    alt={experience.title}
                    className="rounded-md object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                    No image
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-2">{experience.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{experience.location}</p>
              <p className="font-medium text-morocco-clay">
                ${experience.price.toFixed(2)}
              </p>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!selectedExperience}
          className="bg-morocco-clay hover:bg-morocco-clay/90"
        >
          Continue to Dates
        </Button>
      </div>
    </div>
  );
};

export default SelectExperience;
