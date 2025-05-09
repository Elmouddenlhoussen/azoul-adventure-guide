
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from '@/components/AnimatedTransition';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { uploadFile } from '@/services/storageService';

const ShareExperiencePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = 'Share Your Experience | Azoul';
    window.scrollTo(0, 0);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !content || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      // Upload image if provided
      if (image) {
        const uploadedUrl = await uploadFile(image);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      // Here we would normally send the data to an API
      // For now, we'll simulate a successful submission
      
      toast({
        title: "Experience shared!",
        description: "Thank you for sharing your experience with our community",
      });
      
      // Navigate to the experiences page after submission
      setTimeout(() => {
        navigate('/community/experiences');
      }, 2000);
      
    } catch (error) {
      console.error('Error sharing experience:', error);
      toast({
        title: "Error",
        description: "There was a problem sharing your experience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen py-16 bg-morocco-sand/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-3xl font-bold mb-6 text-center">Share Your Morocco Experience</h1>
              <p className="text-gray-600 mb-8 text-center">
                Tell us about your journey, adventures, and discoveries in Morocco. 
                Your stories inspire other travelers!
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    placeholder="Give your experience a catchy title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    placeholder="Where in Morocco did this happen?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Your Experience</Label>
                  <Textarea 
                    id="content"
                    placeholder="Share your story, tips, or recommendations..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Upload an Image</Label>
                  <Input 
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-morocco-clay hover:bg-morocco-clay/90 min-w-[200px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Share Experience"}
                  </Button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ShareExperiencePage;
