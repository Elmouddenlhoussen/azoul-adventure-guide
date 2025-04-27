
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminDashboard from '@/pages/admin/Dashboard';
import UsersManagement from '@/pages/admin/UsersManagement';
import DestinationsManagement from '@/pages/admin/DestinationsManagement';
import GuidesManagement from '@/pages/admin/GuidesManagement';
import ToursManagement from '@/pages/admin/ToursManagement';
import AccommodationsManagement from '@/pages/admin/AccommodationsManagement';
import { AdminSidebar } from './AdminSidebar';
import FeaturesManagement from '@/pages/admin/FeaturesManagement';
import MediaManagement from '@/pages/admin/MediaManagement';
import SubscribersManagement from '@/pages/admin/SubscribersManagement';
import SettingsManagement from '@/pages/admin/SettingsManagement';
import AnalyticsManagement from '@/pages/admin/AnalyticsManagement';

const AdminRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin area has its own layout without the standard Header and Footer */}
      <SidebarProvider>
        <div className="flex flex-1 h-full overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="destinations" element={<DestinationsManagement />} />
              <Route path="guides" element={<GuidesManagement />} />
              <Route path="tours" element={<ToursManagement />} />
              <Route path="accommodations" element={<AccommodationsManagement />} />
              <Route path="features" element={<FeaturesManagement />} />
              <Route path="media" element={<MediaManagement />} />
              <Route path="subscribers" element={<SubscribersManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route path="analytics" element={<AnalyticsManagement />} />
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminRoutes;
