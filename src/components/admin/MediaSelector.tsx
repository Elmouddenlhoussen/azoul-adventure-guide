
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image, Search, UploadCloud } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface MediaSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
  allowUpload?: boolean;
}

interface MediaFile {
  name: string;
  url: string;
  type: string;
  size?: string;
}

export const MediaSelector = ({ 
  open, 
  onClose, 
  onSelect, 
  title = "Select Media", 
  allowUpload = false 
}: MediaSelectorProps) => {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (open) {
      fetchMediaFiles();
    }
  }, [open]);

  const fetchMediaFiles = async () => {
    try {
      const { data: filesData, error } = await supabase
        .storage
        .from('media')
        .list();

      if (error) throw error;

      const mediaFiles: MediaFile[] = await Promise.all(
        (filesData || []).map(async (file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('media')
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: publicUrl,
            type: file.metadata?.mimetype || 'unknown',
            size: file.metadata?.size 
              ? `${(file.metadata.size / (1024 * 1024)).toFixed(1)} MB` 
              : undefined,
          };
        })
      );

      setMedia(mediaFiles);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch media:", error);
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    try {
      setLoading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('media')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
      });

      await Promise.all(uploadPromises);
      
      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully.`,
      });

      // Refresh the media list
      fetchMediaFiles();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload one or more files",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const filteredMedia = media.filter(item => 
    item.type.startsWith('image/') && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-grow max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search images..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {allowUpload && (
            <div>
              <Input 
                type="file" 
                id="media-upload" 
                className="hidden" 
                accept="image/*"
                multiple
                onChange={handleFileUpload} 
              />
              <Button variant="outline" asChild>
                <label htmlFor="media-upload" className="cursor-pointer">
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload
                </label>
              </Button>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-4">
            {filteredMedia.map((item) => (
              <div 
                key={item.name}
                className="relative aspect-square rounded-md overflow-hidden cursor-pointer group"
                onClick={() => {
                  onSelect(item.url);
                  onClose();
                }}
              >
                <img 
                  src={item.url} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm">
                    Select Image
                  </Button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                  {item.name}
                </p>
              </div>
            ))}
            {filteredMedia.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                {media.length === 0 ? (
                  "No images found. Upload some images in the Media Management section."
                ) : (
                  "No images match your search. Try different keywords."
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
