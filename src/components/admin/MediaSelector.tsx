
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface MediaSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface MediaFile {
  name: string;
  url: string;
  type: string;
}

export const MediaSelector = ({ open, onClose, onSelect }: MediaSelectorProps) => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

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
          };
        })
      );

      setMedia(mediaFiles);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch media:", error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-4">
            {media.filter(item => item.type.startsWith('image/')).map((item) => (
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
              </div>
            ))}
            {media.length === 0 && (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                No images found. Upload some images in the Media Management section.
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
