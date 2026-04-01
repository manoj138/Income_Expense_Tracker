import { Link } from "react-router-dom";
import {
  ArrowRight,
  LogIn,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";

const stats = [
  { label: "Smart entries", value: "24/7" },
  { label: "Track flow", value: "Income + Expense" },
  { label: "Clean control", value: "One dashboard" },
];

const Index = () => {
  return (
    <section className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-[0_40px_100px_-35px_rgba(37,99,235,0.28)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/75 sm:rounded-[2.5rem] sm:p-6 lg:p-10">
      <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-blue-500/15 blur-3xl sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl sm:h-56 sm:w-56" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[1.25fr_0.85fr] lg:items-center lg:gap-8">
        <div>
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300 sm:px-4 sm:text-[10px] sm:tracking-[0.3em]">
            <Sparkles size={14} />
            Smart Finance Control
          </div>

          <h1 className="mt-4 max-w-2xl text-[2rem] font-[1000] leading-[0.95] tracking-[-0.06em] text-slate-900 sm:mt-5 sm:text-5xl lg:text-6xl dark:text-white">
            Manage money with a cleaner,
            <span className="ml-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent italic sm:ml-2">
              faster tracker
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 dark:text-slate-300">
            Income Expense Tracker helps you monitor inflow, control spending,
            and keep your daily financial picture clear without extra clutter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-[0_18px_40px_-18px_rgba(37,99,235,0.65)] transition-all hover:bg-blue-700 sm:w-auto"
            >
              <LogIn size={18} />
              Login Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white/80 px-6 py-4 text-sm font-black text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 dark:border-emerald-500/20 dark:bg-slate-950/40 dark:text-emerald-300 dark:hover:bg-emerald-500/10 sm:w-auto"
            >
              <UserPlus size={18} />
              Create Account
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border border-slate-100 bg-white/75 p-4 shadow-sm dark:border-white/5 dark:bg-slate-950/30"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-[1000] tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[1.8rem] border border-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-4 text-white shadow-[0_35px_80px_-35px_rgba(15,23,42,0.8)] dark:border-white/5 sm:rounded-[2rem] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
                <Wallet size={24} />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-300 sm:text-[10px] sm:tracking-[0.28em]">
                <TrendingUp size={12} />
                Stable Flow
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 sm:text-[10px] sm:tracking-[0.35em]">
                Finance Snapshot
              </p>
              <h2 className="mt-3 text-2xl font-[1000] tracking-[-0.05em] sm:text-3xl">
                Track better. Spend sharper.
              </h2>
            </div>

            <div className="mt-6 space-y-3 sm:mt-8">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <span className="text-sm text-slate-300">Income visibility</span>
                <span className="text-sm font-black text-emerald-300">Live</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <span className="text-sm text-slate-300">Expense tracking</span>
                <span className="text-sm font-black text-rose-300">Organized</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <span className="text-sm text-slate-300">Account security</span>
                <span className="inline-flex items-center gap-1 text-sm font-black text-blue-300">
                  <ShieldCheck size={15} />
                  Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
