import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from '../services/authService';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ user, userProfile }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        userProfile={userProfile} 
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}
      
      {/* Header */}
      <Header 
        user={user} 
        userProfile={userProfile}
        onLogout={handleLogout}
      />
      
      {/* Main content */}
      <main className="relative z-10 flex-1 md:ml-64 p-4 md:p-6 min-h-screen flex flex-col transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
