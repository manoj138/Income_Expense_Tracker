import React, { useEffect, useState } from "react";
import {
  Bell,
  ShieldCheck,
  MoonStar,
  UserCog,
  Settings2,
  KeyRound,
  MonitorSmartphone,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast";

const Setting = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [settings, setSettings] = useState({
    emailAlerts: true,
    weeklySummary: true,
    darkMode: false,
    twoFactor: false,
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("app_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const toggleSetting = (key) => {
    const nextSettings = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(nextSettings);
    sessionStorage.setItem("app_settings", JSON.stringify(nextSettings));
    addToast("Setting updated", "success");
  };

  const ToggleRow = ({ icon: Icon, title, description, value, onChange, tone }) => (
    <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/60 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 p-5 backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className={`rounded-2xl p-3 ${tone}`}>
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-[1000] text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-8 w-16 rounded-full transition-all ${
          value ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all ${
            value ? "left-9" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <>
      <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Settings2 size={18} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Control Center
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[1000] tracking-tighter text-slate-900 dark:text-white">
            Account <span className="italic text-blue-600">Settings</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400">
            Profile preferences, security controls, and notification behavior for{" "}
            <span className="font-black text-slate-800 dark:text-slate-200">
              {user?.email}
            </span>
            .
          </p>
        </div>

        <div className="rounded-[1.8rem] sm:rounded-[2rem] border border-emerald-200/60 bg-emerald-500/10 px-4 py-3 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} sm:size={18} />
            <div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.35em]">
                Status
              </p>
              <p className="text-xs sm:text-sm font-bold">Synchronized</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-4 sm:space-y-6">
          <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-white dark:border-white/5 bg-white/75 p-5 sm:p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:bg-slate-950/40">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600 p-3 text-white">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="text-xl font-[1000] tracking-tight text-slate-900 dark:text-white">
                  Notifications
                </h2>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Decide how the app contacts you.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <ToggleRow
                icon={Bell}
                title="Email Alerts"
                description="Transaction warnings and account updates over email."
                value={settings.emailAlerts}
                onChange={() => toggleSetting("emailAlerts")}
                tone="bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300"
              />
              <ToggleRow
                icon={MonitorSmartphone}
                title="Weekly Summary"
                description="Weekly finance snapshot with inflow and outflow totals."
                value={settings.weeklySummary}
                onChange={() => toggleSetting("weeklySummary")}
                tone="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
              />
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white dark:border-white/5 bg-white/75 p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:bg-slate-950/40">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-slate-900 p-3 text-white dark:bg-indigo-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h2 className="text-xl font-[1000] tracking-tight text-slate-900 dark:text-white">
                  Security
                </h2>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Access protection and session safety controls.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <ToggleRow
                icon={KeyRound}
                title="Two-Factor Ready"
                description="Prepare your account for a stronger sign-in flow."
                value={settings.twoFactor}
                onChange={() => toggleSetting("twoFactor")}
                tone="bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
              />
              <ToggleRow
                icon={MoonStar}
                title="Dark Interface Preference"
                description="Store your theme preference for future sessions."
                value={settings.darkMode}
                onChange={() => toggleSetting("darkMode")}
                tone="bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="overflow-hidden rounded-[2.5rem] border border-white bg-slate-950 text-white shadow-[0_35px_90px_-30px_rgba(37,99,235,0.35)] dark:border-white/5 dark:bg-gradient-to-br dark:from-blue-700 dark:to-indigo-700">
            <div className="p-7">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <UserCog size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-200">
                    Identity Layer
                  </p>
                  <h2 className="text-2xl font-[1000] tracking-tight">
                    {user?.name || "User Profile"}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">
                    Email
                  </p>
                  <p className="mt-2 font-bold break-all">{user?.email}</p>
                </div>
                <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">
                    Role
                  </p>
                  <p className="mt-2 font-bold uppercase">{user?.status || "user"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200/70 bg-slate-50/80 p-7 backdrop-blur-xl dark:border-white/5 dark:bg-slate-900/50">
            <h2 className="text-lg font-[1000] tracking-tight text-slate-900 dark:text-white">
              System Notes
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <div className="rounded-2xl bg-white px-4 py-3 text-slate-600 shadow-sm dark:bg-slate-950/70 dark:text-slate-300">
                Notification and security toggles are stored in session for now.
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-slate-600 shadow-sm dark:bg-slate-950/70 dark:text-slate-300">
                If needed, these settings can be persisted to MongoDB later.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Setting;
