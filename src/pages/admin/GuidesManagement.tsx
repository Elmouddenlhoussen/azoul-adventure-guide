
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample data for guides
const guides = [
  { id: 1, name: 'Hassan El Ouazzani', location: 'Marrakech', languages: 'English, Arabic, French, Spanish', specialties: 'Cultural Tours, Food Experiences', rating: 4.8, featured: true },
  { id: 2, name: 'Fatima Zahra', location: 'Fes', languages: 'English, Arabic, French', specialties: 'Historical Sites, Craft Workshops', rating: 4.9, featured: true },
  { id: 3, name: 'Ibrahim Amrani', location: 'Chefchaouen', languages: 'English, Arabic, Spanish', specialties: 'Photography, Hiking', rating: 4.7, featured: false },
  { id: 4, name: 'Yasmine Alaoui', location: 'Essaouira', languages: 'English, Arabic, French, German', specialties: 'Coastal Tours, Culinary', rating: 4.6, featured: true },
  { id: 5, name: 'Ahmed Bakkali', location: 'Tangier', languages: 'English, Arabic, Spanish, Portuguese', specialties: 'Historical Tours, Cultural Experiences', rating: 4.5, featured: false },
];

const GuidesManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Guide Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Guide
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search guides..."
                className="w-full pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell className="font-medium">{guide.name}</TableCell>
                <TableCell>{guide.location}</TableCell>
                <TableCell>{guide.languages}</TableCell>
                <TableCell>{guide.specialties}</TableCell>
                <TableCell>{guide.rating} / 5</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    guide.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {guide.featured ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GuidesManagement;
