
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Save } from "lucide-react";

interface DestinationFormProps {
  onClose: () => void;
  onSubmit: (formData: DestinationFormData) => void;
  initialData?: DestinationFormData | null;
}

interface DestinationFormData {
  title: string;
  location: string;
  description: string;
  image: string;
  featured: boolean;
}

export const DestinationForm = ({ onClose, onSubmit, initialData = null }: DestinationFormProps) => {
  const [formData, setFormData] = useState<DestinationFormData>({
    title: initialData?.title || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    featured: initialData?.featured || false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            placeholder="Destination title" 
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            placeholder="City, Country" 
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Write a description" 
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          placeholder="https://example.com/image.jpg" 
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="featured" 
          checked={formData.featured}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="featured">Featured destination</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Destination
        </Button>
      </DialogFooter>
    </form>
  );
};
