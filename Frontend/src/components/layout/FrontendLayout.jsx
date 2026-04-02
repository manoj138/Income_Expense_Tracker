import React from "react";
import { Outlet } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

const FrontendLayout = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-4 font-sans transition-colors duration-300 dark:bg-gray-900 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_20%)]" />
      <div className="pointer-events-none absolute top-[-8rem] left-[-6rem] h-56 w-56 rounded-full bg-blue-500/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-5rem] h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default FrontendLayout;
