
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample data for guides
const guides = [
  { id: 1, name: 'Hassan El Ouazzani', location: 'Marrakech', languages: ['English', 'Arabic', 'French'], rating: 4.9, verified: true },
  { id: 2, name: 'Fatima Zahra', location: 'Fes', languages: ['English', 'Arabic', 'Spanish'], rating: 4.7, verified: true },
  { id: 3, name: 'Mohammed Alami', location: 'Chefchaouen', languages: ['English', 'Arabic', 'German'], rating: 4.8, verified: true },
  { id: 4, name: 'Amina Tazi', location: 'Essaouira', languages: ['English', 'Arabic', 'French'], rating: 4.5, verified: false },
  { id: 5, name: 'Youssef Benjelloun', location: 'Tangier', languages: ['English', 'Arabic', 'Italian'], rating: 4.6, verified: true },
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
              <TableHead>Guide</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{guide.name}</span>
                  </div>
                </TableCell>
                <TableCell>{guide.location}</TableCell>
                <TableCell>{guide.languages.join(', ')}</TableCell>
                <TableCell>{guide.rating} / 5</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    guide.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {guide.verified ? 'Verified' : 'Pending'}
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
