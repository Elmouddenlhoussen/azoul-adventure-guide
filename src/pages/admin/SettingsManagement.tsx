
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Upload } from 'lucide-react';

const SettingsManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  
  // General settings
  const [siteName, setSiteName] = useState('Azoul Adventure Guide');
  const [siteDescription, setSiteDescription] = useState('Explore the beauty of Morocco with our expert guides.');
  const [contactEmail, setContactEmail] = useState('info@azoul.com');
  const [contactPhone, setContactPhone] = useState('+212 123 456 789');
  
  // Appearance settings
  const [primaryColor, setPrimaryColor] = useState('#006233');
  const [secondaryColor, setSecondaryColor] = useState('#c1272d');
  const [logoUrl, setLogoUrl] = useState('/logo.png');
  const [favicon, setFavicon] = useState('/favicon.ico');
  
  // Features settings
  const [featureSettings, setFeatureSettings] = useState([
    { id: 1, name: 'User Reviews', enabled: true },
    { id: 2, name: 'Online Booking', enabled: true },
    { id: 3, name: 'Live Chat Support', enabled: false },
    { id: 4, name: 'Newsletter Subscription', enabled: true },
    { id: 5, name: 'Social Media Sharing', enabled: true },
    { id: 6, name: 'Dark Mode', enabled: false },
  ]);
  
  // Admins
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@azoul.com', role: 'Super Admin' },
    { id: 2, name: 'John Doe', email: 'john@azoul.com', role: 'Content Manager' },
  ]);
  
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Content Manager');

  useEffect(() => {
    // Simulate settings loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance updated",
      description: "The appearance settings have been updated successfully.",
    });
  };
  
  const handleToggleFeature = (id: number) => {
    setFeatureSettings(featureSettings.map(feature => 
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ));
    
    const feature = featureSettings.find(f => f.id === id);
    
    if (feature) {
      toast({
        title: feature.enabled ? "Feature disabled" : "Feature enabled",
        description: `${feature.name} has been ${feature.enabled ? 'disabled' : 'enabled'}.`,
      });
    }
  };
  
  const handleAddAdmin = () => {
    if (!newAdminName || !newAdminEmail) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newAdmin = {
      id: admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1,
      name: newAdminName,
      email: newAdminEmail,
      role: newAdminRole,
    };
    
    setAdmins([...admins, newAdmin]);
    
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminRole('Content Manager');
    
    toast({
      title: "Admin added",
      description: `${newAdminName} has been added as ${newAdminRole}.`,
    });
  };
  
  const handleDeleteAdmin = (id: number) => {
    if (admins.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need to have at least one admin account.",
        variant: "destructive",
      });
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const adminToDelete = admins.find(a => a.id === id);
      
      setAdmins(admins.filter(admin => admin.id !== id));
      
      toast({
        title: "Admin deleted",
        description: `${adminToDelete?.name} has been removed.`,
        variant: "destructive",
      });
    }
  };
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to your server
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      
      toast({
        title: "Logo updated",
        description: "The new logo has been uploaded.",
      });
    }
  };
  
  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to your server
      const url = URL.createObjectURL(file);
      setFavicon(url);
      
      toast({
        title: "Favicon updated",
        description: "The new favicon has been uploaded.",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your site's basic information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input 
                    id="site-name" 
                    value={siteName} 
                    onChange={(e) => setSiteName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    value={siteDescription} 
                    onChange={(e) => setSiteDescription(e.target.value)} 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input 
                    id="contact-phone" 
                    value={contactPhone} 
                    onChange={(e) => setContactPhone(e.target.value)} 
                  />
                </div>
                
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize your site's look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="primary-color" 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-16 h-10"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="secondary-color" 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="w-16 h-10"
                      />
                      <Input 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 border rounded-md flex items-center justify-center overflow-hidden">
                      <img src={logoUrl} alt="Logo" className="max-w-full max-h-full" />
                    </div>
                    <div>
                      <Input 
                        type="file" 
                        id="logo-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 border rounded-md flex items-center justify-center overflow-hidden">
                      <img src={favicon} alt="Favicon" className="max-w-full max-h-full" />
                    </div>
                    <div>
                      <Input 
                        type="file" 
                        id="favicon-upload" 
                        className="hidden" 
                        accept="image/x-icon,image/png" 
                        onChange={handleFaviconUpload}
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="favicon-upload" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Favicon
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveAppearance}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Settings</CardTitle>
                <CardDescription>Enable or disable features on your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureSettings.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">{feature.name}</h3>
                      </div>
                      <Switch 
                        checked={feature.enabled} 
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Admin Accounts</CardTitle>
                <CardDescription>Manage admin users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="mb-6">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.role}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteAdmin(admin.id)}
                            disabled={admin.role === 'Super Admin'}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Add New Admin</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="new-admin-name" className="mb-2 block">Name</Label>
                      <Input 
                        id="new-admin-name" 
                        value={newAdminName} 
                        onChange={(e) => setNewAdminName(e.target.value)} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-admin-email" className="mb-2 block">Email</Label>
                      <Input 
                        id="new-admin-email" 
                        type="email" 
                        value={newAdminEmail} 
                        onChange={(e) => setNewAdminEmail(e.target.value)} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-admin-role" className="mb-2 block">Role</Label>
                      <select 
                        id="new-admin-role" 
                        value={newAdminRole} 
                        onChange={(e) => setNewAdminRole(e.target.value)}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="Content Manager">Content Manager</option>
                        <option value="Bookings Manager">Bookings Manager</option>
                        <option value="Support Staff">Support Staff</option>
                      </select>
                    </div>
                  </div>
                  <Button onClick={handleAddAdmin}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SettingsManagement;
