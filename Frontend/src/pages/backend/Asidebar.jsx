import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { 
  CreditCard, IndianRupee, LayoutDashboard, LogOut, Settings, 
  ChevronRight, Sparkles 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Asidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

 
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label, activeColor }) => (
    <Link
      to={to}
      className={`
        group relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-500
        ${isActive(to) 
          ? `bg-white dark:bg-slate-800 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-none text-slate-900 dark:text-white` 
          : `hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white`}
      `}
    >
      <div className="flex items-center gap-3.5 z-10">
        <div className={`
          p-2 rounded-xl transition-all duration-500
          ${isActive(to) ? `${activeColor} text-white shadow-lg` : `bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:scale-110`}
        `}>
          <Icon size={18} strokeWidth={isActive(to) ? 2.5 : 2} />
        </div>
        <span className={`text-sm tracking-tight ${isActive(to) ? 'font-[1000]' : 'font-bold'}`}>{label}</span>
      </div>
      
      {isActive(to) && (
        <ChevronRight size={14} className="text-slate-400 dark:text-slate-500 animate-pulse z-10" />
      )}
      
      {/* Background Glow Effect on Active */}
      {isActive(to) && (
        <div className="absolute inset-0 border border-slate-100 dark:border-slate-700/50 rounded-2xl pointer-events-none" />
      )}
    </Link>
  );

  return (
    <aside className="w-72 bg-[#F8FAFC] dark:bg-[#020617] flex flex-col sticky top-0 h-screen border-r border-slate-200 dark:border-slate-800/50 transition-all duration-500 z-50">
      
      {/* 1. Logo Section - Luxury Branding */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="relative">
            <div className="h-11 w-11 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-[14px] flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <Sparkles size={22} fill="currentColor" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-[#F8FAFC] dark:border-[#020617]" />
          </div>
          <div>
            <h1 className="text-xl font-[1000] text-slate-900 dark:text-white tracking-tighter leading-none">SmartWallet</h1>
            <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em]">Pro Edition</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Menu */}
      <div className="flex-1 px-4 space-y-2.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
        
        <NavLink to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" activeColor="bg-blue-600" />
        <NavLink to="/admin/income" icon={IndianRupee} label="Income" activeColor="bg-emerald-500" />
        <NavLink to="/admin/expense" icon={CreditCard} label="Expense" activeColor="bg-rose-500" />
        <NavLink to="/admin/setting" icon={Settings} label="Settings" activeColor="bg-slate-800 dark:bg-indigo-600" />
      </div>

      {/* 3. Pro Feature Card (Makes it look Expensive) */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 dark:from-indigo-600 dark:to-blue-700 p-5 rounded-[2rem] relative overflow-hidden shadow-xl">
           <div className="relative z-10">
              <p className="text-white font-black text-xs">Upgrade to Pro</p>
              <p className="text-indigo-200 text-[10px] mt-1 opacity-80 font-medium">Get advanced analytics and insights.</p>
              <button className="mt-4 w-full py-2 bg-white text-slate-900 text-[10px] font-[1000] rounded-xl hover:bg-indigo-50 transition-colors uppercase tracking-wider">Learn More</button>
           </div>
           <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        </div>
      </div>

      {/* 4. Logout Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <button
          onClick={logout}
          className="flex items-center justify-between w-full px-5 py-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-[1.5rem] transition-all duration-500 font-black group"
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-tight">Sign Out</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 opacity-40 group-hover:scale-150 transition-transform" />
        </button>
      </div>

    </aside>
  )
}

export default Asidebar