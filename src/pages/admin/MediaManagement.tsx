
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid2x2, ListVideo, UploadCloud, Trash2, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface MediaFile {
  id: number;
  name: string;
  url: string;
  type: string;
  size: string;
  uploadedAt: string;
}

const MediaManagement = () => {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchMediaFiles();
  }, []);

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
            id: Date.now(), // Using timestamp as id since storage objects don't have unique ids
            name: file.name,
            url: publicUrl,
            type: file.metadata?.mimetype || 'unknown',
            size: `${(file.metadata?.size / (1024 * 1024)).toFixed(1)} MB`,
            uploadedAt: new Date(file.created_at || '').toISOString().split('T')[0],
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
    }
  };
  
  const handleDeleteMedia = async (name: string) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        const { error } = await supabase
          .storage
          .from('media')
          .remove([name]);

        if (error) throw error;
        
        setMedia(media.filter(item => item.name !== name));
        
        toast({
          title: "File deleted",
          description: "File has been deleted successfully.",
          variant: "destructive",
        });
      } catch (error) {
        console.error("Delete error:", error);
        toast({
          title: "Delete failed",
          description: "Failed to delete the file",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleRenameMedia = async () => {
    if (!selectedMedia || !newName.trim()) return;
    
    try {
      const oldPath = selectedMedia.name;
      const fileExt = oldPath.split('.').pop();
      const newPath = `${newName.trim()}.${fileExt}`;
      
      // Copy the file with new name
      const { error: copyError } = await supabase
        .storage
        .from('media')
        .copy(oldPath, newPath);

      if (copyError) throw copyError;

      // Delete the old file
      const { error: deleteError } = await supabase
        .storage
        .from('media')
        .remove([oldPath]);

      if (deleteError) throw deleteError;
      
      setIsRenameDialogOpen(false);
      setSelectedMedia(null);
      setNewName('');
      
      toast({
        title: "File renamed",
        description: "File has been renamed successfully.",
      });

      // Refresh the media list
      fetchMediaFiles();
    } catch (error) {
      console.error("Rename error:", error);
      toast({
        title: "Rename failed",
        description: "Failed to rename the file",
        variant: "destructive",
      });
    }
  };

  // Add the missing openRenameDialog function
  const openRenameDialog = (item: MediaFile) => {
    setSelectedMedia(item);
    setNewName(item.name.split('.')[0]); // Set initial name without extension
    setIsRenameDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Management</h1>
        <div className="flex space-x-2">
          <div className="flex border rounded-md">
            <Button 
              variant={view === 'grid' ? "default" : "ghost"} 
              size="icon"
              onClick={() => setView('grid')}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'list' ? "default" : "ghost"} 
              size="icon"
              onClick={() => setView('list')}
            >
              <ListVideo className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              multiple
              onChange={handleFileUpload} 
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload
              </label>
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {view === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {media.map((item) => (
                    <div key={item.id} className="relative group">
                      <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                        {item.type.startsWith('image/') ? (
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4">
                            <div className="text-2xl mb-2">📄</div>
                            <p className="text-xs text-center truncate w-full">{item.name}</p>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => openRenameDialog(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteMedia(item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1 truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                    </div>
                  ))}
                  {media.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No media files found
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Uploaded At</th>
                        <th className="text-right py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {media.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.type}</td>
                          <td className="py-2">{item.size}</td>
                          <td className="py-2">{item.uploadedAt}</td>
                          <td className="py-2">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => openRenameDialog(item)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteMedia(item.name)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {media.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-muted-foreground">
                            No media files found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="file-name">File Name</Label>
            <Input 
              id="file-name" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRenameMedia}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaManagement;
