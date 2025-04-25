
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calendar, Users, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock API functions - in a real app, these would make actual API calls
const fetchUserCount = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1234), 1000);
  });
};

const fetchBookingCount = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(423), 1000);
  });
};

const fetchRevenueTotal = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('24830'), 1000);
  });
};

const fetchRecentActivities = (): Promise<Array<{id: number, type: string, time: string}>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'New booking', time: '1 hour ago' },
        { id: 2, type: 'Account updated', time: '2 hours ago' },
        { id: 3, type: 'New booking', time: '3 hours ago' },
        { id: 4, type: 'Account updated', time: '4 hours ago' },
        { id: 5, type: 'New booking', time: '5 hours ago' },
      ]);
    }, 1200);
  });
};

const fetchPopularDestinations = (): Promise<Array<{name: string, percentage: number}>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Marrakech', percentage: 90 },
        { name: 'Fes', percentage: 80 },
        { name: 'Chefchaouen', percentage: 70 },
        { name: 'Essaouira', percentage: 60 },
        { name: 'Merzouga', percentage: 50 },
      ]);
    }, 800);
  });
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);
  const [revenueTotal, setRevenueTotal] = useState<string | null>(null);
  const [recentActivities, setRecentActivities] = useState<Array<{id: number, type: string, time: string}>>([]);
  const [popularDestinations, setPopularDestinations] = useState<Array<{name: string, percentage: number}>>([]);
  const [loading, setLoading] = useState({
    users: true,
    bookings: true,
    revenue: true,
    activities: true,
    destinations: true
  });

  useEffect(() => {
    // Fetch all dashboard data
    const fetchDashboardData = async () => {
      try {
        // Fetch users count
        fetchUserCount()
          .then(count => {
            setUserCount(count);
            setLoading(prev => ({ ...prev, users: false }));
          })
          .catch(error => {
            console.error("Failed to fetch user count:", error);
            toast({
              title: "Error",
              description: "Failed to load user statistics",
              variant: "destructive",
            });
            setLoading(prev => ({ ...prev, users: false }));
          });

        // Fetch bookings count
        fetchBookingCount()
          .then(count => {
            setBookingCount(count);
            setLoading(prev => ({ ...prev, bookings: false }));
          })
          .catch(error => {
            console.error("Failed to fetch booking count:", error);
            toast({
              title: "Error",
              description: "Failed to load booking statistics",
              variant: "destructive",
            });
            setLoading(prev => ({ ...prev, bookings: false }));
          });

        // Fetch revenue total
        fetchRevenueTotal()
          .then(total => {
            setRevenueTotal(total);
            setLoading(prev => ({ ...prev, revenue: false }));
          })
          .catch(error => {
            console.error("Failed to fetch revenue total:", error);
            toast({
              title: "Error",
              description: "Failed to load revenue statistics",
              variant: "destructive",
            });
            setLoading(prev => ({ ...prev, revenue: false }));
          });

        // Fetch recent activities
        fetchRecentActivities()
          .then(activities => {
            setRecentActivities(activities);
            setLoading(prev => ({ ...prev, activities: false }));
          })
          .catch(error => {
            console.error("Failed to fetch recent activities:", error);
            toast({
              title: "Error",
              description: "Failed to load recent activities",
              variant: "destructive",
            });
            setLoading(prev => ({ ...prev, activities: false }));
          });

        // Fetch popular destinations
        fetchPopularDestinations()
          .then(destinations => {
            setPopularDestinations(destinations);
            setLoading(prev => ({ ...prev, destinations: false }));
          })
          .catch(error => {
            console.error("Failed to fetch popular destinations:", error);
            toast({
              title: "Error",
              description: "Failed to load popular destinations",
              variant: "destructive",
            });
            setLoading(prev => ({ ...prev, destinations: false }));
          });
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      }
    };

    fetchDashboardData();
  }, [toast]);

  // Helper function for loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse flex space-x-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading.users ? (
              <LoadingSkeleton />
            ) : (
              <>
                <div className="text-2xl font-bold">{userCount}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading.bookings ? (
              <LoadingSkeleton />
            ) : (
              <>
                <div className="text-2xl font-bold">{bookingCount}</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading.revenue ? (
              <LoadingSkeleton />
            ) : (
              <>
                <div className="text-2xl font-bold">${revenueTotal}</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading.activities ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-morocco-sand/30 flex items-center justify-center">
                      <span className="font-medium text-morocco-clay">{activity.id}</span>
                    </div>
                    <div>
                      <p className="font-medium">User Action #{activity.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type} - {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            {loading.destinations ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {popularDestinations.map((destination, i) => (
                  <div key={destination.name} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-morocco-sand/30 flex items-center justify-center">
                        <span className="font-medium text-morocco-clay">{i + 1}</span>
                      </div>
                      <p className="font-medium">{destination.name}</p>
                    </div>
                    <p className="font-medium text-muted-foreground">{destination.percentage}%</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
