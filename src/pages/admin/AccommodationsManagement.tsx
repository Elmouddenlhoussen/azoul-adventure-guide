
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample data for accommodations
const accommodations = [
  { id: 1, name: 'Riad Al Andalous', location: 'Marrakech', type: 'Riad', price: 120, rating: 4.8, featured: true },
  { id: 2, name: 'Kasbah Tamadot', location: 'Atlas Mountains', type: 'Resort', price: 450, rating: 4.9, featured: true },
  { id: 3, name: 'Dar Ahlam', location: 'Ouarzazate', type: 'Luxury Hotel', price: 350, rating: 4.7, featured: false },
  { id: 4, name: 'Riad Fes', location: 'Fes', type: 'Riad', price: 190, rating: 4.6, featured: true },
  { id: 5, name: 'Blue Kaouki', location: 'Essaouira', type: 'Boutique Hotel', price: 95, rating: 4.5, featured: false },
];

const AccommodationsManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Accommodation Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Accommodation
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search accommodations..."
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
              <TableHead>Type</TableHead>
              <TableHead>Price (USD)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accommodations.map((accommodation) => (
              <TableRow key={accommodation.id}>
                <TableCell className="font-medium">{accommodation.name}</TableCell>
                <TableCell>{accommodation.location}</TableCell>
                <TableCell>{accommodation.type}</TableCell>
                <TableCell>${accommodation.price}/night</TableCell>
                <TableCell>{accommodation.rating} / 5</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    accommodation.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {accommodation.featured ? 'Yes' : 'No'}
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

export default AccommodationsManagement;
