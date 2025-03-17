
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Save } from "lucide-react";

interface CourseFormProps {
  onClose: () => void;
  onSubmit: (formData: CourseFormData) => void;
  initialData?: CourseFormData | null;
}

export interface CourseFormData {
  title: string;
  instructor: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export const CourseForm = ({ onClose, onSubmit, initialData = null }: CourseFormProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData?.title || '',
    instructor: initialData?.instructor || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    duration: initialData?.duration?.toString() || '',
    image: initialData?.image || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
            placeholder="Course title" 
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Input 
            id="instructor" 
            placeholder="Instructor name" 
            value={formData.instructor}
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
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input 
            id="price" 
            placeholder="29.99" 
            type="number" 
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours)</Label>
          <Input 
            id="duration" 
            placeholder="8" 
            type="number"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
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
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Course
        </Button>
      </DialogFooter>
    </form>
  );
};
