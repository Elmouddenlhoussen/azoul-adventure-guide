
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid2x2, ListView, UploadCloud, Trash2, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock API functions
const fetchMedia = (): Promise<Array<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "marrakech-plaza.jpg", url: "https://images.unsplash.com/photo-1597212720452-0576ff58b32c", type: "image", size: "1.2 MB", uploadedAt: "2023-05-10" },
        { id: 2, name: "desert-tour.jpg", url: "https://images.unsplash.com/photo-1536077295113-9bd404bdbfc1", type: "image", size: "0.8 MB", uploadedAt: "2023-05-15" },
        { id: 3, name: "chefchaouen-streets.jpg", url: "https://images.unsplash.com/photo-1548018560-c7196548ed6d", type: "image", size: "1.5 MB", uploadedAt: "2023-05-18" },
        { id: 4, name: "morocco-guide.pdf", url: "", type: "document", size: "2.4 MB", uploadedAt: "2023-05-20" },
        { id: 5, name: "fes-market.jpg", url: "https://images.unsplash.com/photo-1570193825602-b86d19101838", type: "image", size: "1.1 MB", uploadedAt: "2023-05-22" },
      ]);
    }, 800);
  });
};

const MediaManagement = () => {
  const { toast } = useToast();
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchMedia()
      .then(data => {
        setMedia(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch media:", error);
        toast({
          title: "Error",
          description: "Failed to load media files",
          variant: "destructive",
        });
        setLoading(false);
      });
  }, [toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, you would upload the file to your server/cloud storage
    // For this demo, we'll simulate adding the file to the list
    const newMedia = Array.from(files).map((file, index) => {
      const id = media.length > 0 ? Math.max(...media.map(m => m.id)) + index + 1 : index + 1;
      return {
        id,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split('T')[0],
        url: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
      };
    });
    
    setMedia([...media, ...newMedia]);
    
    toast({
      title: "Upload successful",
      description: `${newMedia.length} file(s) uploaded successfully.`,
    });
  };
  
  const handleDeleteMedia = (id: number) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setMedia(media.filter(item => item.id !== id));
      
      toast({
        title: "File deleted",
        description: "File has been deleted successfully.",
        variant: "destructive",
      });
    }
  };
  
  const openRenameDialog = (mediaItem: any) => {
    setSelectedMedia(mediaItem);
    setNewName(mediaItem.name);
    setIsRenameDialogOpen(true);
  };
  
  const handleRenameMedia = () => {
    if (!selectedMedia || !newName.trim()) return;
    
    setMedia(media.map(item => 
      item.id === selectedMedia.id ? { ...item, name: newName.trim() } : item
    ));
    
    setIsRenameDialogOpen(false);
    setSelectedMedia(null);
    setNewName('');
    
    toast({
      title: "File renamed",
      description: "File has been renamed successfully.",
    });
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
              <ListView className="h-4 w-4" />
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
                        {item.type === 'image' ? (
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
                          onClick={() => handleDeleteMedia(item.id)}
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
                                onClick={() => handleDeleteMedia(item.id)}
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
