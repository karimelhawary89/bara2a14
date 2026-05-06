import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import BaraaAssistant from '@/components/BaraaAssistant';

export default function MainLayout() {
  return (
    <div dir="rtl" className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-6 py-8 relative">
        <Outlet />
        <BaraaAssistant />
      </main>
    </div>
  );
}
