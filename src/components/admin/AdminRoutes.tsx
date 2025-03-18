
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/Dashboard';
import UsersManagement from '@/pages/admin/UsersManagement';
import DestinationsManagement from '@/pages/admin/DestinationsManagement';
import GuidesManagement from '@/pages/admin/GuidesManagement';
import ToursManagement from '@/pages/admin/ToursManagement';
import { AdminSidebar } from './AdminSidebar';

const AdminRoutes = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="destinations" element={<DestinationsManagement />} />
          <Route path="guides" element={<GuidesManagement />} />
          <Route path="tours" element={<ToursManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
