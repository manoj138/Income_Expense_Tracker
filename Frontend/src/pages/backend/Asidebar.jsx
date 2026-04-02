import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  ChevronRight,
  CreditCard,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, icon: Icon, label, activeColor, active, onNavigate }) => (
  <Link
    to={to}
    onClick={onNavigate}
    className={`group relative flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-500 ${
      active
        ? "bg-white text-slate-900 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-slate-800 dark:text-white dark:shadow-none"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
    }`}
  >
    <div className="z-10 flex items-center gap-3.5">
      <div
        className={`rounded-xl p-2 transition-all duration-500 ${
          active
            ? `${activeColor} text-white shadow-lg`
            : "bg-slate-100 text-slate-400 group-hover:scale-110 dark:bg-slate-800"
        }`}
      >
        <Icon size={18} strokeWidth={active ? 2.5 : 2} />
      </div>
      <span
        className={`text-sm tracking-tight ${active ? "font-[1000]" : "font-bold"}`}
      >
        {label}
      </span>
    </div>

    {active && (
      <>
        <ChevronRight
          size={14}
          className="z-10 text-slate-400 animate-pulse dark:text-slate-500"
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-slate-100 dark:border-slate-700/50" />
      </>
    )}
  </Link>
);

const Asidebar = ({ isOpen, onClose, onToggle }) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const desktopCollapsed = !isMobile && !isOpen;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 max-w-[86vw] shrink-0 overflow-hidden transition-all duration-300 ease-out lg:static lg:z-auto lg:max-w-none ${
          isMobile
            ? isOpen
              ? "w-72 translate-x-0"
              : "w-72 -translate-x-full"
            : isOpen
              ? "w-72 translate-x-0"
              : "w-20 translate-x-0"
        }`}
      >
        <aside className="flex h-screen w-full flex-col border-r border-slate-200/80 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-all duration-500 dark:border-slate-800/50 dark:bg-[#020617]">
          {desktopCollapsed ? (
            <div className="flex h-full flex-col items-center justify-between py-6">
              <div className="flex flex-col items-center gap-6">
                <button
                  type="button"
                  onClick={onToggle}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
                  aria-label="Open sidebar"
                >
                  <Menu size={19} />
                </button>

                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-transform duration-500 group-hover:rotate-6">
                      <Sparkles size={22} fill="currentColor" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-[#F8FAFC] bg-emerald-500 dark:border-[#020617]" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 [writing-mode:vertical-rl] rotate-180">
                    SmartWallet
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="group flex h-11 w-11 items-center justify-center rounded-2xl text-rose-500 transition-all duration-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                aria-label="Sign out"
              >
                <LogOut
                  size={20}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between border-b border-slate-100/80 p-6 dark:border-transparent lg:p-8">
                <div className="group flex cursor-pointer items-center gap-3.5">
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-transform duration-500 group-hover:rotate-6">
                      <Sparkles size={22} fill="currentColor" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-[#F8FAFC] bg-emerald-500 dark:border-[#020617]" />
                  </div>
                  <div>
                    <h1 className="text-xl font-[1000] leading-none tracking-tighter text-slate-900 dark:text-white">
                      SmartWallet
                    </h1>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                      Pro Edition
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onToggle}
                    className="hidden rounded-2xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:block"
                    aria-label="Close sidebar"
                  >
                    <PanelLeftClose size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-2xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
                    aria-label="Close sidebar"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-2.5 overflow-hidden px-4">
                <p className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Main Menu
                </p>

                <NavLink
                  to="/admin/dashboard"
                  icon={LayoutDashboard}
                  label="Dashboard"
                  activeColor="bg-blue-600"
                  active={isActive("/admin/dashboard")}
                  onNavigate={() => isMobile && onClose()}
                />
                {user?.status === "admin" && (
                  <NavLink
                    to="/admin/users"
                    icon={Users}
                    label="Users"
                    activeColor="bg-indigo-500"
                    active={isActive("/admin/users")}
                    onNavigate={() => isMobile && onClose()}
                  />
                )}
                <NavLink
                  to="/admin/income"
                  icon={IndianRupee}
                  label="Income"
                  activeColor="bg-emerald-500"
                  active={isActive("/admin/income")}
                  onNavigate={() => isMobile && onClose()}
                />
                <NavLink
                  to="/admin/expense"
                  icon={CreditCard}
                  label="Expense"
                  activeColor="bg-rose-500"
                  active={isActive("/admin/expense")}
                  onNavigate={() => isMobile && onClose()}
                />
                <NavLink
                  to="/admin/setting"
                  icon={Settings}
                  label="Settings"
                  activeColor="bg-slate-800 dark:bg-indigo-600"
                  active={isActive("/admin/setting")}
                  onNavigate={() => isMobile && onClose()}
                />
              </div>

              <div className="mb-6 px-4">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-indigo-950 p-5 shadow-xl dark:from-indigo-600 dark:to-blue-700">
                  <div className="relative z-10">
                    <p className="text-xs font-black text-white">Upgrade to Pro</p>
                    <p className="mt-1 text-[10px] font-medium text-indigo-200 opacity-80">
                      Get advanced analytics and insights.
                    </p>
                    <button className="mt-4 w-full rounded-xl bg-white py-2 text-[10px] font-[1000] uppercase tracking-wider text-slate-900 transition-colors hover:bg-indigo-50">
                      Learn More
                    </button>
                  </div>
                  <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                </div>
              </div>

              <div className="border-t border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/50">
                <button
                  onClick={logout}
                  className="group flex w-full items-center justify-between rounded-[1.5rem] px-5 py-4 font-black text-rose-500 transition-all duration-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <div className="flex items-center gap-3">
                    <LogOut
                      size={20}
                      className="transition-transform group-hover:-translate-x-1"
                    />
                    <span className="text-sm tracking-tight">Sign Out</span>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500 opacity-40 transition-transform group-hover:scale-150" />
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default Asidebar;
