
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminDashboard from '@/pages/admin/Dashboard';
import UsersManagement from '@/pages/admin/UsersManagement';
import DestinationsManagement from '@/pages/admin/DestinationsManagement';
import GuidesManagement from '@/pages/admin/GuidesManagement';
import ToursManagement from '@/pages/admin/ToursManagement';
import AccommodationsManagement from '@/pages/admin/AccommodationsManagement';
import { AdminSidebar } from './AdminSidebar';

const AdminRoutes = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="destinations" element={<DestinationsManagement />} />
            <Route path="guides" element={<GuidesManagement />} />
            <Route path="tours" element={<ToursManagement />} />
            <Route path="accommodations" element={<AccommodationsManagement />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminRoutes;
