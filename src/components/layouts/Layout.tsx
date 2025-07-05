import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {isDesktop ? (
          <Sidebar />
        ) : (
          <MobileMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-6 md:pt-24">
          <div className="container-custom">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;