
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SubscriberForm } from '@/components/admin/forms/SubscriberForm';
import { Input } from '@/components/ui/input';

// Mock API functions
const fetchSubscribers = (): Promise<Array<any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, email: "mark@example.com", status: "active", joinedDate: "2023-04-10" },
        { id: 2, email: "sarah@example.com", status: "active", joinedDate: "2023-04-15" },
        { id: 3, email: "alex@example.com", status: "unsubscribed", joinedDate: "2023-03-20" },
        { id: 4, email: "john@example.com", status: "active", joinedDate: "2023-05-05" },
        { id: 5, email: "emma@example.com", status: "active", joinedDate: "2023-05-12" },
      ]);
    }, 800);
  });
};

const SubscribersManagement = () => {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSubscriber, setCurrentSubscriber] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers()
      .then(data => {
        setSubscribers(data);
        setFilteredSubscribers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch subscribers:", error);
        toast({
          title: "Error",
          description: "Failed to load subscribers data",
          variant: "destructive",
        });
        setLoading(false);
      });
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = subscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubscribers(filtered);
    } else {
      setFilteredSubscribers(subscribers);
    }
  }, [searchTerm, subscribers]);

  const handleAddSubscriber = (newSubscriber: any) => {
    const subscriberWithId = {
      ...newSubscriber,
      id: subscribers.length > 0 ? Math.max(...subscribers.map(s => s.id)) + 1 : 1,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    
    setSubscribers([...subscribers, subscriberWithId]);
    setFilteredSubscribers([...filteredSubscribers, subscriberWithId]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Subscriber added",
      description: `${newSubscriber.email} has been added successfully.`,
    });
  };
  
  const handleEditSubscriber = (updatedSubscriber: any) => {
    const newSubscribers = subscribers.map(subscriber => 
      subscriber.id === currentSubscriber?.id ? { ...subscriber, ...updatedSubscriber } : subscriber
    );
    
    setSubscribers(newSubscribers);
    setFilteredSubscribers(newSubscribers.filter(subscriber => 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.status.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    
    setIsEditDialogOpen(false);
    setCurrentSubscriber(null);
    
    toast({
      title: "Subscriber updated",
      description: `${updatedSubscriber.email} has been updated successfully.`,
    });
  };
  
  const handleDeleteSubscriber = (id: number) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      const newSubscribers = subscribers.filter(subscriber => subscriber.id !== id);
      
      setSubscribers(newSubscribers);
      setFilteredSubscribers(newSubscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.status.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      
      toast({
        title: "Subscriber deleted",
        description: "Subscriber has been deleted successfully.",
        variant: "destructive",
      });
    }
  };
  
  const openEditDialog = (subscriber: any) => {
    setCurrentSubscriber(subscriber);
    setIsEditDialogOpen(true);
  };
  
  const exportSubscribersToCSV = () => {
    const activeSubscribers = subscribers.filter(s => s.status === 'active');
    const headers = ["Email", "Status", "Joined Date"];
    const csvRows = [headers];
    
    activeSubscribers.forEach(subscriber => {
      csvRows.push([
        subscriber.email,
        subscriber.status,
        subscriber.joinedDate
      ]);
    });
    
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "subscribers.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: `${activeSubscribers.length} subscribers exported to CSV.`,
    });
  };
  
  const sendNewsletter = () => {
    // This would be integrated with an email service in a real implementation
    toast({
      title: "Newsletter initiated",
      description: "Your newsletter is being prepared for sending.",
    });
    
    // Simulate sending process
    setTimeout(() => {
      toast({
        title: "Newsletter sent",
        description: `Newsletter sent to ${subscribers.filter(s => s.status === 'active').length} active subscribers.`,
      });
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscribers Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSubscribersToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={sendNewsletter}>
            <Mail className="mr-2 h-4 w-4" />
            Send Newsletter
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Subscriber
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input 
          placeholder="Search by email or status..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Subscribers</CardTitle>
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
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          subscriber.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscriber.status}
                        </span>
                      </TableCell>
                      <TableCell>{subscriber.joinedDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(subscriber)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSubscribers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? "No matching subscribers found" : "No subscribers found"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Subscriber Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Subscriber</DialogTitle>
          </DialogHeader>
          <SubscriberForm 
            onSubmit={handleAddSubscriber} 
            onClose={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Subscriber Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
          </DialogHeader>
          {currentSubscriber && (
            <SubscriberForm 
              initialData={currentSubscriber} 
              onSubmit={handleEditSubscriber} 
              onClose={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscribersManagement;
