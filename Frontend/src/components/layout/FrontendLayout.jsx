import React from "react";
import { Outlet } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

const FrontendLayout = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans transition-colors duration-300 dark:bg-gray-900 sm:p-6">
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
