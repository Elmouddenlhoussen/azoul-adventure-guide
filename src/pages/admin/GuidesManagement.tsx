
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Search, Eye, Filter, Download, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for guides
const guides = [
  { 
    id: 1, 
    name: 'Hassan El Ouazzani', 
    location: 'Marrakech', 
    languages: 'English, Arabic, French, Spanish', 
    specialties: 'Cultural Tours, Food Experiences', 
    rating: 4.8, 
    featured: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop',
    tours: 3,
    bookings: 28,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Fatima Zahra', 
    location: 'Fes', 
    languages: 'English, Arabic, French', 
    specialties: 'Historical Sites, Craft Workshops', 
    rating: 4.9, 
    featured: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop',
    tours: 4,
    bookings: 35,
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Ibrahim Amrani', 
    location: 'Chefchaouen', 
    languages: 'English, Arabic, Spanish', 
    specialties: 'Photography, Hiking', 
    rating: 4.7, 
    featured: false,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=48&h=48&fit=crop',
    tours: 2,
    bookings: 14,
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Yasmine Alaoui', 
    location: 'Essaouira', 
    languages: 'English, Arabic, French, German', 
    specialties: 'Coastal Tours, Culinary', 
    rating: 4.6, 
    featured: true,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop',
    tours: 3,
    bookings: 22,
    status: 'active'
  },
  { 
    id: 5, 
    name: 'Ahmed Bakkali', 
    location: 'Tangier', 
    languages: 'English, Arabic, Spanish, Portuguese', 
    specialties: 'Historical Tours, Cultural Experiences', 
    rating: 4.5, 
    featured: false,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop',
    tours: 2,
    bookings: 17,
    status: 'pending'
  },
  { 
    id: 6, 
    name: 'Leila Bennani', 
    location: 'Rabat', 
    languages: 'English, Arabic, French', 
    specialties: 'Government Buildings, Museums', 
    rating: 4.4, 
    featured: false,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop',
    tours: 1,
    bookings: 8,
    status: 'inactive'
  },
];

const GuidesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter guides based on search term
  const filteredGuides = guides.filter(guide => 
    guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.specialties.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewGuide = (guide: any) => {
    setSelectedGuide(guide);
    setViewDialogOpen(true);
  };

  const handleDeleteConfirmation = (guide: any) => {
    setSelectedGuide(guide);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // Logic to delete guide
    console.log(`Deleting guide with ID: ${selectedGuide.id}`);
    setDeleteDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Guide Management</h1>
          <p className="text-muted-foreground">Manage all local guides and their profile information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Guide
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow mb-8">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search guides by name, location, or specialty..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Status
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Location
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Featured
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guide</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Tours</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No guides found. Try a different search term.
                  </TableCell>
                </TableRow>
              ) : (
                filteredGuides.map((guide) => (
                  <TableRow key={guide.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={guide.image} alt={guide.name} />
                          <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{guide.name}</div>
                          <div className="text-sm text-gray-500">{guide.languages.split(',')[0]}{guide.languages.split(',').length > 1 ? ' +' + (guide.languages.split(',').length - 1) : ''}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{guide.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {guide.specialties.split(',').map((specialty, i) => (
                          <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
                            {specialty.trim()}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{guide.tours} tours</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{guide.rating}</span>
                        <span className="text-muted-foreground text-sm">/ 5</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(guide.status)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        guide.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {guide.featured ? 'Yes' : 'No'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewGuide(guide)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteConfirmation(guide)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredGuides.length}</span> of <span className="font-medium">{guides.length}</span> guides
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      {/* View Guide Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Guide Details</DialogTitle>
            <DialogDescription>
              Detailed information about this guide
            </DialogDescription>
          </DialogHeader>
          
          {selectedGuide && (
            <div className="mt-4">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={selectedGuide.image} alt={selectedGuide.name} />
                      <AvatarFallback className="text-3xl">{selectedGuide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{selectedGuide.name}</h2>
                    <p className="text-muted-foreground">{selectedGuide.location}</p>
                    <div className="mt-4">
                      {getStatusBadge(selectedGuide.status)}
                      {selectedGuide.featured && (
                        <Badge className="bg-morocco-clay ml-2">Featured</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <Tabs defaultValue="info">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="info">Information</TabsTrigger>
                      <TabsTrigger value="stats">Statistics</TabsTrigger>
                      <TabsTrigger value="history">Booking History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info" className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Languages</h3>
                        <p>{selectedGuide.languages}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Specialties</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedGuide.specialties.split(',').map((specialty: string, i: number) => (
                            <Badge key={i} variant="outline">{specialty.trim()}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Biography</h3>
                        <p>Professional tour guide with expertise in cultural and historical experiences. 
                           Fluent in multiple languages and committed to providing authentic experiences
                           for visitors to Morocco.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                        <p>Email: {selectedGuide.name.toLowerCase().replace(' ', '.')}@azoulmorocco.com</p>
                        <p>Phone: +212 6xx xxxxxx</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="stats" className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 text-center">
                          <p className="text-muted-foreground text-sm">Total Tours</p>
                          <p className="text-3xl font-bold">{selectedGuide.tours}</p>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                          <p className="text-muted-foreground text-sm">Bookings</p>
                          <p className="text-3xl font-bold">{selectedGuide.bookings}</p>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                          <p className="text-muted-foreground text-sm">Rating</p>
                          <p className="text-3xl font-bold">{selectedGuide.rating}/5</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Performance</h3>
                        <div className="h-4 w-full bg-gray-100 rounded-full">
                          <div 
                            className="h-4 bg-green-500 rounded-full" 
                            style={{ width: `${(selectedGuide.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="history" className="mt-4">
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tour</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Guests</TableHead>
                              <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Marrakech City Tour</TableCell>
                              <TableCell>May 15, 2023</TableCell>
                              <TableCell>4</TableCell>
                              <TableCell className="text-right">$240</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Food Experience</TableCell>
                              <TableCell>May 18, 2023</TableCell>
                              <TableCell>6</TableCell>
                              <TableCell className="text-right">$330</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Historical Sites Tour</TableCell>
                              <TableCell>May 20, 2023</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell className="text-right">$195</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Guide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedGuide?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Guide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuidesManagement;
