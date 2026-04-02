import {
  Bell,
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  User,
  UserCog,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Api } from "../../components/common/Api/api";
import ThemeToggle from "../../components/common/ThemeToggle";
import {
  EVENT_NAME,
  clearNotifications,
  markAllNotificationsRead,
  readNotifications,
} from "../../components/common/notifications";

const pageTitleMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/income": "Income",
  "/admin/expense": "Expense",
  "/admin/setting": "Settings",
  "/admin/profile": "Profile",
};

const Navbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const fetchUser = async () => {
    try {
      const res = await Api.get(`/user/${user.id}/find`);
      setUserData(res.data.data);
    } catch (error) {
      console.log("fetchUser error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const syncNotifications = () => {
      setNotifications(readNotifications());
    };

    syncNotifications();
    window.addEventListener(EVENT_NAME, syncNotifications);
    window.addEventListener("storage", syncNotifications);

    return () => {
      window.removeEventListener(EVENT_NAME, syncNotifications);
      window.removeEventListener("storage", syncNotifications);
    };
  }, []);

  useEffect(() => {
    setNotifications(readNotifications());
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationToggle = () => {
    const nextOpenState = !showNotifications;
    setShowNotifications(nextOpenState);
    setOpen(false);

    if (nextOpenState && unreadCount > 0) {
      setNotifications(markAllNotificationsRead());
    }
  };

  const handleClearNotifications = () => {
    clearNotifications();
    setNotifications([]);
  };

  const renderNotifications = () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-3 py-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
            Notifications
          </p>
          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            Recent activity updates
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={handleClearNotifications}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:text-rose-600"
          >
            Clear
          </button>
        )}
      </div>

      <div className="max-h-80 space-y-2 overflow-y-auto px-1">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-[1000] text-slate-900 dark:text-white">
                  {notification.title}
                </p>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {new Date(notification.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {notification.message}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-700">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              No notifications yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const activePageTitle = pageTitleMap[location.pathname] || "SmartWallet";

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-3 border-b border-slate-200/80 bg-white/72 px-4 py-3 shadow-[0_12px_35px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500 dark:border-slate-800 dark:bg-slate-900/80 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {!isSidebarOpen && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
        )}
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
            SmartWallet Dashboard
          </p>
          <h2 className="truncate text-sm font-[1000] tracking-tight text-slate-900 dark:text-white sm:text-base">
            {activePageTitle}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="transition-transform duration-300 hover:scale-110">
          <ThemeToggle />
        </div>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationToggle}
            className="group relative rounded-xl p-2.5 text-slate-400 transition-all hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800"
          >
            <Bell size={20} className="transition-transform group-hover:rotate-12" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500 shadow-[0_0_8px_#f43f5e] dark:border-slate-900" />
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-black text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full z-[60] mt-4 w-[calc(100vw-2rem)] max-w-[360px] rounded-[2rem] border border-slate-100 bg-white/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 dark:border-slate-800 dark:bg-slate-900/95 sm:w-[360px] sm:right-0 sm:left-auto">
              {renderNotifications()}
            </div>
          )}
        </div>

        <div className="relative" ref={profileMenuRef}>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-[1.2rem] py-1.5 pl-1.5 pr-3 transition-all duration-300 ${
              open
                ? "bg-blue-50 ring-1 ring-blue-500/20 dark:bg-blue-500/10"
                : "border border-slate-200/80 bg-white/75 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50"
            }`}
            onClick={() => {
              setOpen((prev) => !prev);
              setShowNotifications(false);
            }}
          >
            <div className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-110 active:scale-95">
              <UserCog size={16} strokeWidth={2.5} className="relative z-10 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-[1000] leading-none text-slate-900 dark:text-white">
                {userData?.name?.split(" ")[0]}
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-tighter text-slate-400 dark:text-slate-500">
                {userData?.status === "admin" ? "Admin Account" : "Standard User"}
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

          {open && (
            <div className="absolute right-0 z-[60] mt-4 w-60 max-w-[82vw] rounded-[2rem] border border-slate-100 bg-white/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 dark:border-slate-800 dark:bg-slate-900/95">
              <div className="mb-2 rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-slate-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Signed in as
                </p>
                <p className="mt-0.5 truncate text-sm font-bold text-slate-900 dark:text-white">
                  {userData?.email || "user@smartwallet.com"}
                </p>
              </div>

              <Link
                to="/admin/profile"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                <div className="rounded-lg bg-slate-100 p-1.5 transition-colors group-hover:bg-blue-100 dark:bg-slate-700 dark:group-hover:bg-blue-500/20">
                  <User size={14} />
                </div>
                My Profile
              </Link>

              <Link
                to={`/admin/profile/edit/${user.id}`}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                <div className="rounded-lg bg-slate-100 p-1.5 transition-colors group-hover:bg-blue-100 dark:bg-slate-700 dark:group-hover:bg-blue-500/20">
                  <UserCog size={14} />
                </div>
                Account Settings
              </Link>

              <div className="mx-2 my-2 h-px bg-slate-100 dark:bg-slate-800" />

              <button
                onClick={logout}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-black text-rose-500 transition-all hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <div className="rounded-lg bg-rose-50 p-1.5 dark:bg-rose-500/10">
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
