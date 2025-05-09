
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ShareExperiencePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Experience shared",
        description: "Thank you for sharing your experience!",
      });
      setIsSubmitting(false);
      navigate('/community/experiences');
    }, 1500);
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Share Your Experience</h1>
            <p className="text-muted-foreground mb-8 text-center">
              Tell us about your journey in Morocco and inspire fellow travelers
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Give your experience a catchy title" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="Where in Morocco did this happen?" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Your Story</Label>
                <Textarea 
                  id="content" 
                  placeholder="Share the details of your experience..."
                  rows={6}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  type="url"
                  placeholder="Add a link to an image that represents your experience (optional)" 
                />
                <p className="text-xs text-muted-foreground">
                  In a real app, you would be able to upload an image directly
                </p>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-4"
                  onClick={() => navigate('/community/experiences')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-morocco-clay hover:bg-morocco-clay/90" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Share Experience'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ShareExperiencePage;
