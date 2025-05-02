
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Search, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  getDestinations,
  Destination, 
  updateDestinationImage, 
  createDestination, 
  updateDestination,
  deleteDestination 
} from '@/data/destinations';
import { MediaSelector } from '@/components/admin/MediaSelector';
import { useToast } from '@/hooks/use-toast';
import { DestinationForm } from '@/components/admin/forms/DestinationForm';

const DestinationsManagement = () => {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setLoading(true);
    const data = await getDestinations();
    setDestinations(data);
    setLoading(false);
  };

  const handleUpdateImage = async (imageUrl: string) => {
    if (selectedDestinationId) {
      const success = await updateDestinationImage(selectedDestinationId, imageUrl);
      
      if (success) {
        toast({
          title: "Image updated",
          description: "The destination image has been updated successfully.",
        });
        loadDestinations();
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update the destination image.",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpenEditDialog = (destination: Destination) => {
    setEditingDestination(destination);
    setIsFormDialogOpen(true);
  };

  const handleDeleteDestination = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      const success = await deleteDestination(id);
      
      if (success) {
        toast({
          title: "Destination deleted",
          description: "The destination has been deleted successfully.",
        });
        loadDestinations();
      } else {
        toast({
          title: "Deletion failed",
          description: "Failed to delete the destination.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFormSubmit = async (formData: any) => {
    let success = false;
    
    if (editingDestination) {
      // Update existing destination
      success = await updateDestination(editingDestination.id, formData);
      
      if (success) {
        toast({
          title: "Destination updated",
          description: "The destination has been updated successfully.",
        });
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update the destination.",
          variant: "destructive",
        });
      }
    } else {
      // Create new destination
      const newDestination = await createDestination({
        ...formData,
        rating: formData.rating || 4.5, // Default rating
      });
      
      if (newDestination) {
        toast({
          title: "Destination created",
          description: "The new destination has been created successfully.",
        });
        success = true;
      } else {
        toast({
          title: "Creation failed",
          description: "Failed to create the new destination.",
          variant: "destructive",
        });
      }
    }
    
    if (success) {
      setIsFormDialogOpen(false);
      setEditingDestination(null);
      loadDestinations();
    }
  };

  const filteredDestinations = destinations.filter(
    destination => 
      destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Destination Management</h1>
        <Button onClick={() => {
          setEditingDestination(null);
          setIsFormDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search destinations..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>
                    <img 
                      src={destination.image} 
                      alt={destination.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{destination.title}</TableCell>
                  <TableCell>{destination.location}</TableCell>
                  <TableCell>{destination.rating} / 5</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      destination.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {destination.featured ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSelectedDestinationId(destination.id);
                        setIsMediaSelectorOpen(true);
                      }}
                      title="Change Image"
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenEditDialog(destination)}
                      title="Edit Destination"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDestination(destination.id)}
                      title="Delete Destination"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  {destinations.length === 0 ? 'No destinations found. Add your first destination!' : 'No destinations found matching your search.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Media Selector Dialog */}
      <MediaSelector
        open={isMediaSelectorOpen}
        onClose={() => {
          setIsMediaSelectorOpen(false);
          setSelectedDestinationId(null);
        }}
        onSelect={handleUpdateImage}
        title="Select Destination Image"
        allowUpload={true}
      />

      {/* Destination Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DestinationForm
            onClose={() => setIsFormDialogOpen(false)}
            onSubmit={handleFormSubmit}
            initialData={editingDestination}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DestinationsManagement;
