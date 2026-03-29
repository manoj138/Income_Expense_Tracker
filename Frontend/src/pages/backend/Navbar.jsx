import {
  Bell,
  ChevronDown,
  ChevronUp,
  LogOut,
  User,
  UserCog,
  Search,
  Sparkles
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Api } from "../../components/common/Api/api";
import ThemeToggle from "../../components/common/ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${user.id}/find`);
      setUserData(res.data.data);
    } catch (error) {
      console.log("🚀 ~ fetchUser ~ error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-3 flex items-center justify-between sticky top-0 z-50 w-full transition-all duration-500">
      
      {/* 1. Left Section - Page Title & Search Identity */}
      <div className="flex items-center gap-8">
        
        <h2 className="hidden md:block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
          Internal Dashboard
        </h2>
      </div>

      {/* 2. Right Section - Actions & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Theme Toggle */}
        <div className="hover:scale-110 transition-transform duration-300">
          <ThemeToggle />
        </div>

        {/* Enhanced Notification Bell */}
        <button className="p-2.5 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all relative group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-[0_0_8px_#f43f5e]"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            className={`
              flex items-center gap-3 pl-1.5 pr-3 py-1.5 rounded-[1.2rem] cursor-pointer transition-all duration-300
              ${open ? 'bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-500/20' : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg'}
            `}
            onClick={() => setOpen(!open)}
          >
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-blue-500/20 relative overflow-hidden group">
              <span className="relative z-10">{userData?.name?.charAt(0).toUpperCase()}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            </div>
            
            <div className="hidden sm:block text-left">
              <p className="text-xs font-[1000] text-slate-900 dark:text-white leading-none">
                {userData?.name?.split(' ')[0]}
              </p>
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-1">
                Admin Account
              </p>
            </div>

            <div className="ml-1">
              {open ? (
                <ChevronUp size={14} className="text-blue-500 animate-bounce" />
              ) : (
                <ChevronDown size={14} className="text-slate-400" />
              )}
            </div>
          </div>

          {/* Dropdown Menu - Glassmorphism style */}
          {open && (
            <div className="absolute right-0 mt-4 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2rem] border border-slate-100 dark:border-slate-800 p-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">{userData?.email || "user@smartwallet.com"}</p>
              </div>

              <Link
                to="/admin/profile"
                className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all group"
                onClick={() => setOpen(false)}
              >
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                  <User size={14} />
                </div>
                My Profile
              </Link>

              <Link
                to="/profile/edit"
                className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all group"
                onClick={() => setOpen(false)}
              >
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                  <UserCog size={14} />
                </div>
                Account Settings
              </Link>

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2" />

              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all group"
              >
                <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
                  <LogOut size={14} />
                </div>
                Sign Out Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;