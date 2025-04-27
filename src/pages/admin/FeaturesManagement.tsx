
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FeatureForm } from '@/components/admin/forms/FeatureForm';

// Mock API functions - would be replaced with real API calls
const fetchFeatures = (): Promise<Array<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Desert Safari", category: "Adventure", description: "Experience the Sahara desert with expert guides", image: "https://images.unsplash.com/photo-1536077295113-9bd404bdbfc1", featured: true },
        { id: 2, title: "Markets Tour", category: "Culture", description: "Explore traditional Moroccan souks", image: "https://images.unsplash.com/photo-1559734840-f9509ee5677f", featured: true },
        { id: 3, title: "Camel Trekking", category: "Adventure", description: "Trek through the desert on camelback", image: "https://images.unsplash.com/photo-1585150603737-20d133a6c34c", featured: false }
      ]);
    }, 800);
  });
};

const FeaturesManagement = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<any | null>(null);

  useEffect(() => {
    fetchFeatures()
      .then(data => {
        setFeatures(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch features:", error);
        toast({
          title: "Error",
          description: "Failed to load features data",
          variant: "destructive",
        });
        setLoading(false);
      });
  }, [toast]);

  const handleAddFeature = (newFeature: any) => {
    const featureWithId = {
      ...newFeature,
      id: features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1,
    };
    
    setFeatures([...features, featureWithId]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Feature added",
      description: `${newFeature.title} has been added successfully.`,
    });
  };
  
  const handleEditFeature = (updatedFeature: any) => {
    setFeatures(features.map(feature => 
      feature.id === currentFeature?.id ? { ...feature, ...updatedFeature } : feature
    ));
    
    setIsEditDialogOpen(false);
    setCurrentFeature(null);
    
    toast({
      title: "Feature updated",
      description: `${updatedFeature.title} has been updated successfully.`,
    });
  };
  
  const handleDeleteFeature = (id: number) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      setFeatures(features.filter(feature => feature.id !== id));
      
      toast({
        title: "Feature deleted",
        description: "Feature has been deleted successfully.",
        variant: "destructive",
      });
    }
  };
  
  const openEditDialog = (feature: any) => {
    setCurrentFeature(feature);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Features Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Features</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell className="font-medium">{feature.title}</TableCell>
                      <TableCell>{feature.category}</TableCell>
                      <TableCell>{feature.featured ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(feature)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteFeature(feature.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {features.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No features found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Feature Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Feature</DialogTitle>
          </DialogHeader>
          <FeatureForm onSubmit={handleAddFeature} onClose={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Feature Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
          </DialogHeader>
          {currentFeature && (
            <FeatureForm 
              initialData={currentFeature} 
              onSubmit={handleEditFeature} 
              onClose={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeaturesManagement;
