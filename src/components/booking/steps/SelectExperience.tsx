
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExperienceSelection, BookingType } from '@/components/booking/BookingSteps';
import { Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// Mock data - in a real app, this would come from an API
const experiences = {
  tours: [
    { id: 'tour-1', title: 'Marrakech City Tour', price: 75, image: 'https://images.unsplash.com/photo-1539020586742-8298e7bf6a3e?w=800&h=400&fit=crop' },
    { id: 'tour-2', title: 'Sahara Desert Adventure', price: 350, image: 'https://images.unsplash.com/photo-1548235890-693ae87a6eb3?w=800&h=400&fit=crop' },
    { id: 'tour-3', title: 'Fes Medina Discovery', price: 85, image: 'https://images.unsplash.com/photo-1548112381-ce4ecb1f9ae5?w=800&h=400&fit=crop' },
    { id: 'tour-4', title: 'Atlas Mountains Trek', price: 180, image: 'https://images.unsplash.com/photo-1588636142475-a62d56692870?w=800&h=400&fit=crop' }
  ],
  accommodations: [
    { id: 'acc-1', title: 'Luxury Riad in Marrakech', price: 250, image: 'https://images.unsplash.com/photo-1520222984843-df35ebc0f24d?w=800&h=400&fit=crop' },
    { id: 'acc-2', title: 'Desert Luxury Camp', price: 320, image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&h=400&fit=crop' },
    { id: 'acc-3', title: 'Oceanfront Villa in Essaouira', price: 280, image: 'https://images.unsplash.com/photo-1559735614-e35ef860a156?w=800&h=400&fit=crop' },
    { id: 'acc-4', title: 'Mountain Retreat in Chefchaouen', price: 190, image: 'https://images.unsplash.com/photo-1560095267-2879d4624f18?w=800&h=400&fit=crop' }
  ],
  guides: [
    { id: 'guide-1', title: 'Omar - Cultural Expert', price: 120, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop' },
    { id: 'guide-2', title: 'Fatima - Food Specialist', price: 100, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop' },
    { id: 'guide-3', title: 'Ahmed - Desert Navigator', price: 150, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop' },
    { id: 'guide-4', title: 'Nadia - Hiking Expert', price: 130, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=400&fit=crop' }
  ]
};

interface SelectExperienceProps {
  selectedExperience: ExperienceSelection | null;
  onSelect: (experience: ExperienceSelection) => void;
  onNext: () => void;
}

const SelectExperience: React.FC<SelectExperienceProps> = ({ selectedExperience, onSelect, onNext }) => {
  const [experienceType, setExperienceType] = useState<BookingType>('tour');

  const handleSelect = (experience: any) => {
    onSelect({
      ...experience,
      type: experienceType
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Your Experience</h2>
        <p className="text-gray-600 mb-6">
          Choose from our curated tours, accommodations, or expert guides for your Moroccan adventure
        </p>
      </div>

      <Tabs value={experienceType} onValueChange={(value) => setExperienceType(value as BookingType)}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="tour">Tours</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodations</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tour" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.tours.map((tour, index) => (
              <ExperienceCard 
                key={tour.id}
                item={tour}
                index={index}
                isSelected={selectedExperience?.id === tour.id}
                onSelect={() => handleSelect(tour)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="accommodation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.accommodations.map((acc, index) => (
              <ExperienceCard 
                key={acc.id}
                item={acc}
                index={index}
                isSelected={selectedExperience?.id === acc.id}
                onSelect={() => handleSelect(acc)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.guides.map((guide, index) => (
              <ExperienceCard 
                key={guide.id}
                item={guide}
                index={index}
                isSelected={selectedExperience?.id === guide.id}
                onSelect={() => handleSelect(guide)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

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

interface ExperienceCardProps {
  item: any;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, index, isSelected, onSelect }) => {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Card 
        className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
          isSelected ? 'ring-2 ring-morocco-clay' : ''
        }`}
        onClick={onSelect}
      >
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {isSelected && (
            <div className="absolute top-2 right-2 bg-morocco-clay text-white p-1 rounded-full">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-morocco-clay font-bold text-lg">${item.price}</span>
            <span className="text-sm text-gray-500">per day/night</span>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default SelectExperience;
