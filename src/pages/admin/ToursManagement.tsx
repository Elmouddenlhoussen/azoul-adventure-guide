
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample data for tours
const tours = [
  { id: 1, name: 'Marrakech City Tour', duration: '1 day', price: 75, rating: 4.8, featured: true },
  { id: 2, name: 'Sahara Desert Adventure', duration: '3 days', price: 350, rating: 4.9, featured: true },
  { id: 3, name: 'Fes Medina Discovery', duration: '1 day', price: 85, rating: 4.7, featured: false },
  { id: 4, name: 'Atlas Mountains Trek', duration: '2 days', price: 180, rating: 4.6, featured: true },
  { id: 5, name: 'Chefchaouen Blue City Tour', duration: '1 day', price: 90, rating: 4.8, featured: false },
];

const ToursManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tour Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tour
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search tours..."
                className="w-full pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tour Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price (USD)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium">{tour.name}</TableCell>
                <TableCell>{tour.duration}</TableCell>
                <TableCell>${tour.price}</TableCell>
                <TableCell>{tour.rating} / 5</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tour.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tour.featured ? 'Yes' : 'No'}
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

export default ToursManagement;
