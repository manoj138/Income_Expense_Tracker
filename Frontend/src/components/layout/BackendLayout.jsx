import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Asidebar from "../../pages/backend/Asidebar";
import Navbar from "../../pages/backend/Navbar";

const getInitialSidebarState = () => {
  if (typeof window === "undefined") return true;
  return window.innerWidth >= 1024;
};

const BackendLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans transition-all duration-700 dark:bg-[#020617]">
      <Asidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="relative flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dark:hidden bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_48%,_#f8fafc_100%)]" />
        <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-500/12 blur-[150px] animate-pulse dark:bg-blue-600/20" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[150px] dark:bg-purple-600/20" />

        <Navbar 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
        />

        <main className="scrollbar-hide relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BackendLayout;
