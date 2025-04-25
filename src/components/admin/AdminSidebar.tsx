
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  BookOpen, 
  Users, 
  Mail, 
  Image, 
  BarChart,
  LogOut,
  Settings
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth-context";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  // Determine active item based on current route
  const getActiveItem = () => {
    const path = location.pathname.split('/admin/')[1] || '';
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  
  const [activeItem, setActiveItem] = useState(getActiveItem());
  
  const handleExitAdmin = () => {
    navigate('/');
  };
  
  const handleNavigation = (path: string) => {
    const route = path === "Dashboard" ? "/admin" : `/admin/${path.toLowerCase()}`;
    navigate(route);
    setActiveItem(path);
  };
  
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Destinations", icon: Map, path: "/admin/destinations" },
    { label: "Features", icon: Compass, path: "/admin/features" },
    { label: "Courses", icon: BookOpen, path: "/admin/courses" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Subscribers", icon: Mail, path: "/admin/subscribers" },
    { label: "Media", icon: Image, path: "/admin/media" },
    { label: "Analytics", icon: BarChart, path: "/admin/analytics" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="mb-8 px-6 pt-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Azoul Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage your travel platform</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-500 dark:text-gray-400">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.label)}
                    className={`transition-all duration-200 ease-in-out hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 ${
                      activeItem === item.label 
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500" 
                        : ""
                    }`}
                  >
                    <item.icon className={`h-5 w-5 transition-transform duration-200 ${activeItem === item.label ? "text-purple-600 dark:text-purple-400" : ""}`} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-6 py-4 space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200" 
            onClick={handleExitAdmin}
          >
            <LogOut className="mr-2 h-4 w-4 text-blue-500" />
            <span className="text-blue-700 dark:text-blue-300">Exit Admin Panel</span>
          </Button>
          
          <Button 
            variant="destructive" 
            className="w-full justify-start hover:bg-red-600 transition-all duration-200" 
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
